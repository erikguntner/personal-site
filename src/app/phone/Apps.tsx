import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  motion,
  PanInfo,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import phoneStyles from "./phone.module.css";
import styles from "./apps.module.css";

interface AppsProps {}

const apps = [
  { name: "The Odyssey", desc: "Explore unknown galaxies" },
  { name: "Angry Rabbits", desc: "They are coming for you" },
  // { name: "Ghost Town", desc: "Scary Ghosts" },
  // { name: "Pirates in the jungle", desc: "Find the treasure" },
  // { name: "Lost in the mountains", desc: "Find the treasure" },
];

const PHONE_WIDTH = 325;
const PHONE_HEIGHT = 600;
const PHONE_PADDING = 8;

const SCREEN_PADDING = 16;

const START_WIDTH = PHONE_WIDTH - PHONE_PADDING * 2 - SCREEN_PADDING * 2;
const START_HEIGHT = 225;

const END_WIDTH = PHONE_WIDTH - PHONE_PADDING * 2;
const END_HEIGHT = PHONE_HEIGHT - PHONE_PADDING * 2;

const COVER_END_HEIGHT = PHONE_HEIGHT / 2 - PHONE_PADDING * 2;

const cardVariants: Variants = {
  initial: {
    y: 0,
    x: 0,
    width: START_WIDTH,
    height: START_HEIGHT,
    scale: 1,
    borderRadius: 16,
    transition: {
      type: "spring",
      ease: "easeInOut",
      duration: 0.7,
    },
    transitionEnd: {
      zIndex: 1,
      overflow: "hidden",
    },
  },
  selected: ({ y }) => ({
    y,
    x: -SCREEN_PADDING,
    width: END_WIDTH,
    height: END_HEIGHT,
    zIndex: 3,
    scale: 1,
    borderRadius: 0,
    transition: {
      type: "spring",
      ease: "easeInOut",
      duration: 0.7,
    },
    transitionEnd: {
      overflow: "scroll",
    },
  }),
};

export const Apps = ({}: AppsProps) => {
  const screenRef = React.useRef<HTMLDivElement>(null);
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleSetSelected = (index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  return (
    <section className={phoneStyles.phone}>
      <div ref={screenRef} className={phoneStyles.screen}>
        <motion.div
          className={styles.overlay}
          animate={{
            opacity: selected === null ? 0 : 1,
          }}
          initial={{ opacity: 0 }}
        />
        <div className={phoneStyles.header}>
          <h3>Apps</h3>
        </div>
        <div className={styles.body}>
          <ul className={styles.cards}>
            {apps.map((card, index) => (
              <li
                style={{
                  width: START_WIDTH,
                  height: START_HEIGHT,
                }}
                key={index}
                className={styles.placeholder}
              >
                <App
                  handleSetSelected={handleSetSelected}
                  card={card}
                  selected={selected}
                  index={index}
                  ref={screenRef}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

interface AppProps {
  handleSetSelected: (index: number) => void;
  card: { name: string; desc: string };
  selected: number | null;
  index: number;
  ref: React.RefObject<HTMLDivElement>;
}

let timer;

const App = React.forwardRef<HTMLDivElement, AppProps>(function App(
  { handleSetSelected, selected, card, index },
  ref
) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const panY = useMotionValue(0);
  const scaleTransform = useTransform(panY, [0, 90], [1, 0.8]);
  const scale = useSpring(scaleTransform, {
    stiffness: 300,
    damping: 20,
    duration: 0.7,
  });

  const borderRadiusTransform = useTransform(panY, [0, 90], [0, 16]);
  const borderRadius = useSpring(borderRadiusTransform, {
    stiffness: 300,
    damping: 20,
    duration: 0.7,
  });

  const offset = useOffset({
    outerRef: ref,
    innerRef: cardRef,
    deps: [ref, cardRef],
  });

  const isSelected = selected === index;

  const handleClick = () => {
    if (isDisabled) return;

    if (cardRef.current && isSelected) {
      cardRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    handleSetSelected(index);
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 900);
  };

  const handlePanStart = () => {
    if (!isSelected) return;
  };

  const handlePan = (event: PointerEvent, info: PanInfo) => {
    if (!isSelected) return;

    panY.set(info.offset.y);
  };

  const handlePanEnd = (event: PointerEvent, info: PanInfo) => {
    if (info.offset.y >= 100) {
      if (cardRef.current && isSelected) {
        cardRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      handleSetSelected(index);
      scale.set(1);
    } else {
      scale.set(1);
    }
  };
  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      style={{
        width: START_WIDTH,
        height: START_HEIGHT,
        transformOrigin: "center",
        scale,
        borderRadius,
      }}
      onClick={() => {
        if (isSelected) return;
        handleClick();
      }}
      animate={isSelected ? "selected" : "initial"}
      initial={{ overflow: "hidden", borderRadius: 16 }}
      variants={cardVariants}
      custom={{ y: offset }}
    >
      <motion.button
        onClick={handleClick}
        className={styles.close}
        animate={{
          opacity: isSelected ? 1 : 0,
          pointerEvents: isSelected ? "auto" : "none",
          filter: isSelected ? "blur(0px)" : "blur(4px)",
        }}
        initial={{
          opacity: 0,
          pointerEvents: "none",
          scale: 1,
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.9,
        }}
      >
        <Cross2Icon />
      </motion.button>
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        animate={{
          height: isSelected ? COVER_END_HEIGHT : START_HEIGHT,
        }}
        initial={{ height: START_HEIGHT }}
        className={styles.cover}
      >
        <div className={styles.info}>
          <h4>{card.name}</h4>
          <p>{card.desc}</p>
        </div>
      </motion.div>
      <div style={{ width: END_WIDTH }} className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          dolore adipisci necessitatibus? Suscipit velit voluptas rerum
          quibusdam mollitia. Accusantium incidunt impedit ad quisquam,
          architecto repellendus provident accusamus quam hic quod!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          dolore adipisci necessitatibus? Suscipit velit voluptas rerum
          quibusdam mollitia. Accusantium incidunt impedit ad quisquam,
          architecto repellendus provident accusamus quam hic quod!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          dolore adipisci necessitatibus? Suscipit velit voluptas rerum
          quibusdam mollitia. Accusantium incidunt impedit ad quisquam,
          architecto repellendus provident accusamus quam hic quod!
        </p>
      </div>
    </motion.div>
  );
});

interface useOffset {
  outerRef: React.ForwardedRef<HTMLDivElement>;
  innerRef: React.RefObject<HTMLDivElement>;
  deps: (
    | React.RefObject<HTMLDivElement>
    | ((instance: HTMLDivElement | null) => void)
    | null
  )[];
}

const useOffset = ({ outerRef, innerRef, deps }: useOffset) => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    if (outerRef?.current && innerRef.current) {
      console.log("offseting");
      const rect = outerRef?.current?.getBoundingClientRect();
      const cardRect = innerRef.current.getBoundingClientRect();

      const center = rect.y + Math.floor(rect.height / 2);
      const curreOffset = center - cardRect.y - END_HEIGHT / 2;

      setOffset(curreOffset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerRef, outerRef, setOffset, ...deps]);

  return offset;
};

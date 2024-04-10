import React from "react";
import { motion, Variants } from "framer-motion";
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

const SCREEN_PADDING = 24;

const START_WIDTH = PHONE_WIDTH - PHONE_PADDING * 2 - SCREEN_PADDING * 2;
const START_HEIGHT = 200;

const END_WIDTH = PHONE_WIDTH - PHONE_PADDING * 2;
const END_HEIGHT = PHONE_HEIGHT - PHONE_PADDING * 2;

const COVER_END_HEIGHT = PHONE_HEIGHT / 2 - PHONE_PADDING * 2;

const cardVariants: Variants = {
  initial: {
    y: 0,
    x: 0,
    width: START_WIDTH,
    height: START_HEIGHT,
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

  const offset = useOffset({
    outerRef: ref,
    innerRef: cardRef,
    deps: [ref, cardRef],
  });

  const handleClick = () => {
    if (isDisabled) return;

    if (cardRef.current && selected === index) {
      cardRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    handleSetSelected(index);
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 700);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      style={{
        width: START_WIDTH,
        height: START_HEIGHT,
        transformOrigin: "center",
      }}
      onClick={handleClick}
      animate={selected === index ? "selected" : "initial"}
      initial={{ overflow: "hidden" }}
      variants={cardVariants}
      custom={{ y: offset }}
    >
      <motion.div
        animate={{
          height: selected === index ? COVER_END_HEIGHT : START_HEIGHT,
        }}
        initial={{ height: START_HEIGHT }}
        className={styles.cover}
      >
        <div className={styles.image} />
        <div className={styles.text}>
          <h4>{card.name}</h4>
          <p>{card.desc}</p>
        </div>
      </motion.div>
      <motion.div
        style={{ width: END_WIDTH }}
        className={styles.content}
        animate={{
          filter: selected === index ? "blur(0px)" : "blur(2px)",
        }}
      >
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
      </motion.div>
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
  console.log(outerRef, innerRef);

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

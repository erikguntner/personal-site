"use client";

import React, { forwardRef, useEffect } from "react";
import { Variants, motion } from "framer-motion";
import styles from "./store.module.css";

interface pageProps {}

const apps = [
  { name: "The Odyssey", desc: "Explore unknown galaxies" },
  { name: "Angry Rabbits", desc: "They are coming for you" },
  { name: "Ghost Town", desc: "Scary Ghosts" },
  { name: "Pirates in the jungle", desc: "Find the treasure" },
  { name: "Lost in the mountains", desc: "Find the treasure" },
];

const IMAGE_HEIGHT = 64;
const PADDING = 16;
const START_HEIGHT = IMAGE_HEIGHT + PADDING * 2;
const END_HEIGHT = START_HEIGHT + 60;

const START_WIDTH = 400;
const END_WIDTH = 500;

const cardVariants: Variants = {
  initial: {
    y: 0,
    x: 0,
    width: START_WIDTH,
    height: START_HEIGHT,
    border: "1px solid transparent",
    backgroundColor: "var(--gray-2)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      ease: "easeInOut",
      duration: 0.5,
    },
    transitionEnd: {
      zIndex: 0,
    },
  },
  selected: ({ y }) => ({
    y,
    x: START_WIDTH / 2 - END_WIDTH / 2,
    width: END_WIDTH,
    height: END_HEIGHT,
    zIndex: 3,
    border: "1px solid var(--gray-6)",
    backgroundColor: "var(--gray-1)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      ease: "easeInOut",
      duration: 0.5,
    },
  }),
};

export default function Page({}: pageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleSetSelected = (index: number) => {
    if ((index !== selected && selected !== null) || isDisabled) {
      return;
    }

    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }

    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  };

  return (
    <main className={styles.container}>
      <motion.section ref={containerRef} className={styles.store}>
        <motion.div
          onClick={() => {
            if (isDisabled) return;
            setSelected(null);
          }}
          className={styles.overlay}
          style={{
            pointerEvents:
              selected === null && isDisabled === false ? "none" : "auto",
          }}
          animate={{
            opacity: selected === null ? 0 : 1,
          }}
          initial={{ opacity: 0 }}
        />
        <ul className={styles.appList}>
          {apps.map((app, index) => {
            return (
              <li key={index} style={{ height: `${START_HEIGHT}px` }}>
                <Card
                  app={app}
                  index={index}
                  selected={selected}
                  handleSetSelected={handleSetSelected}
                  ref={containerRef}
                />
              </li>
            );
          })}
        </ul>
      </motion.section>
    </main>
  );
}

interface CardProps {
  app: { name: string; desc: string };
  index: number;
  selected: number | null;
  handleSetSelected: (index: number) => void;
  ref: React.RefObject<HTMLDivElement>;
}

const Card = forwardRef<unknown, CardProps>(function Card(
  { app, index, selected, handleSetSelected },
  ref
) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    if (ref?.current && cardRef.current) {
      const rect = ref?.current?.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const center = rect.y + Math.floor(rect.height / 2);
      const curreOffset = center - cardRect.y - END_HEIGHT / 2;

      setOffset(curreOffset);
    }
  }, [ref, cardRef, setOffset]);

  return (
    <motion.div
      ref={cardRef}
      onClick={() => handleSetSelected(index)}
      animate={index === selected ? "selected" : "initial"}
      initial={"initial"}
      variants={cardVariants}
      className={styles.app}
      custom={{ y: offset }}
    >
      <div className={styles.appHeader}>
        <div className={styles.row}>
          <div className={styles.image}></div>
          <div className={styles.info}>
            <h3>{app.name}</h3>
            <p>{app.desc}</p>
          </div>
        </div>
        <div className={styles.button}>Get</div>
      </div>
      <motion.div
        className={styles.footer}
        animate={{
          opacity: index === selected ? 1 : 0,
          filter: index === selected ? "blur(0px)" : "blur(4px)",
        }}
        initial={{
          opacity: 0,
          filter: "blur(4px)",
        }}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi even
          pariatur cupiditate doloribus aperiam molestias minus.
        </p>
      </motion.div>
    </motion.div>
  );
});

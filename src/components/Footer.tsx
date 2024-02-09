"use client";

import React from "react";
import styles from "./footer.module.css";
import {
  useMotionValue,
  motion,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";

export const Footer = () => {
  let mouseX = useMotionValue(Infinity);

  return (
    <footer
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={styles.dock}
    >
      {[...Array(6)].map((_, i) => (
        <AppIcon mouseX={mouseX} key={i} />
      ))}
    </footer>
  );
};

const AppIcon = ({ mouseX }: { mouseX: MotionValue }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-200, 0, 200], [40, 70, 40]);
  let size = useSpring(widthSync, { stiffness: 200, damping: 15, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={styles.link}
    />
  );
};

"use client";

import React from "react";
import { Variants, motion, useScroll, useTransform } from "framer-motion";
import {
  PlusIcon,
  DotsHorizontalIcon,
  ArchiveIcon,
} from "@radix-ui/react-icons";

import styles from "./phone.module.css";
import { Apps } from "./Apps";

interface pageProps {}

const cards = [
  {
    name: "Visa",
    number: "**** **** **** 1234",
    expiration: "12/22",
    cvv: "123",
    color: "#e64e4e",
  },
  {
    name: "Mastercard",
    number: "**** **** **** 5678",
    expiration: "12/23",
    cvv: "456",
    color: "#6f5ec5",
  },
  {
    name: "Amex",
    number: "**** **** **** 9012",
    expiration: "12/24",
    cvv: "789",
    color: "#46d168",
  },
];

const HEADER_HEIGHT = 34;

const cardVariants: Variants = {
  initial: ({ headerHeight }) => ({
    y: headerHeight,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      ease: "easeInOut",
      duration: 0.5,
    },
  }),
  selected: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  hideUp: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(4px)",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  hideDown: ({ headerHeight }) => ({
    opacity: 0,
    y: headerHeight + 200,
    filter: "blur(4px)",
    transition: {
      type: "spring",
      ease: "easeInOut",
      duration: 0.5,
    },
  }),
};

export default function Page({}: pageProps) {
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleSelectCard = (index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  const selectVariant = (index: number) => {
    if (selected === index) {
      return "selected";
    }

    if (selected !== null && selected >= index) {
      return "hideUp";
    }

    if (selected !== null && selected <= index) {
      return "hideDown";
    }

    return "initial";
  };

  return (
    <main className={styles.container}>
      <section className={styles.phone}>
        <div className={styles.screen}>
          <motion.div
            layout
            className={styles.header}
            animate={{
              height: selected !== null ? "60px" : "100px",
            }}
            initial={{
              height: "100px",
            }}
          >
            <div className={styles.row}>
              <motion.h3
                style={{
                  transformOrigin: "left",
                }}
                animate={{
                  opacity: selected === null ? 1 : 0,
                  scale: selected !== null ? 0.8 : 1,
                }}
                initial={{
                  opacity: 1,
                  scale: 1,
                }}
              >
                Wallet
              </motion.h3>
              <motion.p
                onClick={() => setSelected(null)}
                style={{
                  pointerEvents: selected === null ? "none" : "auto",
                }}
                animate={{
                  opacity: selected === null ? 0 : 1,
                }}
                initial={{
                  opacity: 0,
                }}
              >
                Done
              </motion.p>
              <div className={styles.buttons}>
                <motion.div
                  style={{ position: "absolute", right: 0 }}
                  className={styles.buttonOutline}
                  animate={{
                    opacity: selected === null ? 0 : 1,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                >
                  <DotsHorizontalIcon />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: selected === null ? 1 : 0,
                  }}
                  initial={{
                    opacity: 1,
                  }}
                  className={styles.button}
                >
                  <ArchiveIcon />
                </motion.div>
                <motion.div
                  animate={{
                    opacity: selected === null ? 1 : 0,
                    scale: selected === null ? 1 : 0.7,
                    transformOrigin: "right",
                  }}
                  initial={{
                    opacity: 1,
                  }}
                  className={styles.button}
                >
                  <PlusIcon />
                </motion.div>
              </div>
            </div>
          </motion.div>
          <div className={styles.body}>
            <motion.ul layout className={styles.cards}>
              {cards.map((card, index) => (
                <motion.li
                  key={index}
                  className={styles.card}
                  style={{
                    backgroundColor: card.color,
                    pointerEvents:
                      selected !== null && selected !== index ? "none" : "auto",
                    boxShadow:
                      selected === index
                        ? "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)"
                        : "",
                    transition: "box-shadow 0.5s ease-in-out",
                  }}
                  onClick={() => handleSelectCard(index)}
                  animate={selectVariant(index)}
                  variants={cardVariants}
                  initial={{ y: index * HEADER_HEIGHT, filter: "blur(0px)" }}
                  custom={{ headerHeight: index * HEADER_HEIGHT }}
                ></motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
      <Apps />
    </main>
  );
}

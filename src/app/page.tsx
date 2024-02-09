"use client";

import React from "react";
import styles from "./page.module.css";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.grid}>
        {Array(150)
          .fill(0)
          .map((_, i) => (
            <GridSquare key={i} />
          ))}
        <div className={[styles.absolute_container].join(" ")}>
          <div className={[styles.container, styles.position_header].join(" ")}>
            <h1>Erik Guntner</h1>
            <h4>Software Engineer</h4>
          </div>
        </div>
      </section>
      <section className={styles.container}>
        <div className={styles.title_section}>
          <h2>Today</h2>
          <p>
            I currently work as a Full Stack Engineer at Hack for LA on the Home
            Unite US team. I’m a tinkerer who likes to to build open source
            software and work on civic tech.
          </p>
        </div>
        <div className={styles.row}>
          <div>
            <h3>Projects</h3>
            <p>
              I’m currently working on a few projects. One of them is a
              decentralized social network called Socialite. It’s built on
              Ethereum and IPFS.
            </p>
          </div>
          <div>
            <div>
              <h3>What I use</h3>
              <p>
                I’m interested in web3, decentralized finance, and building
                community. I’m also interested in building tools that help
                developers.
              </p>
            </div>
            <div>
              <h3>Where</h3>
              <p>
                I’m interested in web3, decentralized finance, and building
                community. I’m also interested in building tools that help
                developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.title_section}>
          <h2>Today</h2>
          <p>
            I currently work as a Full Stack Engineer at Hack for LA on the Home
            Unite US team. I’m a tinkerer who likes to to build open source
            software and work on civic tech.
          </p>
        </div>
        <div className={styles.row}>
          <div>
            <h3>Projects</h3>
            <p>
              I’m currently working on a few projects. One of them is a
              decentralized social network called Socialite. It’s built on
              Ethereum and IPFS.
            </p>
          </div>
          <div>
            <div>
              <h3>What I use</h3>
              <p>
                I’m interested in web3, decentralized finance, and building
                community. I’m also interested in building tools that help
                developers.
              </p>
            </div>
            <div>
              <h3>Where</h3>
              <p>
                I’m interested in web3, decentralized finance, and building
                community. I’m also interested in building tools that help
                developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.title_section}>
          <h2>Today</h2>
          <p>
            I currently work as a Full Stack Engineer at Hack for LA on the Home
            Unite US team. I’m a tinkerer who likes to to build open source
            software and work on civic tech.
          </p>
        </div>
        <div className={styles.row}>
          <div>
            <h3>Projects</h3>
            <p>
              I’m currently working on a few projects. One of them is a
              decentralized social network called Socialite. It’s built on
              Ethereum and IPFS.
            </p>
          </div>
          <div>
            <div>
              <h3>What I use</h3>
              <p>
                I’m interested in web3, decentralized finance, and building
                community. I’m also interested in building tools that help
                developers.
              </p>
            </div>
            <div>
              <h3>Where</h3>
              <p>
                I’m interested in web3, decentralized finance, and building
                community. I’m also interested in building tools that help
                developers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const GridSquare = () => {
  return (
    <div className={styles.square}>
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <div className={styles.crosshair}>
        <CrossHair />
      </div>
    </div>
  );
};

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const colors = ["#00af3f", "#056ff7", "#ffe100"];

const Cell = () => {
  const [color, setColor] = React.useState(() => {
    return colors[randomIntFromInterval(0, 2)];
  });

  return (
    <div
      onMouseEnter={() => {
        setColor(colors[randomIntFromInterval(0, 2)]);
      }}
      className={styles.cell}
      style={{ backgroundColor: color }}
    ></div>
  );
};

const CrossHair = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      color="#D9D9D9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

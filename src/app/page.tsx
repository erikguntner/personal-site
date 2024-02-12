"use client";

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Cross1Icon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { projects } from "./constants";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {Array(150)
          .fill(0)
          .map((_, i) => (
            <GridSquare key={i} />
          ))}
        <div className={styles.gradient} />
      </div>
      <div className={[styles.container, styles.pointer_events_none].join(" ")}>
        <section className={styles.header_section}>
          <h1>Erik Guntner</h1>
          <h4>Software Engineer</h4>
        </section>
      </div>
      <div className={styles.container}>
        <section className={styles.section}>
          <h2>Today</h2>
          <p>
            I&apos;m a Full Stack Engineer at Hack for LA on the Home Unite Us
            team. I&apos;m a tinkerer who likes to to build open source software
            and work on civic tech.
          </p>

          <p>Currently located:</p>
          <figure className={styles.map}>
            <Image
              src="/map.png"
              alt="Los Angeles"
              width={1280}
              height={720}
              priority
            />
          </figure>
        </section>
        <section className={styles.section}>
          <h2>What I use</h2>
          <p>
            Right now you can find me hacking away primarily with React,
            Typescript, Next.js, Python, Flask, PostgreSQL and in general
            anything JavaScript, HTML and CSS related.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Projects</h2>
          <ul className={styles.project_list}>
            {projects.map((project, i) => (
              <li key={i}>
                <a
                  className={styles.project}
                  href={project.href}
                  target="_blank"
                >
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                  </div>
                  <ExternalLinkIcon width="16" height="16" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
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
        <Cross1Icon color="#646464" />
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

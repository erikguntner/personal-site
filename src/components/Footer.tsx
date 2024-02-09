"use client";

import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  useMotionValue,
  motion,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";
import {
  EnvelopeClosedIcon,
  FileTextIcon,
  GitHubLogoIcon,
  HomeIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

import styles from "./footer.module.css";

export const footerLinks = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon width="18" height="18" />,
  },
  {
    label: "GitHub",
    href: "",
    icon: <GitHubLogoIcon width="18" height="18" />,
  },
  {
    label: "Email",
    href: "",
    icon: <EnvelopeClosedIcon width="18" height="18" />,
  },
  {
    label: "LinkedIn",
    href: "",
    icon: <LinkedInLogoIcon width="18" height="18" />,
  },
  {
    label: "Resume",
    href: "",
    icon: <FileTextIcon width="18" height="18" />,
  },

  {
    label: "Email",
    href: "",
    icon: <EnvelopeClosedIcon width="18" height="18" />,
  },
];

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
      {footerLinks.map(({ icon }, i) => (
        <AppIcon mouseX={mouseX} key={i} icon={icon} />
      ))}
    </footer>
  );
};

const AppIcon = ({
  mouseX,
  icon,
}: {
  mouseX: MotionValue;
  icon: React.JSX.Element;
}) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-200, 0, 200], [40, 70, 40]);
  let svgWidthSync = useTransform(distance, [-200, 0, 200], [1, 1.5, 1]);
  let size = useSpring(widthSync, { stiffness: 200, damping: 15, mass: 0.1 });
  let svgSize = useSpring(svgWidthSync, {
    stiffness: 200,
    damping: 15,
    mass: 0.1,
  });

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.a
            ref={ref}
            style={{ width: size, height: size }}
            className={styles.link}
          >
            <motion.div style={{ scale: svgSize }}>{icon}</motion.div>
          </motion.a>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.TooltipContent} sideOffset={5}>
            Home
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

"use client";

import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
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
  LinkedInLogoIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";

import styles from "./footer.module.css";

export const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/erikguntner",
    icon: <GitHubLogoIcon width="18" height="18" />,
  },
  {
    label: "Email",
    href: "",
    icon: <EnvelopeClosedIcon width="18" height="18" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/erikguntner/",
    icon: <LinkedInLogoIcon width="18" height="18" />,
  },
  {
    label: "Resume",
    href: "",
    icon: <FileTextIcon width="18" height="18" />,
  },
];

export const Footer = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const theme = localStorage.getItem("theme") || "light";
    return theme;
  });

  let mouseX = useMotionValue(Infinity);

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <footer
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={styles.dock}
    >
      {footerLinks.map(({ icon, label, href }, i) => (
        <AppIcon
          mouseX={mouseX}
          key={i}
          icon={icon}
          label={label}
          href={href}
        />
      ))}
      <div className={styles.divider} />
      <ToolTip label="Change theme">
        <button
          onClick={handleToggleTheme}
          className={styles.link}
          style={{ border: "none" }}
        >
          <div>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</div>
        </button>
      </ToolTip>
    </footer>
  );
};

interface AppIconProps {
  mouseX: MotionValue;
  icon: React.JSX.Element;
  label: string;
  href: string;
  type?: "a" | "button";
}

const AppIcon = ({ mouseX, icon, label, href, type = "a" }: AppIconProps) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-200, 0, 200], [40, 70, 40]);
  let size = useSpring(widthSync, { stiffness: 200, damping: 15, mass: 0.1 });

  let svgWidthSync = useTransform(distance, [-200, 0, 200], [1, 1.5, 1]);
  let svgSize = useSpring(svgWidthSync, {
    stiffness: 200,
    damping: 15,
    mass: 0.1,
  });

  return (
    <ToolTip label={label}>
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        style={{ width: size, height: size }}
        className={styles.link}
      >
        <motion.div style={{ scale: svgSize }}>{icon}</motion.div>
      </motion.a>
    </ToolTip>
  );
};

const ToolTip = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={200}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={styles.TooltipContent}
            sideOffset={5}
          >
            {label}
            <RadixTooltip.Arrow className={styles.TooltipArrow} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

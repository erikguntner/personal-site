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
  const [theme, setTheme] = React.useState<string>(() => {
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
        <AppIconLink
          mouseX={mouseX}
          key={i}
          icon={icon}
          label={label}
          href={href}
        />
      ))}
      <div className={styles.divider} />
      <AppIconButton
        mouseX={mouseX}
        label="Change theme"
        handleClick={handleToggleTheme}
        icon={theme === "dark" ? <MoonIcon /> : <SunIcon />}
      />
    </footer>
  );
};

type UseLinkMotionOptions = HTMLAnchorElement | HTMLButtonElement;

const useLinkMotion = <T extends UseLinkMotionOptions>(mouseX: MotionValue) => {
  const ref = React.useRef<T>(null);
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

  return { ref, size, svgSize };
};

interface AppIconLinkProps {
  mouseX: MotionValue;
  icon: React.JSX.Element;
  label: string;
  href: string;
}

const AppIconLink = ({ mouseX, icon, label, href }: AppIconLinkProps) => {
  const { ref, size, svgSize } = useLinkMotion<HTMLAnchorElement>(mouseX);

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

interface AppIconButtonProps {
  mouseX: MotionValue;
  icon: React.JSX.Element;
  label: string;
  handleClick: () => void;
}

const AppIconButton = ({
  mouseX,
  icon,
  label,
  handleClick,
}: AppIconButtonProps) => {
  const { ref, size, svgSize } = useLinkMotion<HTMLButtonElement>(mouseX);

  return (
    <ToolTip label={label}>
      <motion.button
        ref={ref}
        onClick={handleClick}
        style={{ width: size, height: size }}
        className={[styles.link, styles.button].join(" ")}
      >
        <motion.div style={{ scale: svgSize }}>{icon}</motion.div>
      </motion.button>
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

"use client";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import { type LucideProps } from "lucide-react";
import {
  type ComponentProps,
  type ForwardRefExoticComponent,
  type RefAttributes,
  useState,
} from "react";

const Path = (props: ComponentProps<"path"> & MotionProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    // stroke="hsl(0, 0%, 18%)"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const overlayVariants = {
  closed: {
    clipPath: "circle(0% at 100% 100%)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    clipPath: "circle(150% at 100% 100%)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
};

const RoundedMenu = ({
  links,
}: {
  links: {
    label: string;
    href: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-30 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsOpen((s) => !s)}
        className="fixed bottom-4 right-4 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 md:hidden"
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          className="text-primary"
        >
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
          />
        </svg>
      </motion.button>
      {links.map((link, index) => (
        <motion.button
          key={index}
          className="fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 md:hidden"
          style={{
            right:
              200 * Math.cos(((index / (links.length - 1)) * 2 * Math.PI) / 4),
            bottom:
              200 * Math.sin(((index / (links.length - 1)) * 2 * Math.PI) / 4),
            opacity: isOpen ? 1 : 0,
            zIndex: isOpen ? 40 : 0,
          }}
          animate={{
            right:
              (isOpen
                ? 200 *
                  Math.cos(((index / (links.length - 1)) * 2 * Math.PI) / 4)
                : 0) + 16,
            bottom:
              (isOpen
                ? 200 *
                  Math.sin(((index / (links.length - 1)) * 2 * Math.PI) / 4)
                : 0) + 16,
            opacity: isOpen ? 1 : 0,
            zIndex: isOpen ? 40 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <link.icon className="h-6 w-6" />
        </motion.button>
      ))}
    </>
  );
};
export default RoundedMenu;

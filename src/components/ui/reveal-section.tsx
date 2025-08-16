"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { type FC, type ReactNode, useRef } from "react";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const RevealSection: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  const grayscale = useTransform(
    scrollYProgress,
    [0, 1],
    ["grayscale(100%)", "grayscale(0%)"],
  );

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto grid h-[50%] w-full items-center justify-center justify-items-center gap-4 bg-transparent py-5 md:grid-cols-3 md:justify-items-start md:px-[1rem] md:py-[5rem]"
        }
      >
        <motion.div
          // @ts-expect-error animate is not in the types
          className="relative h-52 w-52 overflow-hidden rounded-full md:h-96 md:w-96"
          style={{
            filter: grayscale,
          }}
        >
          <Image
            src="/assets/hero.JPG"
            className="h-full w-full object-cover"
            width={900}
            height={900}
            alt="Hero"
            priority
          />
        </motion.div>

        <p
          className={
            "flex flex-wrap justify-center text-center text-lg font-bold text-black/20 md:col-span-2 md:justify-start md:p-8 md:text-xl lg:p-10 lg:text-2xl xl:text-2xl dark:text-white/20"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        // @ts-expect-error animate is not in the types
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default RevealSection;

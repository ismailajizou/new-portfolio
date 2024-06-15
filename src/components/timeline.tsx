"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
}

interface TimelineProps {
  items: TimelineEvent[];
}

export default function Timeline({ items }: TimelineProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["50%", "-90%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const lineColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#d946ef",
      "#ec4899",
      "#f43f5e",
    ],
  );
  return (
    <div ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-36">
          {items.map((item, i) => {
            return (
              <TimelineEvent
                key={i}
                scrollYProgress={scrollYProgress}
                {...item}
              />
            );
          })}
          <TimelineEvent
            // className="bg-gray-500"
            scrollYProgress={scrollYProgress}
            {...{
              title: "And Beyond . . .",
              date: "♾️",
              description: "",
            }}
          />
        </motion.div>

        {/* // add a timeline line */}
        <motion.div
          className="absolute left-0 top-[calc(50%+2rem)] h-1"
          style={{ width: lineWidth, backgroundColor: lineColor }}
        />
      </div>
    </div>
  );
}

export const TimelineEvent = ({
  title,
  date,
  description,
  scrollYProgress,
  className,
}: TimelineEvent & {
  className?: string;
  scrollYProgress: MotionValue<number>;
}) => {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  return (
    <motion.div
      style={{ opacity }}
      className={cn("flex w-96 flex-col justify-stretch gap-24", className)}
    >
      <div className="rounded-md bg-blue-900 px-6 py-4 text-center">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-md">{description}</p>
      </div>
      <p className="text-center text-3xl font-bold">{date}</p>
    </motion.div>
  );
};

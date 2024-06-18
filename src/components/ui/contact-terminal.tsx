"use client";

import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
type InferAsTuple = [unknown, ...unknown[]]
const STEPS = [
  {
    prompt: "What is your name ?",
    input: "text",
    validator: z.string().min(3).max(30),
  },
  {
    prompt: "What is your email ?",
    input: "text",
    validator: z.string().email(),
  },
  {
    prompt: "What is your message ?",
    input: "textarea",
    validator: z.string().min(10).max(500),
  },
  {
    prompt: "Wanna send it ?",
    input: "confirm",
    validator: z.boolean(),
  },
] satisfies InferAsTuple;

const FIELDS = {
  name: 0,
  email: 1,
  message: 2,
};

const LEVELS = {
  info: "text-gray-500",
  error: "text-red-500",
  success: "text-green-500",
  prompt: "text-gray-100",
};

type Fields = { [k in keyof typeof FIELDS]: string };
type Line = {
  text: string;
  level: keyof typeof LEVELS;
};

const ContactTerminal = () => {
  // this is a terminal like contact form
  const [input, setInput] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);
  const [lines, setLines] = useState<Line[]>([
    {
      text: STEPS[0].prompt,
      level: "prompt",
    },
  ]);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });
  const handleNext = useCallback(() => {
    if (step === STEPS.length - 1) {
      // send the message
      console.log(fields);
      return;
    }
    const valid = STEPS[step]!.validator.safeParse(
      fields[Object.keys(FIELDS)[step] as keyof Fields],
    );
    if (!valid.success) {
      setFields({
        ...fields,
        [Object.keys(FIELDS)[step] as keyof Fields]: "",
      });
      setLines([
        ...lines,
        {
          text: valid.error.errors[0]?.message ?? "Invalid input",
          level: "error",
        },
        { text: STEPS[step]!.prompt, level: "prompt" },
      ]);
      return;
    }
    setLines([
      ...lines,
      {
        text: fields[Object.keys(FIELDS)[step] as keyof Fields],
        level: "info",
      },
      { text: STEPS[step + 1]!.prompt, level: "prompt" },
    ]);
    setStep(step + 1);
  }, [step, fields, lines]);
  const handleTyping = useCallback(
    (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Enter") {
        handleNext();
        return;
      }
      if (e.key === "Backspace") {
        if (cursor > 0) {
          setInput((prev) => prev.slice(0, cursor - 1) + prev.slice(cursor));
          setCursor((prev) => prev - 1);
        }
        return;
      }
      if (e.key === "ArrowLeft") {
        if (cursor > 0) {
          setCursor((prev) => prev - 1);
        }
        return;
      }
      if (e.key === "ArrowRight") {
        if (cursor < input.length) {
          setCursor((prev) => prev + 1);
        }
        return;
      }
      if (e.key === "Home") {
        setCursor(0);
        return;
      }
      if (e.key === "End") {
        setCursor(input.length);
        return;
      }
      setInput((prev) => prev.slice(0, cursor) + e.key + prev.slice(cursor));
      setCursor((prev) => prev + 1);
    },
    [cursor, handleNext, input],
  );
  useEffect(() => {
    document.addEventListener("keydown", handleTyping);
    return () => {
      document.removeEventListener("keydown", handleTyping);
    };
  }, [handleTyping]);

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-md border-2 border-card bg-card font-mono">
      <TitleBar />
      <div className="h-96 overflow-y-scroll bg-gray-800/20 px-4 py-2 backdrop-blur-sm">
        <p>
          Welcome to my contact terminal. Please fill out the form below to get
          in touch with me.
        </p>
        <p>{"-".repeat(80)}</p>
        <div>
          {lines.map((line, i) => (
            <p key={i} className={LEVELS[line.level]}>
              {line.level === "prompt" && (
                <span className="text-green-500">$ </span>
              )}
              {line.text}
            </p>
          ))}
          <div className="flex w-full flex-wrap">
            <p className="text-green-500">$ </p>
            {input.split("").map((char, i) =>
              i === cursor ? (
                <span
                  key={i}
                  className="animate-caret duration-1 h-5 w-2.5 bg-green-500 text-gray-800"
                >
                   {char === " " ? "\u00A0" : char}
                </span>
              ) : (
                <span key={i} className="text-gray-100">
                   {char === " " ? "\u00A0" : char}
                </span>
              ),
            )}
            {cursor === input.length && (
              <span className="animate-caret duration-1 h-5 w-2.5 bg-green-500"/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function TitleBar({ title }: { title?: string }) {
  return (
    <div className="grid w-full grid-cols-3 items-center bg-gray-800 px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <p className="justify-self-center">
        {title ?? "Terminal"}
      </p>
    </div>
  );
}
export default ContactTerminal;

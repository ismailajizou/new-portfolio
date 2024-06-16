"use client";

import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
];

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
  const [lines, setLines] = useState<Line[]>([
    {
      text: STEPS[0]!.prompt,
      level: "prompt",
    },
  ]);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });

  const handleNext = () => {
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
  };

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-md border-2 border-card bg-card font-mono">
      <div className="grid w-full grid-cols-3 items-center bg-gray-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <p className="justify-self-center">contact.me</p>
      </div>
      <div className="h-96 bg-gray-800/20 px-4 py-2 backdrop-blur-sm overflow-y-scroll">
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
          {STEPS[step].input === "text" && (
            <input
              type="text"
              value={fields[Object.keys(FIELDS)[step] as keyof Fields]}
              // on pressing enter key go to next step
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              onChange={(e) =>
                setFields({
                  ...fields,
                  [Object.keys(FIELDS)[step] as keyof Fields]: e.target.value,
                })
              }
              className="w-full bg-transparent caret-green-500 focus:outline-none"
              autoFocus
            />
          )}
          {STEPS[step].input === "textarea" && (
            <textarea
              value={fields[Object.keys(FIELDS)[step] as keyof Fields]}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              onChange={(e) =>
                setFields({
                  ...fields,
                  [Object.keys(FIELDS)[step] as keyof Fields]: e.target.value,
                })
              }
              className="w-full bg-transparent caret-green-500 focus:outline-none h-24 resize-none"
              autoFocus
            />
          )}
          {STEPS[step].input === "confirm" && (
            <button
              onClick={() =>
                setFields({
                  ...fields,
                  [Object.keys(FIELDS)[step] as keyof Fields]: "true",
                })
              }
              className="rounded-md bg-green-500 p-2"
            >
              Yes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactTerminal;

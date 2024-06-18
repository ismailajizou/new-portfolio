"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
type InferAsTuple = [unknown, ...unknown[]];
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
    prompt: "Wanna send it ? (y/n)",
    input: "confirm",
    validator: z.string(),
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

const SPACE_CHAR = "\u00A0";

type Fields = { [k in keyof typeof FIELDS]: string };
type Line = {
  text: string;
  level: keyof typeof LEVELS;
};

const useTyping = ({
  handleNext,
  terminalRef,
}: {
  handleNext: (input: string) => void;
  terminalRef: RefObject<HTMLElement>;
}) => {
  const [focus, setFocus] = useState(false);
  const [cursor, setCursor] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const moveLeft = useCallback(() => {
    if (cursor > 0) {
      setCursor((prev) => prev - 1);
    }
  }, [cursor]);
  const moveRight = useCallback(() => {
    if (cursor < input.length) {
      setCursor((prev) => prev + 1);
    }
  }, [cursor, input.length]);
  const moveStart = useCallback(() => {
    setCursor(0);
  }, []);
  const moveEnd = useCallback(() => {
    setCursor(input.length);
  }, [input.length]);
  const resetInput = useCallback(() => {
    setInput("");
    setCursor(0);
  }, [setInput]);
  const handleTyping = useCallback(
    (e: KeyboardEvent) => {
      if (!focus) return;
      e.preventDefault();
      const key = e.key;

      if (key === "Enter") {
        handleNext(input);
        resetInput();
        return;
      }
      if (key === "Backspace") {
        if (cursor > 0) {
          setInput((prev) => prev.slice(0, cursor - 1) + prev.slice(cursor));
          moveLeft();
        }
        return;
      }
      if (key === "ArrowLeft") {
        if (cursor > 0) {
          moveLeft();
        }
        return;
      }
      if (key === "ArrowRight") {
        if (cursor < input.length) {
          moveRight();
        }
        return;
      }
      if (key === "Home") {
        setCursor(0);
        return;
      }
      if (key === "End") {
        setCursor(input.length);
        return;
      }
      if (key.length === 1) {
        setInput((prev) => prev.slice(0, cursor) + e.key + prev.slice(cursor));
        setCursor((prev) => prev + e.key.length);
      }
    },
    [cursor, handleNext, input, moveLeft, moveRight, resetInput],
  );
  useEffect(() => {
    document.addEventListener("keydown", handleTyping);
    return () => {
      document.removeEventListener("keydown", handleTyping);
    };
  }, [handleTyping]);

  useEffect(() => {
    // manage focus inside the terminal
    const handleClick = (e: MouseEvent) => {
      if (terminalRef.current?.contains(e.target as Node)) {
        setFocus(true);
      } else {
        setFocus(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    input,
    cursor,
    isFocused: focus,
  };
};

const ContactTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

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

  const handleNext = (input: string) => {
    if (step === STEPS.length - 1) {
      console.log(fields);
      return;
    }

    const valid = STEPS[step]!.validator.safeParse(input.trim());
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
    if (step === STEPS.length - 2 && input.trim().toLowerCase() !== "y") {
      setLines([
        ...lines,
        {
          text: "Aborted.",
          level: "info",
        },
      ]);
      return;
    }
    if (step === STEPS.length - 2 && input.trim().toLowerCase() === "y") {
      setLines([
        ...lines,
        {
          text: "Sending message...",
          level: "info",
        },
      ]);
      return;
    }
    setFields({
      ...fields,
      [Object.keys(FIELDS)[step] as keyof Fields]: input.trim(),
    });
    setLines([
      ...lines,
      {
        text: input,
        level: "info",
      },
      { text: STEPS[step + 1]!.prompt, level: "prompt" },
    ]);
    setStep(step + 1);
  };
  const { input, cursor, isFocused } = useTyping({ handleNext, terminalRef });

  return (
    <div
      ref={terminalRef}
      className="mx-auto max-w-3xl overflow-hidden rounded-md border-2 border-card bg-card font-mono shadow-md"
    >
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
            <p className="text-green-500">${SPACE_CHAR}</p>
            {input.split("").map((char, i) =>
              isFocused && i === cursor ? (
                <span key={i} className=" bg-green-500 text-gray-800">
                  {char === " " ? SPACE_CHAR : char}
                </span>
              ) : (
                <span key={i} className="text-gray-100">
                  {char === " " ? SPACE_CHAR : char}
                </span>
              ),
            )}
            {isFocused && cursor === input.length && (
              <span className="bg-green-500">{SPACE_CHAR}</span>
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
      <p className="justify-self-center">{title ?? "Terminal"}</p>
    </div>
  );
}
export default ContactTerminal;

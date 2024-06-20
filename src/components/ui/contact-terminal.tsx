"use client";

import { contact } from "@/app/_actions/contact";
import { useMutation } from "@tanstack/react-query";
import React, {
  Dispatch,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import { isMobile } from "react-device-detect";

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
  mobileInputRef,
}: {
  handleNext: (input: string) => void;
  terminalRef: RefObject<HTMLElement>;
  mobileInputRef: RefObject<HTMLInputElement>;
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
    [cursor, focus, handleNext, input, moveLeft, moveRight, resetInput],
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
      setFocus(terminalRef.current?.contains(e.target as Node) ?? false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [terminalRef]);
  useEffect(() => {
    if (terminalRef.current !== null && mobileInputRef.current !== null) {
      terminalRef.current.onclick = () => {
        mobileInputRef.current?.focus();
      };
    }
  }, [mobileInputRef, terminalRef]);

  return {
    input,
    cursor,
    isFocused: focus,
    resetInput,
    setInput,
    setCursor,
  };
};

interface ICommadeParams {
  reset: () => void;
  setLines: Dispatch<React.SetStateAction<Line[]>>;
}

const COMMANDS = [
  {
    name: "help",
    description: "List all available commands",
    usage: "help",
    execute: ({ setLines }: ICommadeParams) => {
      const conmmads: string[] = [];
      COMMANDS.forEach((command) => {
        conmmads.push(`- ${command.name}: ${command.description}`);
      });
      setLines((l) => [
        ...l,
        { text: "help", level: "prompt" },
        { text: "Available commands:", level: "info" },
        ...conmmads.map((text): Line => ({ text, level: "info" })),
      ]);
    },
  },
  {
    name: "clear",
    description: "Clear the terminal",
    usage: "clear",
    execute: ({ reset, setLines }: ICommadeParams) => {
      setLines([]);
      reset();
    },
  },
  {
    name: "whoami",
    description: "Get information about the user",
    usage: "whoami",
    execute: ({ setLines }: ICommadeParams) => {
      setLines((l) => [
        ...l,
        { text: "whoami", level: "prompt" },
        { text: "Ismail Ajizou", level: "info" },
      ]);
    },
  },
] as const;

export const useScrollToBottom = ({
  changesToWatch,
  wrapperRef,
}: {
  changesToWatch: unknown[];
  wrapperRef: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (!wrapperRef.current) return;
    // eslint-disable-next-line no-param-reassign
    wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
  }, [changesToWatch, wrapperRef]);
};

const ContactTerminal = ({ title = "Terminal" }: { title?: string }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [isContact, setIsContact] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });

  const handleCommands = (input: string) => {
    if (input === "") return;
    // when the user type a commands and the terminal is not in the contact mode
    // we execute the command
    // If the command is contact we switch to the contact mode
    if (!isContact) {
      if (input === "contact") {
        setIsContact(true);
        setLines([
          ...lines,
          { text: "contact", level: "prompt" },
          { text: STEPS[0].prompt, level: "prompt" },
        ]);
        return;
      }
      const command = COMMANDS.find((command) => command.name === input);
      if (!command) {
        setLines([
          ...lines,
          {
            text: input,
            level: "prompt",
          },
          {
            text: `Unknown command: ${input}`,
            level: "error",
          },
        ]);
        return;
      }
      command.execute({
        setLines,
        reset: resetInput,
      });
      return;
    }
    // If the terminal is in the contact mode we handle the contact form
    // We validate the input and move to the next step
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
    if (step === STEPS.length - 1 && input.trim().toLowerCase() !== "y") {
      setLines([
        ...lines,
        {
          text: "Aborted.",
          level: "info",
        },
      ]);
      setStep(0);
      setIsContact(false);
      setFields({
        name: "",
        email: "",
        message: "",
      });
      resetInput();
      return;
    }
    if (step === STEPS.length - 1 && input.trim().toLowerCase() === "y") {
      setLines([
        ...lines,
        {
          text: "Sending message...",
          level: "info",
        },
      ]);
      contactMe(fields);
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
    setStep((s) => s + 1);
  };

  const { input, cursor, isFocused, resetInput, setInput, setCursor } =
    useTyping({
      handleNext: handleCommands,
      terminalRef,
      mobileInputRef,
    });

  useEffect(() => {
    setIsMobileDevice(isMobile);
  }, []);

  const { mutate: contactMe } = useMutation({
    mutationFn: contact,
    onSuccess: (data) => {
      setLines([
        { text: "contact", level: "prompt" },
        { text: data.message, level: "success" },
      ]);
      setIsContact(false);
      setStep(0);
      setFields({
        name: "",
        email: "",
        message: "",
      });
      resetInput();
    },
    onError: (error) => {
      setLines([
        { text: "contact", level: "prompt" },
        { text: error.message, level: "error" },
        { text: STEPS[0].prompt, level: "prompt" },
      ]);
      setIsContact(false);
      setStep(0);
      setFields({
        name: "",
        email: "",
        message: "",
      });
      resetInput();
    },
  });

  // handle mobile
  const mobileInput = isMobileDevice ? (
    <div className="absolute top-0 -z-50 bg-transparent opacity-0">
      <input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={input}
        className="pointer-events-none"
        onChange={(e) => {
          setInput(e.target.value);
          setCursor(e.target.value.length);
        }}
        ref={mobileInputRef}
      />
    </div>
  ) : null;

  return (
    <div
      ref={terminalRef}
      className="mx-auto max-w-3xl overflow-hidden rounded-md border-2 border-card bg-card font-mono shadow-md"
    >
      <TitleBar title={title} />
      <div className="h-96 overflow-y-scroll bg-gray-800/20 px-4 py-2 backdrop-blur-sm">
        <p>
          Welcome to my terminal, type{" "}
          <span className="text-green-500">contact</span> to contact me, or{" "}
          <span className="text-green-500">help</span> to list all available
          commands.
        </p>
        <div className="my-2 border-t border-dashed border-gray-300"></div>
        <div>
          {lines.map((line, i) => (
            <p key={i} className={LEVELS[line.level]}>
              {line.level === "prompt" && (
                <span className="text-green-500">$ </span>
              )}
              {line.text}
            </p>
          ))}
          <div className="relative flex w-full flex-wrap">
            {mobileInput}
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

function TitleBar({ title }: { title: string }) {
  return (
    <div className="grid w-full grid-cols-3 items-center bg-gray-800 px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <p className="justify-self-center">{title}</p>
    </div>
  );
}
export default ContactTerminal;

"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

type TypewriterTextProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  as?: React.ElementType;
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export function TypewriterText({ text, className = "", delay = 0, speed = 40, as: Component = "span" }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;
    
    const startTyping = () => {
      setHasStarted(true);
      setIsTyping(true);
      const typeNextChar = () => {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeNextChar, speed + Math.random() * 30);
        } else {
          setIsTyping(false);
        }
      };
      typeNextChar();
    };

    timeout = setTimeout(startTyping, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  const [scramble, setScramble] = useState("");
  useEffect(() => {
    if (!isTyping) {
      setScramble("");
      return;
    }
    const interval = setInterval(() => {
      setScramble(characters.charAt(Math.floor(Math.random() * characters.length)));
    }, 50);
    return () => clearInterval(interval);
  }, [isTyping]);

  if (!hasStarted) {
    return <Component className={`relative inline-block opacity-0 ${className}`}>{text}</Component>;
  }

  return (
    <Component className={`relative inline-block ${className}`}>
      {displayText}
      {isTyping && <span className="opacity-70">{scramble}</span>}
      {isTyping && <span className="animate-pulse bg-current ml-0.5 inline-block w-[0.4em] h-[0.8em]" />}
    </Component>
  );
}

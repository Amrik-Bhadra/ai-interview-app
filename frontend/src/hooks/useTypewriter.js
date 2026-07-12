import { useEffect, useState } from "react";

export function useTypewriter(text, { speed = 24, start = false } = {}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }

    let i = 0;
    let timeoutId;

    const type = () => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i <= text.length) timeoutId = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [text, start, speed]);

  return displayed;
}
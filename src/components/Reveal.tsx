import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
}

const REVEAL_ALL = "reveal:all";

/** Instantly show every pending reveal (used before anchor jumps). */
export function revealAll() {
  window.dispatchEvent(new Event(REVEAL_ALL));
}

type Phase = "idle" | "armed" | "animating";

/**
 * Fail-open scroll reveal. Content renders visible. It is only hidden ("armed")
 * when it starts below the viewport, motion is allowed, and there is no hash
 * jump. Any jump, or scrolling past it, shows it immediately.
 */
export default function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.location.hash) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("armed");
    let done = false;
    const finish = (animate: boolean) => {
      if (done) return;
      done = true;
      cleanup();
      setPhase(animate ? "animating" : "idle");
    };
    const check = () => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < 0) finish(false); // jumped past it: show instantly
      else if (rect.top < window.innerHeight * 0.92) finish(true);
    };
    const onAll = () => finish(false);
    const onHash = () => finish(false);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener(REVEAL_ALL, onAll);
    window.addEventListener("hashchange", onHash);
    function cleanup() {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.removeEventListener(REVEAL_ALL, onAll);
      window.removeEventListener("hashchange", onHash);
    }
    return () => {
      done = true;
      cleanup();
    };
  }, []);

  const Tag = as;
  const phaseClass = phase === "armed" ? "is-armed" : phase === "animating" ? "is-animating" : "";
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${phaseClass} ${className}`}
      style={delay && phase === "animating" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

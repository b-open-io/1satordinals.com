"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const directionMap = {
      up: { y: 100, x: 0 },
      down: { y: -100, x: 0 },
      left: { y: 0, x: 100 },
      right: { y: 0, x: -100 },
    };

    const { x, y } = directionMap[direction];

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y,
        x,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [direction, delay]);

  return <div ref={elementRef}>{children}</div>;
}

"use client";

import { useEffect, useState } from "react";

export function CSSBubbles() {
  const [bubbles, setBubbles] = useState<Array<{ left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate 50 bubbles with random positions and animation timings
    const newBubbles = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 9}s`, // 3s to 12s
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: bubble.left,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}
      <style jsx>{`
        .bubble {
          position: absolute;
          bottom: -100px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 113, 32, 0.4),
            rgba(255, 113, 32, 0.1)
          );
          box-shadow:
            inset 0 0 20px rgba(255, 113, 32, 0.3),
            inset 10px 10px 20px rgba(255, 255, 255, 0.1),
            0 0 30px rgba(255, 113, 32, 0.2);
          animation: rise linear infinite;
        }

        .bubble::before {
          content: "";
          position: absolute;
          top: 10%;
          left: 10%;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.8),
            transparent
          );
        }

        @keyframes rise {
          0% {
            bottom: -100px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            bottom: 700px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

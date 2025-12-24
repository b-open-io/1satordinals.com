"use client";

import { useEffect, useRef } from "react";

interface Pixel {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
}

export function PixelRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Initialize pixels
    const pixelCount = Math.floor((canvas.width * canvas.height) / 15000);
    pixelsRef.current = Array.from({ length: pixelCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      speed: Math.random() * 2 + 1,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixelsRef.current.forEach((pixel) => {
        // Draw pixelated square
        ctx.fillStyle = `rgba(239, 68, 68, ${pixel.opacity})`; // primary color
        ctx.fillRect(
          Math.floor(pixel.x),
          Math.floor(pixel.y),
          pixel.size,
          pixel.size,
        );

        // Update position
        pixel.y += pixel.speed;

        // Reset when off screen
        if (pixel.y > canvas.height) {
          pixel.y = -pixel.size;
          pixel.x = Math.random() * canvas.width;
          pixel.speed = Math.random() * 2 + 1;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

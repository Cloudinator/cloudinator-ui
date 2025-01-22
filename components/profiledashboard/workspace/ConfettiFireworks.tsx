import confetti from "canvas-confetti";
import { useEffect } from "react";

interface ConfettiFireworksProps {
  /**
   * Whether to automatically trigger the confetti animation.
   * @default false
   */
  autoTrigger?: boolean;
  /**
   * Duration of the confetti animation in seconds.
   * @default 5
   */
  duration?: number;
  /**
   * Colors for the confetti particles.
   * @default ["#ff0000", "#00ff00", "#0000ff"]
   */
  colors?: string[];
  /**
   * Shapes for the confetti particles.
   * @default ["circle", "square"]
   */
  shapes?: ("circle" | "square")[];
  /**
   * Callback function to execute after the confetti animation ends.
   */
  onComplete?: () => void;
}

export function ConfettiFireworks({
  autoTrigger = false,
  duration = 5,
  colors = ["#ff0000", "#00ff00", "#0000ff"],
  shapes = ["circle", "square"],
  onComplete,
}: ConfettiFireworksProps) {
  const triggerConfetti = () => {
    const animationEnd = Date.now() + duration * 1000;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      colors,
      shapes,
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        if (onComplete) onComplete(); // Execute the callback function
        return;
      }

      const particleCount = 50 * (timeLeft / (duration * 1000));
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  // Automatically trigger confetti if `autoTrigger` is true
  useEffect(() => {
    if (autoTrigger) {
      triggerConfetti();
    }
  }, [autoTrigger]);

  // Return null to avoid rendering anything
  return null;
}
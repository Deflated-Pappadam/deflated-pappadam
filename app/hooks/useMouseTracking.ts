import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

export const useMouseTracking = (
  globalMouseX: MotionValue<number>,
  globalMouseY: MotionValue<number>,
  isMobile: boolean
) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          globalMouseX.set(e.clientX);
          globalMouseY.set(e.clientY);

          // Update custom cursor
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
          }
        });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(rafId);
      };
    }
  }, [globalMouseX, globalMouseY, isMobile]);

  return { cursorRef };
};

import { useEffect, useRef } from "react";
import "./ScrollExpandBanner.css";

export default function ScrollExpandBanner({ children }) {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let ticking = false;
    let frameId;
    let smoothProgress = 0;
    let targetProgress = 0;
    let animationId;
    let previousTime = 0;

    const readScrollProgress = () => {
      const rect = frame.getBoundingClientRect();
      const travel = window.innerHeight * 0.9;
      targetProgress = Math.min(1, Math.max(0, (window.innerHeight * 0.78 - rect.top) / travel));
      ticking = false;
    };

    const animate = (time) => {
      // Exponential smoothing keeps the effect responsive in both scroll directions.
      const delta = previousTime ? Math.min(time - previousTime, 40) : 16;
      previousTime = time;
      const blend = 1 - Math.exp(-delta / 110);
      smoothProgress += (targetProgress - smoothProgress) * blend;

      if (Math.abs(targetProgress - smoothProgress) < 0.0005) {
        smoothProgress = targetProgress;
      }

      frame.style.setProperty("--expand-progress", smoothProgress.toFixed(4));
      if (smoothProgress !== targetProgress) {
        animationId = window.requestAnimationFrame(animate);
      } else {
        animationId = null;
      }
    };

    const update = () => {
      readScrollProgress();
      if (animationId === null || animationId === undefined) {
        animationId = window.requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        frameId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="scroll-expand-wrapper" ref={frameRef}>
      <div className="scroll-expand-content">{children}</div>
    </div>
  );
}

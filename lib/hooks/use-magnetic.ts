import { useEffect, RefObject } from "react";

export const useMagnetic = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const distance = Math.sqrt(x * x + y * y);

      if (distance < 80) {
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      } else {
        el.style.transform = `translate(0px, 0px)`;
      }
    };

    const handleLeave = () => {
      el.style.transform = `translate(0px, 0px)`;
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref]);
};

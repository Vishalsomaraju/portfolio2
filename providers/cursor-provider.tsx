"use client";

import { useEffect } from "react";
import { useCursorStore } from "@/store/use-cursor-store";

export function CursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setPosition = useCursorStore((s) => s.setPosition);
  const setType = useCursorStore((s) => s.setType);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition(e.clientX, e.clientY);
    };

    const handleOver = (e: any) => {
      const type = e.target?.dataset?.cursor;
      if (type) setType(type);
      else setType("default");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return <>{children}</>;
}

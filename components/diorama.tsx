"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type RefObject } from "react";
import { asset } from "@/lib/base-path";

const DioramaCanvas = dynamic(() => import("./diorama-canvas"), { ssr: false });

export function Diorama({
  scrollRoot,
}: {
  scrollRoot: RefObject<HTMLElement | null>;
}) {
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAllowMotion(!reduced);
  }, []);

  return (
    <div className="diorama-stage" data-motion={allowMotion ? "full" : "still"}>
      <img
        src={asset("/diorama-fallback.webp")}
        alt="Stylized gold bars and coins, a phone, and a sneaker."
        width={1200}
        height={800}
      />
      {allowMotion ? <DioramaCanvas scrollRoot={scrollRoot} /> : null}
    </div>
  );
}

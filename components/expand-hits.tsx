"use client";

import { useEffect } from "react";

const MIN = 44;

type Box = { x: number; y: number; w: number; h: number };

export function ExpandHits() {
  useEffect(() => {
    const frameEl = document.querySelector<HTMLElement>(".poster");
    if (!frameEl) return;
    const hits = [...frameEl.querySelectorAll<HTMLElement>("[data-hit]")];

    const layout = () => {
      const frameRect = frameEl.getBoundingClientRect();
      if (frameRect.width < 2 || frameRect.height < 2) return;
      const frameW = frameRect.width;
      const frameH = frameRect.height;
      hits.forEach((el) => {
        const design: Box = {
          x: (Number(el.dataset.x) / 100) * frameW,
          y: (Number(el.dataset.y) / 100) * frameH,
          w: (Number(el.dataset.w) / 100) * frameW,
          h: (Number(el.dataset.h) / 100) * frameH,
        };
        const limit = {
          l: (Number(el.dataset.l) / 100) * frameW,
          t: (Number(el.dataset.t) / 100) * frameH,
          r: (Number(el.dataset.r) / 100) * frameW,
          b: (Number(el.dataset.b) / 100) * frameH,
        };
        const availW = Math.max(design.w, limit.r - limit.l);
        const availH = Math.max(design.h, limit.b - limit.t);
        let w = Math.min(Math.max(design.w, MIN), availW);
        let h = Math.min(Math.max(design.h, MIN), availH);
        let x = design.x + design.w / 2 - w / 2;
        let y = design.y + design.h / 2 - h / 2;
        if (x < limit.l) x = limit.l;
        if (y < limit.t) y = limit.t;
        if (x + w > limit.r) x = Math.max(limit.l, limit.r - w);
        if (y + h > limit.b) y = Math.max(limit.t, limit.b - h);
        if (x > design.x) x = design.x;
        if (y > design.y) y = design.y;
        if (x + w < design.x + design.w) w = design.x + design.w - x;
        if (y + h < design.y + design.h) h = design.y + design.h - y;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  return null;
}

import { ExpandHits } from "@/components/expand-hits";
import { asset } from "@/lib/base-path";
import { hitLimits, posterControls, posterHeight, posterWidth, sectionAnchors } from "@/lib/poster-map";

export default function HomePage() {
  return (
    <main id="top" className="poster" style={{ maxWidth: posterWidth }}>
      <h1 className="sr-only">The Exchange. Buy, sell, trade.</h1>
      <img
        className="poster-art"
        src={asset("/the-exchange-final-no-beams-no-badges.jpg")}
        width={posterWidth}
        height={posterHeight}
        alt="The Exchange. Buy, sell, trade. Gold, phones, sneakers, and electronics in Reading, Pennsylvania. Message @the.exchange610 on Instagram."
      />
      {sectionAnchors.map((anchor) => (
        <div key={anchor.id} id={anchor.id} className="section-anchor" style={{ top: `${anchor.y}%` }} />
      ))}
      {posterControls.map((control) => (
        <a
          key={control.id}
          id={control.id}
          className="hit"
          data-hit=""
          data-x={control.x}
          data-y={control.y}
          data-w={control.w}
          data-h={control.h}
          data-l={hitLimits[control.id].l}
          data-t={hitLimits[control.id].t}
          data-r={hitLimits[control.id].r}
          data-b={hitLimits[control.id].b}
          href={control.href}
          aria-label={control.label}
          style={{
            left: `${control.x}%`,
            top: `${control.y}%`,
            width: `${control.w}%`,
            height: `${control.h}%`,
          }}
          {...(control.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        />
      ))}
      <ExpandHits />
    </main>
  );
}

/** Boxes are percentages of the-exchange-final-no-beams-no-badges.jpg (864×1152). */

export const posterWidth = 864;
export const posterHeight = 1152;

const INSTAGRAM = "https://www.instagram.com/the.exchange610/";

export type PosterControl = {
  id: string;
  href: string;
  label: string;
  external?: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const sectionAnchors: { id: string; y: number }[] = [
  { id: "buy", y: 58.073 },
  { id: "contact", y: 84.722 },
];

/** Allowed growth region, still clear of neighboring controls and nearby type. */
export const hitLimits: Record<string, { l: number; t: number; r: number; b: number }> = {
  logo: { l: 0, t: 0, r: 22, b: 7.2 },
  "nav-buy": { l: 70, t: 0, r: 89.6, b: 3.45 },
  "nav-contact": { l: 90.2, t: 0, r: 100, b: 3.45 },
  "hero-instagram": { l: 26, t: 51.5, r: 53.6, b: 57.3 },
  "hero-buy": { l: 54, t: 51.5, r: 76, b: 57.3 },
  "band-instagram": { l: 52, t: 83.8, r: 90, b: 91.3 },
  "footer-logo": { l: 2, t: 93.2, r: 34, b: 99.6 },
  "footer-instagram": { l: 36, t: 91.8, r: 68, b: 98.2 },
};

export const posterControls: PosterControl[] = [
  {
    id: "logo",
    href: "#top",
    label: "The Exchange, buy sell trade",
    x: 0.926,
    y: 0.347,
    w: 19.213,
    h: 3.906,
  },
  {
    id: "nav-buy",
    href: "#buy",
    label: "What we buy",
    x: 78.241,
    y: 1.302,
    w: 9.838,
    h: 1.042,
  },
  {
    id: "nav-contact",
    href: "#contact",
    label: "Contact",
    x: 91.435,
    y: 1.302,
    w: 6.481,
    h: 1.042,
  },
  {
    id: "hero-instagram",
    href: INSTAGRAM,
    label: "Message on Instagram",
    external: true,
    x: 29.745,
    y: 51.823,
    w: 23.148,
    h: 3.472,
  },
  {
    id: "hero-buy",
    href: "#buy",
    label: "What we buy",
    x: 54.398,
    y: 51.91,
    w: 16.667,
    h: 3.299,
  },
  {
    id: "band-instagram",
    href: INSTAGRAM,
    label: "Message @the.exchange610, Reading, Pennsylvania",
    external: true,
    x: 55.671,
    y: 84.722,
    w: 30.787,
    h: 5.99,
  },
  {
    id: "footer-logo",
    href: "#top",
    label: "The Exchange, buy sell trade",
    x: 7.06,
    y: 94.01,
    w: 21.875,
    h: 4.427,
  },
  {
    id: "footer-instagram",
    href: INSTAGRAM,
    label: "@the.exchange610",
    external: true,
    x: 40.625,
    y: 94.358,
    w: 17.94,
    h: 1.562,
  },
];

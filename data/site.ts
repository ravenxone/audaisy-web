export type SiteLink = {
  label: string;
  href: string;
  kind: "anchor" | "external";
};

export type FlowerId =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "midLeft"
  | "midRight";

export type CaptionPosition = {
  x: number;
  y: number;
  align: "left" | "center" | "right";
  tail: "left" | "center" | "right";
  width?: number;
};

export type FlowerExchange = {
  id: string;
  speaker: FlowerId;
  listener: FlowerId;
  line: string;
  echo: string;
  durationMs: number;
};

export const navItems = [] as const satisfies readonly SiteLink[];

export const heroCtas = {
  primary: {
    label: "View Github",
    href: "https://github.com/ravenxone/audaisy",
    kind: "external",
  },
  secondary: {
    label: "Learn More",
    href: "#story",
    kind: "anchor",
  },
} as const satisfies {
  primary: SiteLink;
  secondary: SiteLink;
};

export const flowerPositions: Record<FlowerId, { caption: CaptionPosition }> = {
  topLeft: {
    caption: { x: 68, y: 14, align: "right", tail: "left", width: 24 },
  },
  topCenter: {
    caption: { x: 78, y: 8, align: "right", tail: "left", width: 22 },
  },
  topRight: {
    caption: { x: 87, y: 14, align: "right", tail: "left", width: 18 },
  },
  midLeft: {
    caption: { x: 66, y: 28, align: "right", tail: "left", width: 28 },
  },
  midRight: {
    caption: { x: 85, y: 26, align: "right", tail: "left", width: 22 },
  },
};

export const flowerExchanges = [
  {
    id: "story",
    speaker: "topLeft",
    listener: "topCenter",
    line: "I have a story to tell.",
    echo: "I'm all ears.",
    durationMs: 2160,
  },
  {
    id: "petals",
    speaker: "midLeft",
    listener: "topRight",
    line: "That plot twist hit hard.",
    echo: "I nearly lost my petals.",
    durationMs: 2160,
  },
  {
    id: "leaf",
    speaker: "midRight",
    listener: "topLeft",
    line: "Ready for chapter two?",
    echo: "I leaf nothing unheard.",
    durationMs: 2160,
  },
  {
    id: "stem",
    speaker: "topCenter",
    listener: "midRight",
    line: "Read me the bedtime draft.",
    echo: "Only if it's stem-to-stern.",
    durationMs: 2160,
  },
  {
    id: "bloom",
    speaker: "topRight",
    listener: "midLeft",
    line: "This story really grows on you.",
    echo: "Good, I came to bloom-listen.",
    durationMs: 2160,
  },
] as const satisfies readonly FlowerExchange[];

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

export type BubblePosition = {
  x: number;
  y: number;
  align: "left" | "center" | "right";
};

export type FlowerExchange = {
  id: string;
  speaker: FlowerId;
  listener: FlowerId;
  line: readonly [string, string];
  echo: readonly [string, string];
  durationMs: number;
};

export const navItems = [
  {
    label: "Our Story",
    href: "#story",
    kind: "anchor",
  },
  {
    label: "Github",
    href: "https://github.com/ravenxone/audaisy",
    kind: "external",
  },
] as const satisfies readonly SiteLink[];

export const heroCtas = {
  primary: {
    label: "Create Free Audiobooks",
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

export const flowerPositions: Record<
  FlowerId,
  { headX: number; headY: number; bubble: BubblePosition }
> = {
  topLeft: {
    headX: 34,
    headY: 16,
    bubble: { x: 18, y: 1, align: "left" },
  },
  topCenter: {
    headX: 54,
    headY: 29,
    bubble: { x: 54, y: 11, align: "center" },
  },
  topRight: {
    headX: 79,
    headY: 15,
    bubble: { x: 90, y: 2, align: "right" },
  },
  midLeft: {
    headX: 30,
    headY: 41,
    bubble: { x: 11, y: 29, align: "left" },
  },
  midRight: {
    headX: 79,
    headY: 38,
    bubble: { x: 92, y: 26, align: "right" },
  },
};

export const flowerExchanges = [
  {
    id: "story",
    speaker: "topLeft",
    listener: "topRight",
    line: ["I have a story", "to tell."],
    echo: ["I'm all ears,", "start at page one."],
    durationMs: 3200,
  },
  {
    id: "chapter",
    speaker: "midLeft",
    listener: "topCenter",
    line: ["Can you hear every", "chapter and pause?"],
    echo: ["Every chapter,", "every breath."],
    durationMs: 3200,
  },
  {
    id: "voice",
    speaker: "midRight",
    listener: "topLeft",
    line: ["Turn writing", "into voice."],
    echo: ["And voice into", "good company."],
    durationMs: 3200,
  },
] as const satisfies readonly FlowerExchange[];

export const storyParagraphs = [
  "Audaisy is a macOS-first local audiobook creation app for writers who want their words to sound like they belong to someone, not something.",
  "The product is being built around a private local runtime, an editor that respects the page, and a listening experience that makes revision feel conversational instead of mechanical.",
  "This site is the first hello: a lightweight front door for the idea while the app itself takes shape.",
] as const;

export const storyHighlights = [
  {
    title: "Local-first voice",
    description: "The architecture is designed around a local runtime instead of shipping drafts away by default.",
  },
  {
    title: "Mac-first workflow",
    description: "Audaisy starts on Apple Silicon laptops where writing, revision, and playback can live side by side.",
  },
  {
    title: "Writing with an audience",
    description: "The goal is simple: give each piece of writing a voice and help every voice find someone ready to listen.",
  },
] as const;

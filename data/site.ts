export type SiteLink = {
  label: string;
  href: string;
  kind: "anchor" | "external";
};

export const heroCtas = {
  primary: {
    label: "View Github",
    href: "https://github.com/ravenxone/audaisy",
    kind: "external",
  },
} as const satisfies {
  primary: SiteLink;
};

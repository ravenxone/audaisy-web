import Link from "next/link";

import type { SiteLink } from "@/data/site";

import styles from "./Hero.module.css";

type HeroProps = {
  ctas: {
    primary: SiteLink;
    secondary: SiteLink;
  };
};

function linkProps(link: SiteLink) {
  return link.kind === "external"
    ? { target: "_blank", rel: "noreferrer" }
    : undefined;
}

export function Hero({ ctas }: HeroProps) {
  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1
            id="hero-title"
            className={styles.title}
            aria-label="Audaisy gives every Writing a Voice"
          >
            <span className={styles.titleLine}>
              <span className={styles.titleSans}>
                Audaisy gives every Writing a
              </span>{" "}
              <span className={styles.titleVoice}>Voice</span>
            </span>
          </h1>
          <p className={styles.subtext}>
            Create audiobooks, podcasts, and voice-overs locally on your
            MacBook
          </p>
          <div className={styles.actions}>
            <Link
              className={styles.primaryButton}
              href={ctas.primary.href}
              {...linkProps(ctas.primary)}
            >
              {ctas.primary.label}
            </Link>
            <Link
              className={styles.secondaryButton}
              href={ctas.secondary.href}
            >
              {ctas.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

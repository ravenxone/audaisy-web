import Link from "next/link";

import type { SiteLink } from "@/data/site";

import styles from "./Hero.module.css";

type HeroProps = {
  primaryCta: SiteLink;
};

function linkProps(link: SiteLink) {
  return link.kind === "external"
    ? { target: "_blank", rel: "noreferrer" }
    : undefined;
}

export function Hero({ primaryCta }: HeroProps) {
  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <h1
          id="hero-title"
          className={styles.title}
          aria-label="Audaisy gives every writing a Voice"
        >
          <span className={styles.titleSans}>
            Audaisy gives every writing a
          </span>{" "}
          <span className={styles.titleVoice}>Voice</span>
        </h1>
        <p className={styles.subtext}>
          Create audiobooks, podcasts, and voice-overs locally on your MacBook
        </p>
        <div className={styles.videoFrame}>
          <div className={styles.videoInner}>
            <iframe
              className={styles.video}
              src="https://www.youtube.com/embed/aFe_A8NRpy8"
              title="Audaisy product video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <Link
          className={styles.primaryButton}
          href={primaryCta.href}
          {...linkProps(primaryCta)}
        >
          {primaryCta.label}
        </Link>
        <p className={styles.tagline}>Local . Secure . Free . Open sourced</p>
      </div>
    </section>
  );
}

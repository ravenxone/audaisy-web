import Link from "next/link";

import type { FlowerExchange, SiteLink } from "@/data/site";

import { FlowerConversation } from "./FlowerConversation";
import styles from "./Hero.module.css";

type HeroProps = {
  ctas: {
    primary: SiteLink;
    secondary: SiteLink;
  };
  exchanges: readonly FlowerExchange[];
};

function linkProps(link: SiteLink) {
  return link.kind === "external"
    ? { target: "_blank", rel: "noreferrer" }
    : undefined;
}

export function Hero({ ctas, exchanges }: HeroProps) {
  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>
              Audaisy gives every Writing a Voice
            </span>
            {" "}
            <span className={styles.titleLine}>
              and every Voice an Audience
            </span>
          </h1>
          <div className={styles.actions}>
            <Link
              className={styles.primaryButton}
              href={ctas.primary.href}
              {...linkProps(ctas.primary)}
            >
              {ctas.primary.label}
            </Link>
            <Link className={styles.secondaryButton} href={ctas.secondary.href}>
              {ctas.secondary.label}
            </Link>
          </div>
        </div>
        <div className={styles.art}>
          <FlowerConversation exchanges={exchanges} />
        </div>
      </div>
    </section>
  );
}

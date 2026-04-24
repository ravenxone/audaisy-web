import Image from "next/image";
import Link from "next/link";

import type { SiteLink } from "@/data/site";

import styles from "./Header.module.css";

type HeaderProps = {
  navItems: readonly SiteLink[];
  primaryCta: SiteLink;
};

function linkProps(link: SiteLink) {
  return link.kind === "external"
    ? { target: "_blank", rel: "noreferrer" }
    : undefined;
}

export function Header({ navItems, primaryCta }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" aria-label="Audaisy home" className={styles.logoWrap}>
            <Image
              src="/images/daisy-logo.png"
              alt=""
              width={72}
              height={72}
              priority
              className={styles.logo}
            />
          </Link>
        </nav>
        <Link
          className={styles.cta}
          href={primaryCta.href}
          {...linkProps(primaryCta)}
        >
          {primaryCta.label}
        </Link>
      </div>
    </header>
  );
}

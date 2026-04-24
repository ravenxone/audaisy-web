import { FlowerConversation } from "@/components/FlowerConversation";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { flowerExchanges, heroCtas, navItems } from "@/data/site";

import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.stack}>
        <section className={styles.foldOne}>
          <Header navItems={navItems} primaryCta={heroCtas.primary} />
          <Hero ctas={heroCtas} />
        </section>
        <section className={styles.flowerBand} aria-hidden="true">
          <div className={styles.flowerBandInner}>
            <FlowerConversation exchanges={flowerExchanges} />
          </div>
        </section>
        <StorySection />
      </div>
    </main>
  );
}

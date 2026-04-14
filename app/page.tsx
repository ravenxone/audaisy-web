import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import {
  flowerExchanges,
  heroCtas,
  navItems,
  storyHighlights,
  storyParagraphs,
} from "@/data/site";

import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <Header navItems={navItems} primaryCta={heroCtas.primary} />
        <Hero ctas={heroCtas} exchanges={flowerExchanges} />
        <StorySection
          highlights={storyHighlights}
          paragraphs={storyParagraphs}
        />
      </div>
    </main>
  );
}

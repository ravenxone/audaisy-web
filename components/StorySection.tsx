import styles from "./StorySection.module.css";

type StoryHighlight = {
  title: string;
  description: string;
};

type StorySectionProps = {
  paragraphs: readonly string[];
  highlights: readonly StoryHighlight[];
};

export function StorySection({
  paragraphs,
  highlights,
}: StorySectionProps) {
  return (
    <section id="story" className={styles.section} aria-labelledby="story-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Our Story</p>
          <h2 id="story-title" className={styles.title}>
            Built for writers who want a voice that stays close to home.
          </h2>
          <div className={styles.paragraphs}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className={styles.panel} aria-label="Audaisy highlights">
          <p className={styles.panelTitle}>Audaisy at a glance</p>
          <ul className={styles.list}>
            {highlights.map((highlight) => (
              <li key={highlight.title} className={styles.item}>
                <strong>{highlight.title}</strong>
                <span>{highlight.description}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

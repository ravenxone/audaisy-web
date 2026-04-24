import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { heroCtas } from "@/data/site";

import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <Header primaryCta={heroCtas.primary} />
      <Hero primaryCta={heroCtas.primary} />
    </main>
  );
}

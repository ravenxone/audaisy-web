"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import {
  flowerPositions,
  type CaptionPosition,
  type FlowerExchange,
  type FlowerId,
} from "@/data/site";

import styles from "./FlowerConversation.module.css";

type FlowerConversationProps = {
  exchanges: readonly FlowerExchange[];
};

type FlowerCue = {
  id: string;
  flower: FlowerId;
  text: string;
  durationMs: number;
};

function alignmentClass(align: CaptionPosition["align"]) {
  if (align === "left") {
    return styles.alignLeft;
  }

  if (align === "right") {
    return styles.alignRight;
  }

  return styles.alignCenter;
}

function tailClass(tail: CaptionPosition["tail"]) {
  if (tail === "left") {
    return styles.tailLeft;
  }

  if (tail === "right") {
    return styles.tailRight;
  }

  return styles.tailCenter;
}

function captionOffset(align: CaptionPosition["align"]) {
  if (align === "center") {
    return "-50%";
  }

  if (align === "right") {
    return "-100%";
  }

  return "0%";
}

function Caption({
  position,
  text,
}: {
  position: CaptionPosition;
  text: string;
}) {
  return (
    <p
      className={`${styles.caption} ${alignmentClass(position.align)} ${tailClass(
        position.tail
      )}`}
      style={
        {
          left: `${position.x}%`,
          top: `${position.y}%`,
          width: position.width ? `${position.width}%` : undefined,
          "--caption-x": captionOffset(position.align),
        } as CSSProperties
      }
      data-testid="flower-caption"
    >
      {text}
    </p>
  );
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);

      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);

    return () => mediaQuery.removeListener(update);
  }, []);

  return reducedMotion;
}

export function FlowerConversation({ exchanges }: FlowerConversationProps) {
  const reducedMotion = useReducedMotion();
  const cues = useMemo<FlowerCue[]>(
    () =>
      exchanges.flatMap((exchange) => [
        {
          id: `${exchange.id}-speaker`,
          flower: exchange.speaker,
          text: exchange.line,
          durationMs: exchange.durationMs,
        },
        {
          id: `${exchange.id}-listener`,
          flower: exchange.listener,
          text: exchange.echo,
          durationMs: exchange.durationMs,
        },
      ]),
    [exchanges]
  );
  const initialCueIndex = cues.length > 1 ? 1 : 0;
  const [activeCueIndex, setActiveCueIndex] = useState(initialCueIndex);
  const visibleCueIndex = reducedMotion ? initialCueIndex : activeCueIndex;
  const currentCue = cues[visibleCueIndex] ?? cues[0];

  useEffect(() => {
    if (reducedMotion || cues.length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveCueIndex((currentIndex) => (currentIndex + 1) % cues.length);
    }, currentCue.durationMs);

    return () => window.clearTimeout(timer);
  }, [currentCue.durationMs, currentCue.id, cues.length, reducedMotion]);

  return (
    <div
      className={styles.stage}
      data-reduced-motion={reducedMotion}
      data-testid="flower-conversation"
    >
      <div
        className={styles.captionLayer}
        role="status"
        aria-live={reducedMotion ? "off" : "polite"}
      >
        <Caption
          position={flowerPositions[currentCue.flower].caption}
          text={currentCue.text}
        />
      </div>

      <div className={styles.plant}>
        <Image
          src="/images/flower-bunch.svg"
          alt="A hand-drawn daisy bush with five flowers in conversation."
          width={196}
          height={70}
          className={styles.image}
          priority
        />
      </div>
    </div>
  );
}

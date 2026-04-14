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
  lines: readonly [string, string];
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
  lines,
}: {
  position: CaptionPosition;
  lines: readonly [string, string];
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
      <span>{lines[0]}</span>
      <span>{lines[1]}</span>
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
          lines: exchange.line,
          durationMs: Math.round(exchange.durationMs / 2),
        },
        {
          id: `${exchange.id}-listener`,
          flower: exchange.listener,
          lines: exchange.echo,
          durationMs: Math.round(exchange.durationMs / 2),
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
  }, [currentCue.durationMs, cues.length, reducedMotion]);

  return (
    <div
      className={styles.stage}
      data-reduced-motion={reducedMotion}
      data-testid="flower-conversation"
    >
      <div className={styles.plant}>
        <Image
          src="/images/daisybush.png"
          alt="A hand-drawn daisy bush with five flowers in conversation."
          width={904}
          height={610}
          className={styles.image}
          priority
        />
      </div>

      <div role="status" aria-live={reducedMotion ? "off" : "polite"}>
        <Caption
          position={flowerPositions[currentCue.flower].caption}
          lines={currentCue.lines}
        />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import {
  flowerPositions,
  type BubblePosition,
  type FlowerExchange,
  type FlowerId,
} from "@/data/site";

import styles from "./FlowerConversation.module.css";

type FlowerConversationProps = {
  exchanges: readonly FlowerExchange[];
};

function bubbleClass(align: BubblePosition["align"]) {
  if (align === "left") {
    return styles.alignLeft;
  }

  if (align === "right") {
    return styles.alignRight;
  }

  return styles.alignCenter;
}

function bubbleTransformX(align: BubblePosition["align"]) {
  if (align === "center") {
    return "-50%";
  }

  if (align === "right") {
    return "-100%";
  }

  return "0%";
}

function Bubble({
  position,
  lines,
  testId,
  echo = false,
}: {
  position: BubblePosition;
  lines: readonly [string, string];
  testId: string;
  echo?: boolean;
}) {
  return (
    <p
      className={`${styles.bubble} ${bubbleClass(position.align)} ${
        echo ? styles.echo : ""
      }`}
      style={
        {
          left: `${position.x}%`,
          top: `${position.y}%`,
          "--bubble-x": bubbleTransformX(position.align),
        } as CSSProperties
      }
      data-testid={testId}
    >
      <span>{lines[0]}</span>
      <span>{lines[1]}</span>
    </p>
  );
}

function Marker({
  flowerId,
  listener = false,
}: {
  flowerId: FlowerId;
  listener?: boolean;
}) {
  const flower = flowerPositions[flowerId];

  return (
    <div
      className={`${styles.marker} ${listener ? styles.listener : ""}`}
      style={{
        left: `${flower.headX}%`,
        top: `${flower.headY}%`,
      }}
      aria-hidden="true"
    />
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
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleIndex = reducedMotion ? 0 : activeIndex;

  useEffect(() => {
    if (reducedMotion || exchanges.length < 2) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % exchanges.length);
    }, exchanges[visibleIndex].durationMs);

    return () => window.clearTimeout(timer);
  }, [exchanges, reducedMotion, visibleIndex]);

  const currentExchange = exchanges[visibleIndex];

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

      <Marker flowerId={currentExchange.speaker} />
      <Marker flowerId={currentExchange.listener} listener />

      <div role="status" aria-live={reducedMotion ? "off" : "polite"}>
        <Bubble
          position={flowerPositions[currentExchange.speaker].bubble}
          lines={currentExchange.line}
          testId="speaker-bubble"
        />
        <Bubble
          position={flowerPositions[currentExchange.listener].bubble}
          lines={currentExchange.echo}
          testId="listener-bubble"
          echo
        />
      </div>
    </div>
  );
}

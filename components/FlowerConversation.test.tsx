import { act, render, screen } from "@testing-library/react";

import { flowerExchanges } from "@/data/site";

import { FlowerConversation } from "./FlowerConversation";

describe("FlowerConversation", () => {
  const defaultMatchMedia = window.matchMedia;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: defaultMatchMedia,
    });
  });

  it("cycles the minimal caption between flowers over time", () => {
    render(<FlowerConversation exchanges={flowerExchanges} />);

    expect(screen.getByTestId("flower-caption")).toHaveTextContent(
      /I'm all ears,\s*start at page one\./
    );

    act(() => {
      vi.advanceTimersByTime(Math.round(flowerExchanges[0].durationMs / 2) + 50);
    });

    expect(screen.getByTestId("flower-caption")).toHaveTextContent(
      /Can you hear every\s*chapter and pause\?/
    );
  });

  it("stays on the initial caption when reduced motion is preferred", () => {
    const matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMedia,
    });

    render(<FlowerConversation exchanges={flowerExchanges} />);

    act(() => {
      vi.advanceTimersByTime(20_000);
    });

    expect(screen.getByTestId("flower-caption")).toHaveTextContent(
      /I'm all ears,\s*start at page one\./
    );
  });
});

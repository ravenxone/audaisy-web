import { render, screen } from "@testing-library/react";

import Page from "./page";

describe("Landing page", () => {
  it("renders the hero and keeps fold 2 as an anchor target", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Audaisy gives every Writing a Voice/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Create audiobooks, podcasts, and voice-overs locally on your MacBook/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /View Github/i })
    ).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Learn More/i })).toHaveAttribute(
      "href",
      "#story"
    );
    expect(document.getElementById("story")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Our Story/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^Github$/i })).not.toBeInTheDocument();
    expect(screen.getByTestId("flower-conversation")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";

import Page from "./page";

describe("Landing page", () => {
  it("renders the headline, primary actions, story section, and GitHub link", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Audaisy gives every Writing a Voice and every Voice an Audience/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Create Free Audiobooks/i })
    ).toHaveLength(2);
    expect(screen.getByRole("link", { name: /Learn More/i })).toHaveAttribute(
      "href",
      "#story"
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Built for writers who want a voice that stays close to home\./i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Github/i })).toHaveAttribute(
      "href",
      "https://github.com/ravenxone/audaisy"
    );
  });
});

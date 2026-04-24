import { render, screen } from "@testing-library/react";

import Page from "./page";

describe("Landing page", () => {
  it("renders the simplified landing page", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Audaisy gives every writing a Voice/i,
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
    expect(screen.getByTitle(/Audaisy product video/i)).toHaveAttribute(
      "src",
      expect.stringContaining("youtube.com/embed/aFe_A8NRpy8")
    );
    expect(
      screen.getByText(/Local \. Secure \. Free \. Open sourced/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Learn More/i })
    ).not.toBeInTheDocument();
    expect(document.getElementById("story")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("flower-conversation")
    ).not.toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

describe("Page", () => {
  it("renders a paragraph", () => {
    render(<Page />);

    const motto = screen.findByText(
      /Sigue las recompensas de bloques de Ethereum en USD a lo largo del tiempo/
    );

    expect(motto).toBeInTheDocument();
  });
});

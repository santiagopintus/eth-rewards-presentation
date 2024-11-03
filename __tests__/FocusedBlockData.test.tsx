import { render, screen, fireEvent } from "@testing-library/react";
import FocusedBlockData from "@src/components/FocusedBlockData";

describe("FocusedBlockData Component", () => {
  it("renders correctly when reward and date are provided (simulating hover)", async () => {
    render(<FocusedBlockData reward={1000} date="2023-10-10" />);

    fireEvent.mouseMove(window, { clientX: 525, clientY: 525 });

    expect(await screen.findByText("2023-10-10")).toBeInTheDocument();
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
  });

  it("does not render when reward is not provided (no hover)", () => {
    render(<FocusedBlockData date="2023-10-10" />);

    expect(screen.queryByText("2023-10-10")).not.toBeInTheDocument();
  });
});

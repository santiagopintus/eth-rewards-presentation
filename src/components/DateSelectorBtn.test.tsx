import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import DateSelectorBtn from "./DateSelectorBtn";

test("DateSelectorBtn calls setDateSpan with correct dates when clicked", () => {
  // Mock function for setDateSpan
  const mockSetDateSpan = vi.fn();

  // Sample date for the 'since' prop
  const sinceDate = new Date("2023-10-01");

  // Render the button with props
  render(
    <DateSelectorBtn
      setDateSpan={mockSetDateSpan}
      text="Last Month"
      since={sinceDate}
    />
  );

  // Find the button by its text
  const button = screen.getByText("Last Month");

  // Click the button
  fireEvent.click(button);

  // Expect setDateSpan to have been called once with the correct 'since' date and today's date as 'till'
  expect(mockSetDateSpan).toHaveBeenCalledWith({
    since: sinceDate,
    till: expect.any(Date),
  });
  expect(mockSetDateSpan).toHaveBeenCalledTimes(1);
});

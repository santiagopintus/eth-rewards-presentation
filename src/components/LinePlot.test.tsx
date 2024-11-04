import LinePlot from "./LinePlot";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ThemeContext } from "@src/context/ThemeContext";
import { Block } from "@src/model/model.interface";

const mockData: Block[] = [
  { reward: 1000, date: { date: "2024-10-01" } },
  { reward: 1500, date: { date: "2024-10-14" } },
  { reward: 2000, date: { date: "2024-10-24" } },
];

test("LinePlot renders correctly with provided data", () => {
  // Mock function para simular el setState
  const mockSetFocusedData = vi.fn();

  render(
    <ThemeContext.Provider value={{ toggleTheme: () => {}, isDarkMode: true }}>
      <LinePlot data={mockData} setFocusedData={mockSetFocusedData} />
    </ThemeContext.Provider>
  );

  /* Find svg plot and main line */
  expect(screen.getByTestId("linePlot")).toBeDefined();
  expect(screen.getByTestId("mainLine")).toBeDefined();
});

import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import AdditionalInfo from "./AdditionalInfo";
import { ThemeContext } from "@src/context/ThemeContext"; // mock ThemeContext
import { Block } from "@src/model/model.interface";

test("AdditionalInfo; displays skeletons when data is null", () => {
  const { container } = render(
    <ThemeContext.Provider value={{ toggleTheme: () => {}, isDarkMode: true }}>
      <AdditionalInfo data={null} />
    </ThemeContext.Provider>
  );
  container.getElementsByClassName("MuiSkeleton-root");
  expect(
    container.getElementsByClassName("MuiSkeleton-root").length
  ).toBeGreaterThan(3);
  container.remove();
});

test("AdditionalInfo; displays stats correctly when data is provided", () => {
  // Mock data for testing
  const mockData: Block[] = [
    { reward: 1000, date: { date: "2024-10-01" } },
    { reward: 1500, date: { date: "2024-10-14" } },
    { reward: 2000, date: { date: "2024-10-24" } },
  ];

  render(
    <ThemeContext.Provider value={{ toggleTheme: () => {}, isDarkMode: true }}>
      <AdditionalInfo data={mockData} />
    </ThemeContext.Provider>
  );

  expect(screen.getAllByText("Estadísticas adicionales:")).toBeDefined();
  expect(screen.getByText("3")).toBeDefined();
  expect(screen.getByText("$1,500")).toBeDefined();
  expect(screen.getByText("$1,000")).toBeDefined();
  expect(screen.getByText("$2,000")).toBeDefined();
});

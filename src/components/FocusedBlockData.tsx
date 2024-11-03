import { useThemeContext } from "@src/context/ThemeContext";
import { currencyFormatterUSD, isWindowLessThan } from "@src/utils/Utils";
import s from "@styles/focusedBlockData.module.scss";
import React, { useEffect, useState } from "react";

const FocusedBlockData = ({
  reward,
  date,
}: {
  reward?: number;
  date?: string;
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const { isDarkMode } = useThemeContext();

  const cardWidth = 250;
  const getCardPosition = (e: MouseEvent) => {
    const offsetX = 50;
    let newX = e.clientX + offsetX;
    if (newX + cardWidth > window.innerWidth) {
      newX = e.clientX - cardWidth - offsetX;
    }
    return { x: newX, y: e.clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition(getCardPosition(e));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!reward) return null;

  return (
    <div
      id="focusedBlockDataContainer"
      className={s.focusedBlockDataContainer}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        pointerEvents: "none",
        backgroundColor: isDarkMode ? "#19243f" : "#fafafa",
      }}
    >
      <p className={s.date}>{date}</p>
      <p className={s.reward}>{currencyFormatterUSD.format(reward || 0)}</p>
    </div>
  );
};

export default FocusedBlockData;

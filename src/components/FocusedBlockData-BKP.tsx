import { currencyFormatterUSD, isWindowLessThan } from "@src/utils/Utils";
import s from "@styles/focusedBlockData.module.scss";
import React from "react";

const FocusedBlockData = ({
  reward,
  date,
}: {
  reward?: number;
  date?: string;
}) => {
  const mobileText = "Para comenzar presiona sobre el gráfico";
  const desktopText =
    "Para ver información sobre el bloque pon el cursor sobre un punto en el gráfico";
  const text = isWindowLessThan(600) ? mobileText : desktopText;
  return (
    <div className={s.focusedBlockData}>
      <h2>Datos del bloque:</h2>
      {!reward ? (
        <p className={s.noDataLegend}>{text}</p>
      ) : (
        <ul className={s.focusedBlockDataList}>
          <li>Recompensa: {currencyFormatterUSD.format(reward || 0)}</li>
          <li>Fecha: {date}</li>
        </ul>
      )}
    </div>
  );
};

export default FocusedBlockData;

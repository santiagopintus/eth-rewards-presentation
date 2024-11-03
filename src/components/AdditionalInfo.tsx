import { Skeleton } from "@mui/material";
import { useThemeContext } from "@src/context/ThemeContext";
import { Block } from "@src/model/blocks.interface";
import { currencyFormatterUSD } from "@src/utils/Utils";
import s from "@styles/additionalInfo.module.scss";

const AdditionalInfo = ({ data }: { data: Block[] | null }) => {
  /* GET PRIMARY COLOR */
  const { isDarkMode } = useThemeContext();
  const color = isDarkMode ? "#00ffff" : "#000";

  const smallSkeleton = (
    <Skeleton variant="text" width="50px" sx={{ display: "inline-block" }} />
  );

  const formatAmount = (amount: number, isCurrency = true) => {
    return (
      <span style={{ fontWeight: 700, fontSize: 18, color }}>
        {isCurrency ? currencyFormatterUSD.format(amount) : amount}
      </span>
    );
  };

  return (
    <div className={s.additionalInfo}>
      <h2>Estadísticas adicionales:</h2>
      <ul className={s.additionalInfoList}>
        <li>
          Total de bloques:{" "}
          {data?.length ? formatAmount(data.length, false) : smallSkeleton}
        </li>
        <li>
          Promedio diario:{" "}
          {data?.length
            ? formatAmount(data.reduce((a, b) => a + b.reward, 0) / data.length)
            : smallSkeleton}
        </li>
        <li>
          Mínima:{" "}
          {data?.length
            ? formatAmount(Math.min(...data.map((d) => d.reward)))
            : smallSkeleton}
        </li>
        <li>
          Máximo:{" "}
          {data?.length
            ? formatAmount(Math.max(...data.map((d) => d.reward)))
            : smallSkeleton}
        </li>
      </ul>
    </div>
  );
};

export default AdditionalInfo;

import { Skeleton } from "@mui/material";
import { Block } from "@src/model/blocks.interface";
import { currencyFormatterUSD } from "@src/utils/Utils";
import s from "@styles/additionalInfo.module.scss";

const AdditionalInfo = ({ data }: { data: Block[] | null }) => {
  const smallSkeleton = (
    <Skeleton variant="text" width="50px" sx={{ display: "inline-block" }} />
  );

  return (
    <div className={s.additionalInfo}>
      <h2>Estadísticas adicionales:</h2>
      <ul className={s.additionalInfoList}>
        <li>Total de bloques: {data?.length || smallSkeleton}</li>
        <li>
          Promedio diario:{" "}
          {data
            ? currencyFormatterUSD.format(
                data.reduce((a, b) => a + b.reward, 0) / data.length
              )
            : smallSkeleton}
        </li>
        <li>
          Mínima:{" "}
          {data
            ? currencyFormatterUSD.format(
                Math.min(...data.map((d) => d.reward))
              )
            : smallSkeleton}
        </li>
        <li>
          Máximo:{" "}
          {data
            ? currencyFormatterUSD.format(
                Math.max(...data.map((d) => d.reward))
              )
            : smallSkeleton}
        </li>
      </ul>
    </div>
  );
};

export default AdditionalInfo;

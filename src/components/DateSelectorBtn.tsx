import { Button } from "@mui/material";
import { DateSpan } from "@src/model/blocks.interface";

type DateSelectorBtnProps = {
  setDateSpan: React.Dispatch<React.SetStateAction<DateSpan | null>>;
  text: string;
  since: Date;
};

const DateSelectorBtn = ({
  setDateSpan,
  text,
  since,
}: DateSelectorBtnProps) => {
  // till //TODAY AS ISO
  return (
    <Button
      sx={{ fontWeight: 700 }}
      variant="contained"
      onClick={() => setDateSpan({ since, till: new Date() })}
    >
      {text}
    </Button>
  );
};

export default DateSelectorBtn;

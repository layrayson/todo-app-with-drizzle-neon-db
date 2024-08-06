import { Chip } from "@mui/material";
import { green } from "@mui/material/colors";

const StatusPill = () => {
  return (
    <Chip
      label={"Done"}
      style={{
        backgroundColor: green[400],
        color: "white",
        fontWeight: "bold",
      }}
    />
  );
};

export default StatusPill;

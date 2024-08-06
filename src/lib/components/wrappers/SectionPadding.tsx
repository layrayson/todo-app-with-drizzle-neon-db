import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const SectionPadding = ({ children }: Props) => {
  return (
    <Box maxWidth={"500px"} paddingX={2} mx={"auto"}>
      {children}
    </Box>
  );
};

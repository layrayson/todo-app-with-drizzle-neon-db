"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const theme = createTheme();
export const MUIThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

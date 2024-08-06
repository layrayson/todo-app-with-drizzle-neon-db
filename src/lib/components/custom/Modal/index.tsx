import { Box, IconButton, Modal as MuiModal, Typography } from "@mui/material";
import React from "react";
import { modalStyle } from "./style";
import { Close } from "@mui/icons-material";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: React.JSX.Element;
  variant?: "small" | "medium" | "large";
}

export default function Modal({
  open,
  handleClose,
  children,
  variant = "small",
}: Props) {
  const getModalStyle = modalStyle({ variant });
  return (
    <MuiModal open={open} onClose={handleClose} sx={getModalStyle.modal}>
      <Box
        sx={{
          ...getModalStyle.container,
        }}
      >
        <Box sx={getModalStyle.headingContainer}>
          <IconButton
            sx={{
              ...getModalStyle.closeBtn,
            }}
            onClick={handleClose}
          >
            <Close sx={getModalStyle.close} />
          </IconButton>
        </Box>

        <Box sx={getModalStyle.content}>{children}</Box>
      </Box>
    </MuiModal>
  );
}

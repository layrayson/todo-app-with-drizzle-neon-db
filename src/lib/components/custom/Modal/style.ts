import { SxProps } from "@mui/material";

type PropKeys = {
  container: SxProps;
  modal: SxProps;
  close: SxProps;
  closeBtn: SxProps;
  content: SxProps;
  headingContainer: SxProps;
};

export const modalStyle = ({
  variant,
}: {
  variant: "small" | "medium" | "large";
}): PropKeys => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "background.paper",
    maxHeight: "80vh",
    my: "auto",
    width:
      variant == "small"
        ? { xs: "80vw", sm: "40vw", lg: "320px" }
        : variant == "medium"
        ? { xs: "80vw", sm: "40vw", lg: "591px" }
        : { xs: "80vw", sm: "40vw", lg: "699px" },
    borderRadius: "12px",

    overflowY: "auto",

    p: { xs: 4, md: 2 },

    position: "relative",
  },
  modal: {
    display: "flex",
    alignitems: "center",
    justifyContent: "center",
  },
  close: {
    fontSize: 19,
  },
  closeBtn: {
    p: 0.5,
  },
  content: {
    width: "100%",
    height: "100%",
    overflowX: "auto",
  },

  headingContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
});

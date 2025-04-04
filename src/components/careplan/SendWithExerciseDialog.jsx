import React, { useContext, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { SendDialog } from "./SendDialog";

export const SendWithExerciseDialog = ({ open, setOpen }) => {
  const { darkMode } = useContext(ThemeContext);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  return (
    <>
      <Dialog
        open={open}
        maxWidth="lg"
        fullWidth
        onClose={() => setOpen(false)}
      >
        <DialogTitle sx={{ fontSize: "30px", pb: 0 }}>
          Send Care Plan - Add Protocol Exercises
        </DialogTitle>
        <DialogContent
          sx={{
            px: "20px",
            py: "20px",
            pt: 0,
            mb: 0,
          }}
        >
          <Button
            sx={{
              borderRadius: "5px",
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: 500,
              color: darkMode
                ? getColors.appBarBgLight
                : getColors.appBarBgDark,
              py: "11px",
              textAlign: "center",
              "&: hover": {
                background: "none",
                color: getColors.primaryMain,
              },
            }}
            onClick={() => {
              setSendDialogOpen(true);
            }}
          >
            Skip Exercises
          </Button>
          <Box>Protocol Exercises List</Box>
        </DialogContent>
      </Dialog>
      <SendDialog open={sendDialogOpen} setOpen={setSendDialogOpen} />
    </>
  );
};

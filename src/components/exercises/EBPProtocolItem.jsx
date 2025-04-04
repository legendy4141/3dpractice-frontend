import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getColors } from "../../themes/theme";
import { SendDialog } from "./SendDialog";

export const EBPProtocolItem = ({ protocolname, id }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleProtocolClick = () => {
    setOpenDialog(id);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          my: "20px",
          px: "28px",
          py: "14px",
          background: getColors.primaryMain,
          borderRadius: "5px",
          cursor: "pointer",
          "&:hover": {
            background: getColors.listItemHoverBg,
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "130px",
        }}
        onClick={handleProtocolClick}
      >
        <Box display={"flex"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "22px",
              color: getColors.buttonText,
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {`${protocolname}`}
          </Typography>
          <KeyboardArrowRightIcon
            sx={{ color: getColors.buttonText, ml: "12px" }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#CBE5FF",
            textAlign: "left",
          }}
        >
          EBP Protocols cannot be modified
        </Typography>
      </Box>
      <SendDialog
        open={openDialog}
        setOpen={setOpenDialog}
        id={id}
        type="ebp"
      />
    </>
  );
};

import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getColors } from "../../themes/theme";
import { useNavigate, useParams } from "react-router-dom";

export const EBPProtocolItem = () => {
  const { mainId, subId } = useParams();
  const navigate = useNavigate();

  const handleProtocolClick = (protocolId) => {
    navigate(`/exercise/${mainId}/${subId}/${protocolId}`);
  };

  return (
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
      }}
      onClick={() => handleProtocolClick("erp")}
    >
      <Box display={"flex"} sx={{ mb: 5, alignItems: "center" }}>
        <Typography
          sx={{
            fontSize: "22px",
            color: getColors.buttonText,
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {`EBP ${subId}`}
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
  );
};

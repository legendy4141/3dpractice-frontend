import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getColors } from "../../themes/theme";
import { useNavigate, useParams } from "react-router-dom";

export const CustomProtocolItem = ({ id, name }) => {
  const { mainId, subId } = useParams();
  const navigate = useNavigate();

  const handleProtocolClick = () => {
    navigate(`/exercise/${mainId}/${subId}/${id}`);
  };

  const handleModifyClicked = (e) => {
    e.stopPropagation();
    navigate(`/exercise/${mainId}/${subId}/${id}/modify`);
  };

  const handleCopyClicked = (e) => {
    e.stopPropagation();
    navigate(`/exercise/${mainId}/${subId}/${id}/copy`);
  };

  const handleDeleteClicked = (e) => {
    e.stopPropagation();
    alert("delete");
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
      onClick={handleProtocolClick}
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
          {name}
        </Typography>
        <KeyboardArrowRightIcon
          sx={{ color: getColors.buttonText, ml: "12px" }}
        />
      </Box>
      <Box display={"flex"}>
        <Button
          variant="text"
          sx={{
            fontSize: "16px",
            color: "#CBE5FF",
            "&:hover": { background: "none", color: getColors.buttonText },
          }}
          onClick={handleModifyClicked}
        >
          Modify
        </Button>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            mx: 1,
            bgcolor: "#CBE5FF",
          }}
        />
        <Button
          variant="text"
          sx={{
            fontSize: "16px",
            color: "#CBE5FF",
            "&:hover": { background: "none", color: getColors.buttonText },
          }}
          onClick={handleCopyClicked}
        >
          Copy
        </Button>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            mx: 1,
            bgcolor: "#CBE5FF",
          }}
        />
        <Button
          variant="text"
          sx={{
            fontSize: "16px",
            color: "#CBE5FF",
            "&:hover": { background: "none", color: getColors.buttonText },
          }}
          onClick={handleDeleteClicked}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

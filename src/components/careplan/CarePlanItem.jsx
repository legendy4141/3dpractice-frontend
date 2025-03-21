import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { getColors } from "../../themes/theme";
import { useNavigate } from "react-router-dom";

export const CarePlanItem = ({ id, name, handleClick }) => {
  const navigate = useNavigate();

  const handleClicked = () => {
    handleClick();
  };

  const handleModifyClicked = (e) => {
    e.stopPropagation();
    navigate(`/care-plan/${id}/modify`);
  };

  const handleCopyClicked = (e) => {
    e.stopPropagation();
    navigate(`/care-plan/${id}/copy`);
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
      onClick={handleClicked}
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

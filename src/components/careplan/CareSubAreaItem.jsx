import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";

export const CareSubAreaItem = ({ id, condition }) => {
  const navigate = useNavigate();
  const { mainId, careId } = useParams();
  const { darkMode } = useContext(ThemeContext);

  const handleClick = (subId) => {
    navigate(`/care-plan/${mainId}/${careId}/${subId}`);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "480px",
        padding: "20px",
        borderRadius: "5px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: darkMode
          ? getColors.thumbnailBorderDark
          : getColors.thumbnailBorderLight,
        background: darkMode
          ? getColors.thumbnnailBgDark
          : getColors.thumbnnailBgLight,
        cursor: "pointer",
        "&:hover": {
          borderColor: darkMode
            ? getColors.thumbnailTextDark
            : getColors.thumbnailTextLight,
        },
      }}
      onClick={() => {
        handleClick(condition);
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          color: darkMode
            ? getColors.drawerTextDark
            : getColors.thumbnailTextLight,
        }}
      >
        {`${condition} (${careId})`}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        width="max-content"
        sx={{
          borderRadius: "5px",
          px: 2,
          py: 1,
          color: getColors.primaryMain,
          bgcolor: "#DEEFFF",
          alignItems: "center",
          "&:hover": {
            color: "blue",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(condition);
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Continue
        </Typography>
      </Box>
    </Box>
  );
};

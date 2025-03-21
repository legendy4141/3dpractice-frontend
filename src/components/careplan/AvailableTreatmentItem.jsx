import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { Add } from "@mui/icons-material";

export const AvailableTreatmentItem = ({ id, title, onAdd }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleClick = () => {
    onAdd(id);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "360px",
        px: "28px",
        py: "12px",
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
    >
      <Typography
        sx={{
          fontSize: "22px",
          fontWeight: 500,
          color: darkMode
            ? getColors.drawerTextDark
            : getColors.thumbnailTextLight,
        }}
      >
        {title}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        width="max-content"
        sx={{
          borderRadius: "50%",
          padding: "20px",
          color: "#009903",
          bgcolor: "#EAFFEF",
          alignItems: "center",
          "&:hover": {
            color: "green",
          },
        }}
        onClick={handleClick}
      >
        <Add />
      </Box>
    </Box>
  );
};

import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

export const CurrentPhaseItem = ({ id, name, onEdit }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleClick = () => {
    onEdit(id);
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
        {name}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        width="max-content"
        sx={{
          borderRadius: "50%",
          padding: "20px",
          color: "#007FFF",
          bgcolor: "#E9F3FF",
          alignItems: "center",
          "&:hover": {
            color: "blue",
          },
        }}
        onClick={handleClick}
      >
        <BorderColorOutlinedIcon />
      </Box>
    </Box>
  );
};

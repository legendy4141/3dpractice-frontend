import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const SelectedPhaseItem = ({ id, name, onRemove, onChange }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleClick = () => {
    onRemove(id);
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
        cursor: "grab",
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
          color: "#FF3D3D",
          bgcolor: "#FFE8E8",
          alignItems: "center",
          "&:hover": {
            color: "red",
          },
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <DeleteOutlinedIcon />
      </Box>
    </Box>
  );
};

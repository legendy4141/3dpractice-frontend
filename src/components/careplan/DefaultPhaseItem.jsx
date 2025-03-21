import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const DefaultPhaseItem = ({ id, name, onRemove }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleClick = () => {
    onRemove(id);
  };

  return (
    <Box
      sx={{
        width: "350px",
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
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: 3 }}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          width="max-content"
          sx={{
            borderRadius: "5px",
            px: "20px",
            py: 1,
            color: "#FF3D3D",
            bgcolor: "#FFE8E8",
            alignItems: "center",
            "&:hover": {
              color: "red",
            },
          }}
          onClick={handleClick}
        >
          <DeleteOutlinedIcon />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              ml: "10px",
            }}
          >
            Remove
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

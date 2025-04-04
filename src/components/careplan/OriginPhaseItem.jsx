import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";

export const OriginPhaseItem = ({ id, name, onSetDefault, onCopyPhase }) => {
  const { darkMode } = useContext(ThemeContext);

  const handleClick = () => {
    console.log("clicked");
  };

  const handleCopyClick = (e) => {
    e.stopPropagation();
    onCopyPhase(id);
  };

  const handleSetDefaultClick = (e) => {
    e.stopPropagation();
    onSetDefault(id);
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
      onClick={handleClick}
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
        justifyContent={"space-between"}
        sx={{ mt: 3, gap: "20px" }}
      >
        <Box
          sx={{
            borderRadius: "5px",
            px: "20px",
            py: 1,
            color: getColors.secondaryTextLight,
            bgcolor: "#E6E6E6",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: 500,
            "&:hover": {
              color: "black",
            },
          }}
          onClick={handleCopyClick}
        >
          Copy Phase
        </Box>
        <Box
          sx={{
            borderRadius: "5px",
            px: "20px",
            py: 1,
            color: "#007FFF",
            bgcolor: "#E9F4FF",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: 500,
            "&:hover": {
              color: "blue",
            },
          }}
          onClick={handleSetDefaultClick}
        >
          Set Default
        </Box>
      </Box>
    </Box>
  );
};

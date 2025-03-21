import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { getColors } from "../../themes/theme";

export const Thumbnail = ({ title, image, routing }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);
  const currentSection = location.pathname.split("/")[1];
  const videoId = routing.replace("/video", "");

  const handleClick = () => {
    if (videoId === "/scoliosis") {
      navigate(`/${currentSection}${videoId}/Scoliosis`);
    } else if (videoId === "/si-joint") {
      navigate(`/${currentSection}${videoId}/SI%20Joint`);
    } else if (
      videoId === "/interactive-cervical-spine" ||
      videoId === "/interactive-full-spine"
    ) {
      window.open(`/webgl/${videoId}/index.html`, "_blank");
    } else {
      navigate(`/${currentSection}${videoId}`);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      onClick={handleClick}
      sx={{
        padding: 1,
        width: "350px",
        backgroundColor: darkMode
          ? getColors.thumbnnailBgDark
          : getColors.thumbnnailBgLight,
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        border: darkMode
          ? `1px solid ${getColors.thumbnailBorderDark}`
          : `1px solid ${getColors.thumbnailBorderLight}`,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: darkMode
            ? getColors.thumbnailHoverBgDark
            : getColors.thumbnailHoverBgLight,
        },
      }}
    >
      <img
        src={image}
        alt={title}
        width={100}
        height={100}
        style={{ borderRadius: "8px" }}
      />
      <Box sx={{ ml: "20px" }}>
        <Typography
          sx={{
            color: darkMode
              ? getColors.thumbnailTextDark
              : getColors.thumbnailTextLight,
            fontSize: "22px",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

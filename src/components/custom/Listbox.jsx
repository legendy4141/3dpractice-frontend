import React, { useContext } from "react";
import { ListItem, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { getColors } from "../../themes/theme";

export const Listbox = ({ title, image, routing }) => {
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
    <ListItem
      onClick={handleClick}
      sx={{
        fontSize: "22px",
        width: "280px",
        px: "28px",
        py: "14px",
      }}
    >
      <ListItemText
        primary={title}
        sx={{
          color: darkMode
            ? getColors.listItemTextDark
            : getColors.listItemTextLight,
        }}
      />
    </ListItem>
  );
};

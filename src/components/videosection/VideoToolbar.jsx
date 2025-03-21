import React, { useContext, useEffect, useState } from "react";
import { Box, List, ListItem, ListItemIcon, Tooltip } from "@mui/material";

import { ThemeContext } from "../../context/ThemeContext";
import { VideoPlayerContext } from "../../context/VideoPlayerContext";

import { actionItems } from "../../utils/actionItems";
import { getColors } from "../../themes/theme";
import { useParams } from "react-router-dom";

export const VideoToolbar = ({ onActionSelect }) => {
  const { videoId, selectedSubItem } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const { isLoading } = useContext(VideoPlayerContext);
  const { darkMode } = useContext(ThemeContext);

  const videoUrl = `/videos/${videoId}-${selectedSubItem}.mp4`;

  useEffect(() => {
    setSelectedItem(null);
  }, [videoUrl]);

  const handleItemClick = (tool) => {
    if (tool === "draw" || tool === "erase") {
      setSelectedItem(tool);
    } else {
      setSelectedItem(null);
    }
    onActionSelect(tool);
  };

  return (
    <Box
      display={isLoading ? "none" : "flex"}
      flexDirection="column"
      justifyContent="center"
      sx={{
        border: darkMode ? "none" : `1px solid ${getColors.appBarBorderLight}`,
      }}
    >
      <List>
        {actionItems.map((item, index) => (
          <Tooltip key={index} title={item.text} arrow placement="right">
            <ListItem
              onClick={() => handleItemClick(item.tool)}
              sx={{
                background:
                  selectedItem === item.tool
                    ? getColors.listItemHoverBg
                    : "inherit",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "20px",
                  padding: 2,
                  borderBottom: `1px solid ${getColors.listItemIconBorderBottom}`,
                  "&.MuiListItemIcon-root": {
                    "& svg": {
                      filter:
                        (darkMode || selectedItem === item.tool) &&
                        "brightness(0) invert(1)",
                    },
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

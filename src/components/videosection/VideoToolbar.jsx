import React, { useContext, useEffect, useState } from "react";
import { Box, List, ListItem, ListItemIcon, Tooltip } from "@mui/material";

import { ThemeContext } from "../../context/ThemeContext";
import { VideoPlayerContext } from "../../context/VideoPlayerContext";
import { getColors } from "../../themes/theme";
import { useNavigate, useParams } from "react-router-dom";

import { ReactComponent as Pencil } from "../../assets/actionbar/pencil.svg";
import { ReactComponent as Erase } from "../../assets/actionbar/erase.svg";
import { ReactComponent as Exercise } from "../../assets/actionbar/exercise_black.svg";
import { ReactComponent as Care } from "../../assets/actionbar/care_black.svg";
import { ReactComponent as User } from "../../assets/actionbar/user_black.svg";
import { ReactComponent as Share } from "../../assets/actionbar/share.svg";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";

const actionItems = [
  { icon: <Pencil />, text: "Draw", tool: "draw" },
  { icon: <Erase />, text: "Erase", tool: "erase" },
  { icon: <Exercise />, text: "Exercises", tool: "exercise" },
  { icon: <Care />, text: "Care Plan", tool: "care-plan" },
  { icon: <User />, text: "Users", tool: "users" },
  { icon: <Share />, text: "Share", tool: "share" },
];

export const VideoToolbar = ({ onActionSelect }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const isUser = user?.securityType === 3;
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
      navigate(`/${tool}`);
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
        {actionItems
          .filter((item) => !(isUser && item.tool === "users"))
          .map((item, index) => (
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

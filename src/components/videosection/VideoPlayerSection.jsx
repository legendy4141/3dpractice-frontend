import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

import { VideoPlayerContext } from "../../context/VideoPlayerContext";
import { CustomVideoPlayer } from "./CustomVideoPlayer";
import { VideoToolbar } from "./VideoToolbar";
import { VariantSelectionbar } from "./VariantSelectionbar";

export const VideoPlayerSection = () => {
  const { section, videoId, selectedSubItem } = useParams();
  const [isVideoError, setIsVideoError] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const videoUrl = `/assets/videos/${videoId}/${selectedSubItem}.mp4`;
  const theme = useTheme();
  const isNervousSystem = section === "nervous_system";

  useEffect(() => {
    setIsVideoError(false);
    setActiveTool(null);
  }, [videoUrl]);

  useEffect(() => {
    document.body.style.touchAction = "none";
    return () => {
      document.body.style = "";
    };
  }, []);

  const handleActionSelect = (tool) => {
    setActiveTool(tool);
  };

  const renderContent = () => {
    // Skip "No view selected" if subItem is auto-selected or available
    if (!selectedSubItem) {
      return isNervousSystem ? (
        <Box display="flex" alignItems="center" textAlign="center">
          <Box sx={{ px: 5 }}>
            <VariantSelectionbar />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              sx={{ fontSize: "24px", color: theme.palette.text.secondary }}
            >
              To display detailed imaging data, please select one of the
              available views from the options above.
            </Typography>
          </Box>
        </Box>
      ) : null; // Skip rendering "No view selected" for other sections
    }

    // Show error if video is not found
    if (isVideoError) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              color: theme.palette.text.secondary,
              width: "100%",
              textAlign: "center",
            }}
          >
            No Video Found
          </Typography>
        </Box>
      );
    }

    // Render video player and toolbar
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
        height="100%"
      >
        {isNervousSystem && <VariantSelectionbar />}
        <CustomVideoPlayer
          src={videoUrl}
          onError={() => setIsVideoError(true)}
          activeTool={activeTool}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <VideoToolbar onActionSelect={handleActionSelect} />
        </Box>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      textAlign="center"
      justifyContent="center"
      flexGrow={1}
      alignItems="flex-start"
    >
      <VideoPlayerContext.Provider value={{ isLoading, setIsLoading }}>
        {renderContent()}
      </VideoPlayerContext.Provider>
    </Box>
  );
};

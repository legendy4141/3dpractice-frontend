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

  const handleActionSelect = (tool) => {
    setActiveTool(tool);
  };

  const renderContent = () => {
    if (isNervousSystem) {
      return (
        <Box display="flex" alignItems="center" textAlign="center">
          <Box sx={{ px: 5 }}>
            <VariantSelectionbar />
          </Box>

          {!selectedSubItem ? (
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{ fontSize: "24px", color: theme.palette.text.secondary }}
              >
                No view selected
              </Typography>
              <Typography
                sx={{
                  fontSize: "24px",
                  color: theme.palette.text.secondary,
                  marginTop: "10px",
                }}
              >
                To display detailed imaging data, please select one of the
                available views from the options above.
              </Typography>
            </Box>
          ) : isVideoError ? (
            <Typography
              sx={{
                fontSize: "24px",
                color: theme.palette.text.secondary,
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              No Video Found
            </Typography>
          ) : (
            <Box display="flex" flexDirection="row">
              <CustomVideoPlayer
                src={videoUrl}
                onError={() => setIsVideoError(true)}
                activeTool={activeTool}
              />
              <Box display="flex" justifyContent="center">
                <VideoToolbar onActionSelect={handleActionSelect} />
              </Box>
            </Box>
          )}
        </Box>
      );
    }

    if (!selectedSubItem) {
      return (
        <>
          <Typography
            sx={{ fontSize: "24px", color: theme.palette.text.secondary }}
          >
            No view selected
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              color: theme.palette.text.secondary,
              marginTop: "10px",
            }}
          >
            To display detailed imaging data, please select one of the available
            views from the options above.
          </Typography>
        </>
      );
    }

    if (isVideoError) {
      return (
        <Typography
          sx={{ fontSize: "24px", color: theme.palette.text.secondary }}
        >
          No Video Found
        </Typography>
      );
    }

    return (
      <Box display="flex" flexDirection="row" justifyContent={"center"}>
        <CustomVideoPlayer
          src={videoUrl}
          onError={() => setIsVideoError(true)}
          activeTool={activeTool}
        />
        <Box display="flex" justifyContent="center">
          <VideoToolbar onActionSelect={handleActionSelect} />
        </Box>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      textAlign="center"
      justifyContent="center"
      flexGrow={1}
    >
      <VideoPlayerContext.Provider value={{ isLoading, setIsLoading }}>
        {renderContent()}
      </VideoPlayerContext.Provider>
    </Box>
  );
};

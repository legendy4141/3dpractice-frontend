import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";

import { VideoPlayerContext } from "../../context/VideoPlayerContext";
import { ThemeContext } from "../../context/ThemeContext";

export const ShareVideoPlayer = ({ src, onError }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null); // Reference for the player container
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const { isLoading, setIsLoading } = useContext(VideoPlayerContext);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateProgress = () => {
        setProgress((video.currentTime / video.duration) * 100);
      };
      video.addEventListener("timeupdate", updateProgress);
      return () => video.removeEventListener("timeupdate", updateProgress);
    }
  }, []);

  const handleSeek = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration
        ? (newValue / 100) * videoRef.current.duration
        : 0;
      setProgress(videoRef.current.duration ? newValue : 0);
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setIsPlaying(false);
    setProgress(0);
    if (onError) onError();
  };

  useEffect(() => {
    setIsLoading(true);
    handleSeek(null, 0);
    setIsPlaying(false);
  }, [src, setIsLoading]);

  // Full-screen functionality
  const toggleFullScreen = () => {
    if (playerRef.current) {
      if (!isFullScreen) {
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
        } else if (playerRef.current.mozRequestFullScreen) {
          // Firefox
          playerRef.current.mozRequestFullScreen();
        } else if (playerRef.current.webkitRequestFullscreen) {
          // Chrome, Safari
          playerRef.current.webkitRequestFullscreen();
        } else if (playerRef.current.msRequestFullscreen) {
          // IE/Edge
          playerRef.current.msRequestFullscreen();
        }
        setIsFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          // Chrome, Safari
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
          document.msExitFullscreen();
        }
        setIsFullScreen(false);
      }
    }
  };

  // Listen for fullscreen changes (when the escape key is pressed or full-screen mode changes)
  useEffect(() => {
    const onFullScreenChange = () => {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    document.addEventListener("webkitfullscreenchange", onFullScreenChange);
    document.addEventListener("mozfullscreenchange", onFullScreenChange);
    document.addEventListener("MSFullscreenChange", onFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        onFullScreenChange
      );
      document.removeEventListener("mozfullscreenchange", onFullScreenChange);
      document.removeEventListener("MSFullscreenChange", onFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isFullScreen) {
        video.style.width = "100vw";
        video.style.height = "95vh";
      } else {
        video.style.width = "100vw";
        video.style.height = "94vh";
      }
    }
  }, [isFullScreen]);

  return (
    <Box
      ref={playerRef} // Reference to the player container
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        opacity: isLoading ? 0 : 1,
      }}
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {!hasError ? (
          <>
            <video
              ref={videoRef}
              src={src}
              width="100%"
              height="auto"
              onLoadedData={() => setIsLoading(false)}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => setIsLoading(false)}
              onEnded={() => setIsPlaying(false)}
              onError={handleError}
              style={{
                background: "black",
                position: "relative",
              }}
            />
          </>
        ) : (
          <Typography color="red">Error loading video</Typography>
        )}

        {isLoading && !hasError && (
          <CircularProgress
            size={50}
            sx={{ position: "absolute", color: "white" }}
          />
        )}
      </Box>

      {!hasError && (
        <Box
          width={isFullScreen ? "98%" : "100%"}
          display="flex"
          alignItems="center"
          mt={1}
        >
          <IconButton onClick={togglePlayPause}>
            {isPlaying ? (
              <Pause
                sx={{
                  color: isFullScreen ? "white " : darkMode ? "white" : "black",
                }}
              />
            ) : (
              <PlayArrow
                sx={{
                  color: isFullScreen ? "white " : darkMode ? "white" : "black",
                }}
              />
            )}
          </IconButton>
          <Slider
            value={progress}
            onChange={handleSeek}
            sx={{ flexGrow: 1, mx: 1 }}
          />
          <IconButton onClick={toggleFullScreen}>
            {isFullScreen ? (
              <FullscreenExit sx={{ color: "white" }} />
            ) : (
              <Fullscreen sx={{ color: darkMode ? "white" : "black" }} />
            )}
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

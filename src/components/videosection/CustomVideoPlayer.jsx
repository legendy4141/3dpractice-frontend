import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
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

export const CustomVideoPlayer = ({ src, onError, activeTool }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const playerRef = useRef(null); // Reference for the player container
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const { isLoading, setIsLoading } = useContext(VideoPlayerContext);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const resizeCanvas = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;

      const context = canvas.getContext("2d");
      context.lineWidth = 3;
      context.strokeStyle = "yellow";
      context.lineJoin = "round";
      context.lineCap = "round";
      setCtx(context);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", resizeCanvas);
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", resizeCanvas);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

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

  const handleMouseDown = (e) => {
    if (activeTool !== "draw" || !ctx) return;

    // Calculate the scale factor to adjust mouse position based on canvas size vs video size
    const scaleX = canvasRef.current.width / videoRef.current.clientWidth;
    const scaleY = canvasRef.current.height / videoRef.current.clientHeight;

    setIsDrawing(true);
    ctx.beginPath();

    // Adjust mouse coordinates for scaling
    const offsetX = e.nativeEvent.offsetX / scaleX;
    const offsetY = e.nativeEvent.offsetY / scaleY;

    ctx.moveTo(offsetX, offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !ctx) return;

    // Calculate the scale factor to adjust mouse position based on canvas size vs video size
    const scaleX = canvasRef.current.width / videoRef.current.clientWidth;
    const scaleY = canvasRef.current.height / videoRef.current.clientHeight;

    // Adjust mouse coordinates for scaling
    const offsetX = e.nativeEvent.offsetX / scaleX;
    const offsetY = e.nativeEvent.offsetY / scaleY;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e) => {
    if (activeTool !== "draw" || !ctx) return;

    // Calculate the scale factor to adjust touch position based on canvas size vs video size
    const scaleX = canvasRef.current.width / videoRef.current.clientWidth;
    const scaleY = canvasRef.current.height / videoRef.current.clientHeight;

    setIsDrawing(true);
    ctx.beginPath();

    // Adjust touch coordinates for scaling
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();

    const offsetX = (touch.clientX - rect.left) / scaleX;
    const offsetY = (touch.clientY - rect.top) / scaleY;

    ctx.moveTo(offsetX, offsetY);
  };

  const handleTouchMove = (e) => {
    if (!isDrawing || !ctx) return;

    // Calculate the scale factor to adjust touch position based on canvas size vs video size
    const scaleX = canvasRef.current.width / videoRef.current.clientWidth;
    const scaleY = canvasRef.current.height / videoRef.current.clientHeight;

    // Adjust touch coordinates for scaling
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = (touch.clientX - rect.left) / scaleX;
    const offsetY = (touch.clientY - rect.top) / scaleY;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const clearCanvas = useCallback(() => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [ctx]);

  useEffect(() => {
    if (activeTool === "erase") {
      clearCanvas();
    }
  }, [activeTool, clearCanvas]);

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

  // Dynamically adjust video and canvas size based on full-screen state
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isFullScreen) {
        video.style.width = "100vw";
        video.style.height = "95vh";
      } else {
        video.style.width = "100%";
        video.style.height = "auto";
      }
    }

    // Adjust canvas size when video is in full-screen mode
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      if (isFullScreen) {
        canvas.style.width = "100vw";
        canvas.style.height = "95vh";
      } else {
        canvas.style.width = "100%";
        canvas.style.height = "auto";
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
              onLoadedMetadata={resizeCanvas}
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
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: activeTool === "draw" ? "auto" : "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
          width={isFullScreen ? "95%" : "100%"}
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

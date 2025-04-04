import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ShareVideoPlayer } from "../../components/share/ShareVideoPlayer";

const ShareVideoPlayerPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const [videoLink, setVideoLink] = useState(null); // State to store the selected video
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isVideoError, setIsVideoError] = useState(false);
  const [error, setError] = useState(""); // State to track errors if any

  const splitPath = location.pathname.split("/")[2].split("-");
  const folderID = splitPath[0];
  const randomkey = splitPath[1];

  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        // Replace the URL with your actual API endpoint for fetching videos
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/shared-video`,
          {
            id: folderID,
            randomKey: randomkey,
          }
        );
        setVideoLink(response.data); // response.data is videolink string
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError("Failed to fetch videos. Please try again later."); // Handle errors
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchVideoLink();
  }, [randomkey, folderID]);

  useEffect(() => {
    setIsVideoError(false);
  }, []);

  const fullVideoLink = `https://d2nut6gc5qzbiv.cloudfront.net/34481519/${videoLink}`;

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
    <Box display="flex" flexDirection="row" justifyContent="center">
      {loading && <Typography>Loading video...</Typography>}{" "}
      {/* Show loading message */}
      {error && <Typography color="error">{error}</Typography>}{" "}
      {videoLink && (
        <ShareVideoPlayer
          src={fullVideoLink}
          onError={() => setIsVideoError(true)}
        />
      )}
    </Box>
  );
};

export default ShareVideoPlayerPage;

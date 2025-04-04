import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Backdrop,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { isEmail } from "class-validator";
import { getColors } from "../../themes/theme";

import SendIcon from "@mui/icons-material/Send";

import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";

const SharePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderInfo: "",
    },
  });

  const { darkMode } = useContext(ThemeContext);
  const [videos, setVideos] = useState([]); // State to store videos
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(""); // State to track errors if any
  const { token, user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        if (!user || !token) {
          return;
        }
        // Replace the URL with your actual API endpoint for fetching videos
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/video`,
          {
            userId: user.userid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVideos(response.data); // Set the fetched videos to state
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError("Failed to fetch videos. Please try again later."); // Handle errors
        setLoading(false); // Set loading to false even if there's an error
      }
    })();
  }, [token, user]); // Empty dependency array to run only once when the component mounts

  const onSubmit = async (data) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.senderInfo) && !isEmail(data.senderInfo)) {
      return;
    }
    if (isEmail(data.senderInfo)) {
      setLoading(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/send-email/video`,
          {
            who: data.senderInfo,
            what: `http://localhost:3000/shared_videos/${selectedVideo.encryptlink}`,
            subject: `${user?.practiceName} recommends this educational video.`,
            type: "video",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.log("Error sending email:", err);
        enqueueSnackbar("Error sending email!", { variant: "error" });
      } finally {
        enqueueSnackbar("Successfully Sent!", { variant: "success" });
        setLoading(false);
      }
    } else if (phoneRegex.test(data.senderInfo)) {
      setLoading(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/send-text/video`,
          {
            who: data.senderInfo,
            what: `http://localhost:3000/shared_videos/${selectedVideo.encryptlink}`,
            subject: `${user?.practiceName} recommends this educational video.`,
            type: "video",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.log("Error sending text:", err);
        enqueueSnackbar("Error sending text!", { variant: "error" });
      } finally {
        enqueueSnackbar("Successfully Sent!", { variant: "success" });
        setLoading(false);
      }
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
      },
      () => {
        enqueueSnackbar("Failed to copy the link.", { variant: "error" });
      }
    );
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video); // Set selected video
    const url = `http://localhost:3000/shared_videos/${video.encryptlink}`;
    copyToClipboard(url);
  };

  return (
    <>
      <Backdrop sx={{ zIndex: 1400 }} open={loading}>
        <CircularProgress size={80} />
      </Backdrop>
      <Box padding={8}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "28px",
            fontWeight: 500,
            color: darkMode
              ? getColors.drawerTextDark
              : getColors.thumbnailTextLight,
            mb: 2,
          }}
        >
          Send Patient Education Video
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display={"flex"}
            width="max-content"
            sx={{
              padding: "20px",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: darkMode
                ? getColors.appBarBorderDark
                : getColors.appBarBorderLight,
              gap: 4,
              mb: 8,
            }}
          >
            <FormControl>
              <TextField
                sx={{ width: "500px" }}
                variant="filled"
                placeholder="Enter an email or phone number"
                {...register("senderInfo", {
                  required: "This field is required",
                  validate: (value) => {
                    const phoneRegex = /^[0-9]{10}$/; // Validates 10 digits only
                    if (
                      !phoneRegex.test(value) && // Check for 10-digit phone number
                      !isEmail(value) // Check for valid email
                    ) {
                      return "Please enter a valid 10-digit US phone number or a valid email";
                    }
                    return true;
                  },
                })}
                error={!!errors.senderInfo}
                helperText={errors.senderInfo?.message}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon style={{ fontSize: 24, marginLeft: 8 }} />}
              sx={{
                height: 64,
                fontSize: "18px",
                fontWeight: 500,
                fontFamily: "Poppins",
                px: 6,
                py: "10px",
                borderRadius: "5px",
              }}
            >
              Send
            </Button>
          </Box>
        </form>
        {error && <Typography color="error">{error}</Typography>}{" "}
        {/* Show error message */}
        {/* Display selected video title */}
        {/* Available Videos */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "22px",
            fontWeight: 500,
            color: darkMode
              ? getColors.drawerTextDark
              : getColors.thumbnailTextLight,
            mb: 2,
          }}
        >
          Available Videos
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          {videos.map((video) => (
            <Box
              key={video.id}
              sx={{
                cursor: "pointer",
                width: "400px",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 1,
                borderColor:
                  selectedVideo?.id === video.id
                    ? darkMode
                      ? getColors.thumbnailHoverBgLight
                      : getColors.thumbnailHoverBgDark // Highlight color when selected
                    : darkMode
                    ? getColors.appBarBorderDark
                    : getColors.appBarBorderLight,
                pl: 2,
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => handleVideoSelect(video)} // Handle click on the video box
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  fontWeight: selectedVideo?.id === video.id ? 600 : 500,
                  cursor: "pointer",
                  color: darkMode ? "#BEBEBE" : "#636363",
                }}
              >
                {video.displayname}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedVideo?.id === video.id}
                    onChange={() => handleVideoSelect(video)} // Handle selection
                    sx={{
                      "&.Mui-checked": {
                        color: "inherit",
                      },
                    }}
                  />
                }
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SharePage;

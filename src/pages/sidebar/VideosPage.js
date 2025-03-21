import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";

import DecompressThumbnail from "../../assets/videos/decompress_thumbnail.png";
import PatientThumbnail from "../../assets/videos/patient_thumbnail.png";

const VideosPage = () => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(null); // Track which video is being hovered

  const handlePatientClicked = () => {
    window.open("/assets/videos/videos/patient.mp4", "_blank");
  };

  const handleDecompressClicked = () => {
    window.open("/assets/videos/videos/decompress.mp4", "_blank");
  };

  return (
    <Box
      sx={{
        padding: 10,
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography
          sx={{
            fontSize: "24px",
            fontFamily: "Poppins",
            fontWeight: 500,
            color: theme.palette.text.secondary,
            textAlign: "center",
          }}
        >
          Please choose a video to begin.
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            fontFamily: "Poppins",
            fontWeight: 500,
            color: theme.palette.text.secondary,
            textAlign: "center",
          }}
        >
          Select 'New Patient' for an introduction or 'Decompression' for
          specialized guidance.
        </Typography>
      </Box>
      <Box display="flex" sx={{ gap: "20px" }}>
        {/* New Patient Video */}
        <Box
          width="50%"
          sx={{ alignItems: "center", textAlign: "center" }}
          onMouseEnter={() => setHovered("patient")}
          onMouseLeave={() => setHovered(null)}
          onClick={handlePatientClicked}
        >
          <Box
            height="300px"
            sx={{
              backgroundImage:
                hovered === "patient" ? "none" : `url(${PatientThumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid #007FFF",
              borderRadius: "10px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              mb: 2,
            }}
          >
            {hovered === "patient" && (
              <video
                src="/assets/videos/videos/patient.mp4"
                autoPlay
                muted
                loop
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>
          <Typography
            sx={{
              fontSize: "32px",
              fontFamily: "Poppins",
              fontWeight: 500,
              color: theme.palette.text.secondary,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            New Patient
          </Typography>
        </Box>

        {/* Spinal Decompression Video */}
        <Box
          width="50%"
          sx={{ alignItems: "center", textAlign: "center" }}
          onMouseEnter={() => setHovered("decompress")}
          onMouseLeave={() => setHovered(null)}
          onClick={handleDecompressClicked}
        >
          <Box
            height="300px"
            sx={{
              backgroundImage:
                hovered === "decompress"
                  ? "none"
                  : `url(${DecompressThumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "1px solid #007FFF",
              borderRadius: "10px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              mb: 2,
            }}
          >
            {hovered === "decompress" && (
              <video
                src="/assets/videos/videos/decompress.mp4"
                autoPlay
                muted
                loop
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>
          <Typography
            sx={{
              fontSize: "32px",
              fontFamily: "Poppins",
              fontWeight: 500,
              color: theme.palette.text.secondary,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Decompress
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VideosPage;

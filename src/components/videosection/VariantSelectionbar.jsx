import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";

import {
  spineVideoData,
  shoulderVideoData,
  kneeVideoData,
  ankleNfootVideoData,
  elbowNwristVideoData,
  hipVideoData,
  jawVideoData,
  phaseOfCareVideoData,
  treatmentsVideoData,
  nervousSystemVideoData,
} from "../../utils/videoData";

import { ThemeContext } from "../../context/ThemeContext";

import { getColors } from "../../themes/theme";

export const VariantSelectionbar = () => {
  const navigate = useNavigate();
  const { section, videoId, selectedSubItem } = useParams();
  const [activeSubItem, setActiveSubItem] = useState(selectedSubItem || "");
  const { darkMode } = useContext(ThemeContext);

  const videoDataMap = {
    spine: spineVideoData,
    shoulder: shoulderVideoData,
    knee: kneeVideoData,
    ankleNfoot: ankleNfootVideoData,
    elbowNwrist: elbowNwristVideoData,
    hip: hipVideoData,
    jaw: jawVideoData,
    nervous_system: nervousSystemVideoData,
    treatments: treatmentsVideoData,
    phase_of_care: phaseOfCareVideoData,
  };

  useEffect(() => {
    setActiveSubItem(selectedSubItem || "");
  }, [selectedSubItem]);

  const videoDetails = videoDataMap[section]?.find(
    (video) => video.routing === `/video/${videoId}`
  );

  const handleSubItemClick = (subItem) => {
    setActiveSubItem(subItem);
    navigate(`/${section}/${videoId}/${subItem}`);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "8px",
          columnGap: "14px",
        }}
      >
        {videoDetails?.subItems?.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleSubItemClick(item)}
            sx={{
              width: "90px",
              padding: "6px",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "22px",
              fontWeight: 500,
              textAlign: "center",
              borderColor: darkMode
                ? getColors.primaryTextDark
                : getColors.drawerTextLight,
              border: item === activeSubItem && "none",
              bgcolor:
                item === activeSubItem
                  ? darkMode
                    ? "#FFFFFF"
                    : "#555555"
                  : "transparent",
              color:
                item === activeSubItem
                  ? darkMode
                    ? "#1D1E21"
                    : "#FFFFFF"
                  : darkMode
                  ? "#BBBBBB"
                  : "#555555",
            }}
          >
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

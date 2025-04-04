import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Button } from "@mui/material";

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

import { getColors } from "../../themes/theme";

import { ModeChangebar } from "./ModeChangebar";
import { ScrollableToolbar } from "./ScrollableToolbar";

export const VideoTopbar = () => {
  const navigate = useNavigate();
  const { section, videoId, selectedSubItem } = useParams();
  const [activeSubItem, setActiveSubItem] = useState(selectedSubItem || "");

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

  const videoDetails = videoDataMap[section]?.find(
    (video) => video.routing === `/video/${videoId}`
  );

  useEffect(() => {
    if (!selectedSubItem && videoDetails?.subItems?.length > 0) {
      const firstSubItem = videoDetails.subItems[0];
      setActiveSubItem(firstSubItem);
      navigate(`/${section}/${videoId}/${firstSubItem}`, { replace: true });
    } else {
      setActiveSubItem(selectedSubItem || "");
    }
  }, [selectedSubItem, videoDetails, section, videoId, navigate]);

  const handleSubItemClick = (subItem) => {
    setActiveSubItem(subItem);
    if (
      section === "knee" &&
      videoId === "knee" &&
      subItem === "Interactive Knee Degeneration"
    )
      window.open("/webgl/interactive-knee-degeneration", "_blank");
    else if (
      section === "shoulder" &&
      videoId === "shoulder" &&
      subItem === "Interactive Rotator Cuff Injury"
    )
      window.open("/webgl/interactive-rotator-cuff-injury", "_blank");
    else if (
      section === "spine" &&
      videoId === "whiplash" &&
      subItem === "Interactive Whiplash"
    )
      window.open("/webgl/interactive-whiplash", "_blank");
    else navigate(`/${section}/${videoId}/${subItem}`);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: 0,
          padding: 4,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
          flexDirection: "row",
        }}
      >
        {section !== "nervous_system" &&
          section !== "jaw" &&
          section !== "hip" && (
            <ScrollableToolbar>
              {videoDetails &&
                videoDetails.subItems.length > 1 &&
                videoDetails.subItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleSubItemClick(item)}
                    sx={{
                      fontSize: "20px",
                      px: 3,
                      py: "14px",
                      height: "60px",
                      mr: "20px",
                      borderRadius: "100px",
                      color: activeSubItem === item && getColors.buttonText,
                      border: activeSubItem === item && "2px solid transparent",
                      background:
                        activeSubItem === item
                          ? getColors.buttonBg
                          : "transparent",
                      width: "max-content",
                      minWidth: "max-content",
                    }}
                  >
                    {item}
                  </Button>
                ))}
            </ScrollableToolbar>
          )}
        <ModeChangebar isDisable={true} />
      </AppBar>
    </>
  );
};

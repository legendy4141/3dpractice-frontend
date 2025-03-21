import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
import { careplanData } from "../../utils/careplanData";

export const CareSubAreaItem = ({ id, title }) => {
  const navigate = useNavigate();
  const { mainId, careId } = useParams();
  const { darkMode } = useContext(ThemeContext);

  const parentTitle = careplanData.find((data) => data.id === careId).title;
  const handleClick = (subId) => {
    navigate(`/care-plan/${mainId}/${careId}/${subId}`);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "480px",
        padding: "20px",
        borderRadius: "5px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: darkMode
          ? getColors.thumbnailBorderDark
          : getColors.thumbnailBorderLight,
        background: darkMode
          ? getColors.thumbnnailBgDark
          : getColors.thumbnnailBgLight,
        cursor: "pointer",
        "&:hover": {
          borderColor: darkMode
            ? getColors.thumbnailTextDark
            : getColors.thumbnailTextLight,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          color: darkMode
            ? getColors.drawerTextDark
            : getColors.thumbnailTextLight,
        }}
      >
        {`${title} (${parentTitle})`}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        width="max-content"
        sx={{
          borderRadius: "5px",
          px: 2,
          py: 1,
          color: getColors.primaryMain,
          bgcolor: "#DEEFFF",
          alignItems: "center",
          "&:hover": {
            color: "blue",
          },
        }}
        onClick={() => {
          handleClick(id);
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Continue
        </Typography>
      </Box>
    </Box>
  );
};

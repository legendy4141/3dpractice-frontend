import React, { useContext } from "react";
import { Box } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

import { MainContent } from "../../components/exercises/MainContent";
import { MainList } from "../../components/exercises/MainList";
import { SubList } from "../../components/exercises/SubList";
import { getColors } from "../../themes/theme";

const ExercisePage = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          width: "260px",
          px: "20px",
          pt: 2,
          borderRight: `1px solid ${
            darkMode ? getColors.appBarBorderDark : getColors.appBarBorderLight
          }`,
        }}
      >
        <MainList />
      </Box>
      <SubList />
      <MainContent />
    </Box>
  );
};

export default ExercisePage;

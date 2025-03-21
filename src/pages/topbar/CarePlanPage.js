import React, { useContext } from "react";
import { Box } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

import { MainList } from "../../components/careplan/MainList";
import { MainContent } from "../../components/careplan/MainContent";
import { getColors } from "../../themes/theme";

const CarePlanPage = () => {
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
          width: "320px",
          px: "20px",
          pt: 2,
          borderRight: `1px solid ${
            darkMode ? getColors.appBarBorderDark : getColors.appBarBorderLight
          }`,
        }}
      >
        <MainList />
      </Box>
      <MainContent />
    </Box>
  );
};

export default CarePlanPage;

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

import backgroundImage from "../assets/dashboard/background.png";

const Dashboard = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          color: theme.palette.text.secondary,
        }}
      >
        Welcome to 3DPracticeCloud, Destiny!
      </Typography>
      <img src={backgroundImage} alt="Doctor Illustration" width={400} />
      <Typography
        sx={{ fontSize: "24px", color: theme.palette.text.secondary }}
      >
        Select an option from the left menu or a module from the top bar to get
        started.
      </Typography>
    </Box>
  );
};

export default Dashboard;

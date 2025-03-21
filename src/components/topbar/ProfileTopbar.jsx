import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

import { ThemeContext } from "../../context/ThemeContext";

import { ModeChangebar } from "./ModeChangebar";

import { ReactComponent as User } from "../../assets/topbar/user.svg";

import { getColors } from "../../themes/theme";

export const ProfileTopbar = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        padding: 4,
      }}
    >
      <Toolbar display="flex" sx={{ alignItems: "center" }}>
        <Box
          display="flex"
          sx={{
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 500,
              fontFamily: "Poppins",
              color: darkMode
                ? getColors.thumbnailTextDark
                : getColors.thumbnailTextLight,
            }}
          >
            My Profile
          </Typography>
          <Button
            variant="contained"
            startIcon={<User />}
            sx={{
              fontSize: "22px",
              px: 5,
              py: "14px",
              borderRadius: "100px",
              mr: "60px",
            }}
          >
            Users
          </Button>
        </Box>
        <ModeChangebar visibleViewMode={false} />
      </Toolbar>
    </AppBar>
  );
};

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

import { ReactComponent as Exercise } from "../../assets/topbar/exercise.svg";
import { ReactComponent as Care } from "../../assets/topbar/care.svg";
import { ReactComponent as User } from "../../assets/topbar/user.svg";

import { ModeChangebar } from "./ModeChangebar";
import { ScrollableToolbar } from "./ScrollableToolbar";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";

export const Topbar = () => {
  const { user } = useAuthContext();
  const isUser = user?.securityType === 3;
  const location = useLocation();
  const navigate = useNavigate();
  const currentSection = location.pathname.split("/")[1];

  const handleExerciseClick = () => {
    navigate("/exercise");
  };

  const handleCarePlanClick = () => {
    navigate("/care-plan");
  };

  const handleUsersClick = () => {
    navigate("/users");
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        padding: 4,
      }}
    >
      <Toolbar>
        <Box flexGrow={1} display="flex">
          <ScrollableToolbar>
            <Button
              onClick={handleExerciseClick}
              variant="contained"
              startIcon={<Exercise />}
              sx={{
                fontSize: "22px",
                px: 5,
                py: "14px",
                mr: 3,
                borderRadius: "100px",
              }}
            >
              Exercises
            </Button>
            <Button
              onClick={handleCarePlanClick}
              variant="contained"
              startIcon={<Care />}
              sx={{
                fontSize: "22px",
                px: 5,
                py: "14px",
                mr: 3,
                borderRadius: "100px",
              }}
            >
              Care Plan
            </Button>
            {!isUser && (
              <Button
                onClick={handleUsersClick}
                variant="contained"
                startIcon={<User />}
                sx={{
                  fontSize: "22px",
                  px: 5,
                  py: "14px",
                  borderRadius: "100px",
                }}
              >
                Users
              </Button>
            )}
          </ScrollableToolbar>
        </Box>
        <ModeChangebar
          visibleViewMode={
            currentSection === "videos" || currentSection === "" ? false : true
          }
          isDisable={
            currentSection === "exercise" ||
            currentSection === "care-plan" ||
            currentSection === "users" ||
            currentSection === "share"
              ? true
              : false
          }
        />
      </Toolbar>
    </AppBar>
  );
};

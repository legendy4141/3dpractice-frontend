import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  IconButton,
} from "@mui/material";

import {
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import { ThemeContext } from "../../context/ThemeContext";

import { ReactComponent as DarkIcon } from "../../assets/viewmode/dark.svg";
import { ReactComponent as LightIcon } from "../../assets/viewmode/light.svg";

import { ViewModeSelector } from "./ViewModeSelector";

export const ModeChangebar = ({
  visibleViewMode = true,
  isDisable = false,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
  };

  const handleProfileSettings = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <Box display="flex" alignItems="center">
      {visibleViewMode && (
        <Box sx={{ mr: 5 }}>
          <ViewModeSelector isDisable={isDisable} />
        </Box>
      )}
      <IconButton sx={{ mr: 3 }} onClick={toggleDarkMode}>
        {darkMode ? <LightIcon /> : <DarkIcon />}
      </IconButton>
      <Avatar
        alt="User"
        src={undefined}
        sx={{ cursor: "pointer", width: 60, height: 60 }}
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleProfileSettings}>
          <ListItemIcon>
            <SettingsIcon width={24} height={24} />
          </ListItemIcon>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon width={24} height={24} />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

ModeChangebar.propTypes = {
  visibleViewMode: PropTypes.bool,
  isDisable: PropTypes.bool,
};

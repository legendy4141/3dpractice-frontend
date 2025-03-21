import React, { useState, useContext } from "react";
import { ViewModeContext } from "../../context/ViewModeContext";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";

export const ViewModeSelector = ({ isDisable = false }) => {
  const context = useContext(ViewModeContext);
  const { viewMode, updateViewMode } = context;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  if (!context) {
    console.error(
      "ViewModeContext is undefined. Ensure ViewModeProvider is wrapping this component."
    );
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (mode) => {
    updateViewMode(mode);
    handleClose();
  };

  return (
    <Box>
      <Button
        startIcon={<LaptopMacIcon />}
        endIcon={open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        onClick={handleClick}
        variant="contained"
        disabled={isDisable}
      >
        View
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleSelection("thumbnail")}>
          {viewMode === "thumbnail" ? (
            <CheckIcon style={{ marginRight: 8 }} />
          ) : (
            <Box style={{ width: 32 }} />
          )}
          <ViewModuleIcon style={{ marginRight: 16 }} />
          Thumbnail
        </MenuItem>
        <MenuItem onClick={() => handleSelection("listbox")}>
          {viewMode === "listbox" ? (
            <CheckIcon style={{ marginRight: 8 }} />
          ) : (
            <Box style={{ width: 32 }} />
          )}
          <ViewListIcon style={{ marginRight: 16 }} />
          List
        </MenuItem>
      </Menu>
    </Box>
  );
};

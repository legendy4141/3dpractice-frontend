import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";

export const PhaseDialog = ({
  open,
  onClose,
  phaseData,
  onCopy,
  onEdit,
  actionType,
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [active, setActive] = useState("");

  const frequencyData = {
    1: "1 time per month",
    2: "2 times per month",
    3: "3 times per month",
    4: "1 time per week",
    5: "2 times per week",
    6: "3 times per week",
    7: "4 times per week",
    8: "5 times per week",
  };

  const durationData = {
    1: "1 week",
    2: "2 weeks",
    3: "3 weeks",
    4: "4 weeks",
    5: "5 weeks",
    6: "6 weeks",
    7: "7 weeks",
    8: "8 weeks",
    9: "1 month",
    10: "2 months",
    11: "3 months",
    12: "4 months",
    13: "5 months",
    14: "6 months",
  };

  const activeData = {
    1: "Passive Care",
    2: "Active Care",
    3: "Both Passive and Active Care",
  };

  useEffect(() => {
    if (phaseData) {
      setName(phaseData.name || "");
      setDescription(phaseData.description || "");
      setFrequency(phaseData.frequency || "");
      setDuration(phaseData.duration || "");
      setActive(phaseData.active || "");
    }
  }, [phaseData]);

  const onSave = () => {
    const phase = {
      ...(actionType === "edit" && { id: phaseData.id }), // Add 'id' only for editing
      name,
      description,
      frequency: frequency,
      duration: duration,
      active: active,
      default: false,
    };

    if (actionType === "edit") onEdit(phase);
    else if (actionType === "add") onCopy(phase);

    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <>
          {actionType === "add" && "Create New Phase"}
          {actionType === "edit" && "Edit Phase"}
        </>
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Phase Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Phase Name"
            // {...register("name", {
            //   required: "Phase Name is required",
            // })}
            // error={!!errors.name}
            // helperText={errors.name?.message}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Phase Description"
            value={description}
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Phase Description"
            // {...register("description", {
            //   required: "Phase Description is required",
            // })}
            // error={!!errors.description}
            // helperText={errors.description?.message}
          />
        </FormControl>

        {/* Frequency Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Select the frequency of the treatment</InputLabel>
          <TextField
            select
            value={frequency | ""}
            onChange={(e) => setFrequency(e.target.value)}
            // {...register("frequency", {
            //   required: "Phase frequency is required",
            // })}
            // error={!!errors.frequency}
            // helperText={errors.frequency?.message}
          >
            <MenuItem value="" disabled>
              Select frequency
            </MenuItem>
            {Object.entries(frequencyData).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Duration Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Select the duration of the treatment</InputLabel>
          <TextField
            select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            // {...register("duration", {
            //   required: "Phase duration is required",
            // })}
            // error={!!errors.duration}
            // helperText={errors.duration?.message}
          >
            {Object.entries(durationData).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Active Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Active or Passive Care</InputLabel>
          <TextField
            select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            // {...register("active", {
            //   required: "Phase care is required",
            // })}
            // error={!!errors.active}
            // helperText={errors.active?.message}
          >
            {Object.entries(activeData).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            borderRadius: "5px",
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 500,
            color: darkMode ? getColors.appBarBgLight : getColors.appBarBgDark,
            px: 4,
            py: "11px",
            textAlign: "center",
            "&: hover": {
              background: "none",
              color: getColors.primaryMain,
            },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "5px",
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 500,
            px: 4,
            py: "11px",
            textAlign: "center",
          }}
          onClick={onSave}
        >
          {actionType === "add" ? "Add" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

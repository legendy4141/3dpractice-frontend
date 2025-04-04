import React, { useEffect, useContext } from "react";
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
import { useForm, FormProvider } from "react-hook-form";
import { RHFSelect } from "../RFHSelect/RFHSelect";

export const PhaseDialog = ({
  open,
  onClose,
  phaseData,
  onCopy,
  onEdit,
  onCurrentEdit,
  actionType,
}) => {
  const methods = useForm({
    name: phaseData?.name,
    description: phaseData?.description,
    repeattime: phaseData?.repeattime,
    duration: phaseData?.duration,
    active: phaseData?.active,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (phaseData) {
      setValue("name", phaseData?.name);
      setValue("description", phaseData?.description);
      setValue("repeattime", phaseData?.repeattime);
      setValue("duration", phaseData?.duration);
      setValue("active", phaseData?.active);
    }
  }, [phaseData, setValue]);

  const onSave = (data) => {
    const phase = {
      ...((actionType === "edit" || actionType === "current-edit") && {
        id: phaseData.id,
      }), // Add 'id' only for editing
      name: data.name,
      description: data.description,
      repeattime: data.repeattime,
      duration: data.duration,
      active: data.active,
    };

    if (actionType === "edit") onEdit(phase);
    else if (actionType === "add") onCopy(phase);
    else if (actionType === "current-edit") onCurrentEdit(phase);

    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: "30px", pb: 0 }}>
        <>
          {actionType === "add" && "Create New Phase"}
          {actionType === "edit" && "Edit Phase"}
        </>
      </DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSave)}>
          <DialogContent sx={{ pt: 0 }}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Phase Name"
                placeholder="Enter Phase Name"
                {...register("name", {
                  required: "Phase Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Phase Description"
                multiline
                rows={4}
                placeholder="Enter Phase Description"
                {...register("description", {
                  required: "Phase Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </FormControl>

            {/* Frequency Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select the frequency of the treatment</InputLabel>
              <RHFSelect
                name="repeattime"
                error={!!errors.repeattime}
                helperText={errors.repeattime?.message}
              >
                <MenuItem value="1 time per month">1 time per month</MenuItem>
                <MenuItem value="2 times per month">2 times per month</MenuItem>
                <MenuItem value="3 times per month">3 times per month</MenuItem>
                <MenuItem value="1 time per week">1 time per week</MenuItem>
                <MenuItem value="2 times per week">2 times per week</MenuItem>
                <MenuItem value="3 times per week">3 times per week</MenuItem>
                <MenuItem value="4 times per week">4 times per week</MenuItem>
                <MenuItem value="5 times per week">5 times per week</MenuItem>
              </RHFSelect>
            </FormControl>

            {/* Duration Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select the duration of the treatment</InputLabel>
              <RHFSelect
                name="duration"
                error={!!errors.duration}
                helperText={errors.duration?.message}
              >
                <MenuItem value="1 week">1 week</MenuItem>
                <MenuItem value="2 weeks">2 weeks</MenuItem>
                <MenuItem value="3 weeks">3 weeks</MenuItem>
                <MenuItem value="4 weeks">4 weeks</MenuItem>
                <MenuItem value="5 weeks">5 weeks</MenuItem>
                <MenuItem value="6 weeks">6 weeks</MenuItem>
                <MenuItem value="7 weeks">7 weeks</MenuItem>
                <MenuItem value="8 weeks">8 weeks</MenuItem>
                <MenuItem value="1 month">1 month</MenuItem>
                <MenuItem value="2 months">2 months</MenuItem>
                <MenuItem value="3 months">3 months</MenuItem>
                <MenuItem value="4 months">4 months</MenuItem>
                <MenuItem value="5 months">5 months</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
              </RHFSelect>
            </FormControl>

            {/* Active Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Active or Passive Care</InputLabel>
              <RHFSelect
                name="active"
                error={!!errors.active}
                helperText={errors.active?.message}
              >
                <MenuItem value="Passive Care">Passive Care</MenuItem>
                <MenuItem value="Active Care">Active Care</MenuItem>
                <MenuItem value="Both Passive and Active Care">
                  Both Passive and Active Care
                </MenuItem>
              </RHFSelect>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                borderRadius: "5px",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 500,
                color: darkMode
                  ? getColors.appBarBgLight
                  : getColors.appBarBgDark,
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
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "5px",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 500,
                px: 5,
                py: "11px",
                textAlign: "center",
              }}
            >
              {actionType === "add" ? "Add" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

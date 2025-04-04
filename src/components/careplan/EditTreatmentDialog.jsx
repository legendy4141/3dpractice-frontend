import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { useForm } from "react-hook-form";

export const EditTreatmentDialog = ({
  open,
  onClose,
  onSave,
  treatmentData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      treatmentName: treatmentData?.name,
      treatmentDescription: treatmentData?.description,
    },
  });

  const { darkMode } = useContext(ThemeContext);

  const onSubmit = (data) => {
    const editedTreatmentData = {
      ...treatmentData,
      name: data.treatmentName,
      description: data.treatmentDescription,
    };
    onSave(editedTreatmentData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <DialogTitle sx={{ fontSize: "30px", pb: 0 }}>Edit Treatment</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 0 }}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Treatment Name"
              placeholder="Enter Treatment Name"
              {...register("treatmentName", {
                required: "Treatment Name is required",
              })}
              error={!!errors.treatmentName}
              helperText={errors.treatmentName?.message}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Treatment Description"
              multiline
              rows={4}
              placeholder="Enter Treatment Description"
              {...register("treatmentDescription", {
                required: "Treatment Description is required",
              })}
              error={!!errors.treatmentDescription}
              helperText={errors.treatmentDescription?.message}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
          <Button
            sx={{
              borderRadius: "5px",
              fontFamily: "Poppins",
              fontSize: "18px",
              fontWeight: 500,
              color: darkMode
                ? getColors.appBarBgLight
                : getColors.appBarBgDark,
              px: 6,
              py: "11px",
              textAlign: "center",
              "&: hover": {
                background: "none",
                color: getColors.primaryMain,
              },
              mr: 2,
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
              px: 6,
              py: "11px",
              textAlign: "center",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

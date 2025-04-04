import React, { useEffect, useContext } from "react";
import {
  Box,
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

export const EditExerciseDialog = ({ open, onClose, onSave, exerciseData }) => {
  const methods = useForm({
    exerciseName: exerciseData?.name,
    exerciseHold: exerciseData?.hold,
    exerciseRepeat: exerciseData?.repeat,
    exerciseSet: exerciseData?.timesperday,
    exerciseRange: exerciseData?.range,
    exerciseResistance: exerciseData?.resistance,
    exerciseDirection: exerciseData?.direction,
    exerciseImg: exerciseData?.bmname,
    exerciseInstructions: exerciseData?.instructions,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (exerciseData) {
      setValue("exerciseName", exerciseData?.name);
      setValue("exerciseHold", exerciseData?.hold);
      setValue("exerciseRepeat", exerciseData?.repeat);
      setValue("exerciseSet", exerciseData?.timesperday);
      setValue("exerciseRange", exerciseData?.range);
      setValue("exerciseResistance", exerciseData?.resistance);
      setValue("exerciseDirection", exerciseData?.direction);
      setValue("exerciseImg", exerciseData?.bmname);
      setValue("exerciseInstructions", exerciseData?.instructions);
    }
  }, [exerciseData, setValue]);

  let img;
  if (exerciseData?.bmname)
    img = require(`../../assets/exercise/${exerciseData?.bmname}.png`);

  const onSubmit = (data) => {
    const editedExerciseData = {
      ...exerciseData,
      hold: data.exerciseHold,
      repeat: data.exerciseRepeat,
      timesperday: data.exerciseSet,
      range: data.exerciseRange,
      resistance: data.exerciseResistance,
      direction: data.exerciseDirection,
      instructions: data.exerciseInstructions,
    };
    onSave(editedExerciseData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <DialogTitle sx={{ fontSize: "30px", pb: 0 }}>Edit Exercise</DialogTitle>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pt: 0 }}>
            <FormControl fullWidth margin="normal">
              <TextField
                disabled
                label="Exercise Name"
                placeholder="Enter Exercise Name"
                {...register("exerciseName", {
                  required: "Exercise Name is required",
                })}
                error={!!errors.exerciseName}
                helperText={errors.exerciseName?.message}
              />
            </FormControl>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              columnGap={3}
            >
              <FormControl fullWidth margin="normal">
                <InputLabel>Hold Seconds</InputLabel>
                <RHFSelect
                  name="exerciseHold"
                  error={!!errors.exerciseHold}
                  helperText={errors.exerciseHold?.message}
                >
                  {Array.from({ length: 31 }, (_, i) => 30 - i).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Repetition</InputLabel>
                <RHFSelect
                  name="exerciseRepeat"
                  error={!!errors.exerciseRepeat}
                  helperText={errors.exerciseRepeat?.message}
                >
                  {Array.from({ length: 10 }, (_, i) => 10 - i).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Sets</InputLabel>
                <RHFSelect
                  name="exerciseSet"
                  error={!!errors.exerciseSet}
                  helperText={errors.exerciseSet?.message}
                >
                  {Array.from({ length: 4 }, (_, i) => 4 - i).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Range of Motion</InputLabel>
                <RHFSelect name="exerciseRange">
                  <MenuItem value="Ignore">Ignore</MenuItem>
                  <MenuItem value="1/4">1/4</MenuItem>
                  <MenuItem value="1/2">1/2</MenuItem>
                  <MenuItem value="3/4">3/4</MenuItem>
                  <MenuItem value="Full">Full</MenuItem>
                </RHFSelect>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Resistance</InputLabel>
                <RHFSelect name="exerciseResistance">
                  <MenuItem value="Ignore">Ignore</MenuItem>
                  <MenuItem value="Light">Light</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Maximum">Maximum</MenuItem>
                </RHFSelect>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Direction of motion</InputLabel>
                <RHFSelect name="exerciseDirection">
                  <MenuItem value="Ignore">Ignore</MenuItem>
                  <MenuItem value="Right">Right</MenuItem>
                  <MenuItem value="Left">Left</MenuItem>
                  <MenuItem value="Both">Both</MenuItem>
                </RHFSelect>
              </FormControl>
            </Box>
            <Box display="flex" sx={{ mt: 3 }}>
              <img
                src={img}
                alt="img"
                style={{ width: "300px", height: "200px" }}
              />
              <FormControl fullWidth margin="normal" sx={{ ml: 4 }}>
                <TextField
                  label="Instructions"
                  multiline
                  rows={4}
                  placeholder="Enter Instructions"
                  {...register("exerciseInstructions")}
                />
              </FormControl>
            </Box>
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
      </FormProvider>
    </Dialog>
  );
};

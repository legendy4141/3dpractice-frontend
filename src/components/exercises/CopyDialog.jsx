import React, { useEffect, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { useForm, FormProvider } from "react-hook-form";

export const CopyDialog = ({ open, setOpen, onAdd, protocolData }) => {
  const methods = useForm({
    protocolName: protocolData?.protocolname,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (protocolData) {
      setValue("protocolName", protocolData?.protocolname);
    }
  }, [protocolData, setValue]);

  const onSubmit = (data) => {
    const editedProtocolData = {
      ...protocolData,
      protocolname: data.protocolName,
    };
    onAdd(editedProtocolData);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ pb: 0, pt: 1 }}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Protocol Name"
                placeholder="Enter Protocol Name"
                {...register("protocolName", {
                  required: "Protocol name is required",
                })}
                error={!!errors.protocolName}
                helperText={errors.protocolName?.message}
              />
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
            <Button
              sx={{
                borderRadius: "5px",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 500,
                color: darkMode
                  ? getColors.appBarBgLight
                  : getColors.appBarBgDark,
                px: 6,
                py: "10px",
                textAlign: "center",
                "&: hover": {
                  background: "none",
                  color: getColors.primaryMain,
                },
                mr: 0,
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "5px",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 500,
                px: 6,
                py: "10px",
                textAlign: "center",
              }}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

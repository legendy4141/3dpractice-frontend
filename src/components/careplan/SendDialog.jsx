import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { isEmail, isMobilePhone, isPhoneNumber } from "class-validator";
import { getColors } from "../../themes/theme";

export const SendDialog = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderInfo: "",
    },
  });

  const handlePreviewClick = () => {
    alert("Preview");
  };

  const onSubmit = (data) => {
    console.log("Sender Info", data);
    setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={() => setOpen(false)}>
      <DialogContent
        sx={{
          px: "20px",
          py: "20px",
          mb: 0,
          background: getColors.listItemHoverBg,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "20px",
                color: getColors.buttonText,
                fontWeight: 400,
                textAlign: "center",
                background: getColors.listItemHoverBg,
                mb: 2,
              }}
            >
              Enter Patient's Email or Phone Number
            </Typography>
            <TextField
              fullWidth
              variant="filled"
              placeholder="Enter your email or phone number"
              sx={{
                "& .MuiFilledInput-input": {
                  fontFamily: "Inter",
                  fontSize: "18px",
                  fontWeight: 500,
                  padding: "14px 24px",
                  background: getColors.drawerBgLight,
                  color: getColors.secondaryTextLight,
                  borderRadius: "5px",
                },
              }}
              error={!!errors.senderInfo}
              helperText={errors.senderInfo?.message}
              {...register("senderInfo", {
                required: "This field is required",
                validate: (value) => {
                  if (
                    !isMobilePhone(value) &&
                    !isPhoneNumber(value) &&
                    !isEmail(value)
                  ) {
                    return "Please enter a valid email or phone number";
                  }
                  return true;
                },
              })}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Button
              sx={{
                width: "100%",
                borderRadius: "5px",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 500,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: getColors.primaryTextDark,
                color: getColors.primaryTextDark,
                py: "11px",
                textAlign: "center",
                cursor: "pointer",
                "&: hover": {
                  background: getColors.buttonText,
                  color: getColors.primaryMain,
                },
              }}
              onClick={handlePreviewClick}
            >
              Preview
            </Button>
            <Button
              sx={{
                width: "100%",
                borderRadius: "5px",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 500,
                background: getColors.buttonText,
                color: getColors.thumbnailTextLight,
                py: "11px",
                textAlign: "center",
                cursor: "pointer",
                "&: hover": {
                  background: getColors.primaryTextDark,
                  color: getColors.primaryMain,
                },
              }}
              type="submit"
            >
              Send
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

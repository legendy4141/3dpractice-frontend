import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import axios, { AxiosError } from "axios";

import ResetImg from "../../assets/auth/resetpass.png";
import Logo from "../../assets/logo/biglogo.svg";
import LogoDark from "../../assets/logo/biglogo_dark.svg";
import GuestGuard from "../../guards/GuestGuard";
import { useSnackbar } from "notistack";

const ResetPassPage = () => {
  const navigate = useNavigate();
  const darkMode = localStorage.getItem("darkMode") === "true";
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset_pass`, {
        ...data,
      });
      enqueueSnackbar("Password changed successfully!", { variant: "success" });
      navigate("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 401) {
          const msg = err.response.data.message;
          enqueueSnackbar(msg, { variant: "error" });
        }
      }
    }
  };

  return (
    <GuestGuard>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            flex: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={ResetImg}
            alt="Reset Password Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: darkMode ? "#1D1E21" : "#FFFFFF",
            color: darkMode ? "#fff" : "#000",
            px: 1,
          }}
        >
          <Box sx={{ width: "90%", maxWidth: 640, textAlign: "center", p: 2 }}>
            <Box sx={{ mb: "50px" }}>
              <img src={darkMode ? LogoDark : Logo} alt="3D Practice Logo" />
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="User name"
                variant="filled"
                placeholder="Enter your Username"
                sx={{ textAlign: "left", height: "132px" }}
                {...register("username", {
                  required: "Username is required",
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="filled"
                placeholder="Enter your current password"
                sx={{ textAlign: "left", height: "132px" }}
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />

              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="filled"
                placeholder="Enter your new password"
                sx={{ textAlign: "left", height: "132px" }}
                {...register("newPassword", {
                  required: "New password is required",
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="filled"
                placeholder="Enter your new password again"
                sx={{ textAlign: "left", height: "132px" }}
                {...register("confirmPassword", {
                  required: "Confirm your new password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />

              <Box display="flex" sx={{ gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    py: "12px",
                    fontSize: "24px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                  type="submit"
                >
                  Submit
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 2,
                    py: "12px",
                    fontSize: "24px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </GuestGuard>
  );
};

export default ResetPassPage;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import ResetImg from "../../assets/auth/resetpass.png";
import Logo from "../../assets/logo/biglogo.svg";
import LogoDark from "../../assets/logo/biglogo_dark.svg";

const ResetPassPage = () => {
  const navigate = useNavigate();
  const darkMode = localStorage.getItem("darkMode") === "true";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Reset Data:", data);
    navigate("/login");
  };

  return (
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
              label="Email"
              type="email"
              variant="filled"
              placeholder="Enter your Email"
              sx={{ textAlign: "left", mb: "10px" }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Current Password"
              type="password"
              variant="filled"
              placeholder="Enter your current password"
              sx={{ textAlign: "left", mb: "10px" }}
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
              sx={{ textAlign: "left", mb: "10px" }}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
              sx={{ textAlign: "left", mb: "10px" }}
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
  );
};

export default ResetPassPage;

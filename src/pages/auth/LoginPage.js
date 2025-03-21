import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

import LoginImg from "../../assets/auth/login.png";
import Logo from "../../assets/logo/biglogo.svg";
import LogoDark from "../../assets/logo/biglogo_dark.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const darkMode = localStorage.getItem("darkMode") === "true";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    navigate("/");
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
          src={LoginImg}
          alt="Login Background"
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
        <Box
          sx={{
            width: "90%",
            maxWidth: 640,
            textAlign: "center",
            p: 2,
          }}
        >
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
              label="Password"
              type="password"
              variant="filled"
              placeholder="Enter your Password"
              sx={{ textAlign: "left", mb: "10px" }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: darkMode ? "#BEBEBE" : "#636363",
                  "&:hover": { color: "#2196F3" },
                }}
                onClick={() => navigate("/forgot_pass")}
              >
                Forgot Password?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: darkMode ? "#BEBEBE" : "#636363",
                  ml: 3,
                  "&:hover": { color: "#2196F3" },
                }}
                onClick={() => navigate("/reset_pass")}
              >
                Reset Password
              </Typography>
            </Box>

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
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

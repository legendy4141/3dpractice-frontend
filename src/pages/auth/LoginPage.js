import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";

import LoginImg from "../../assets/auth/login.png";
import Logo from "../../assets/logo/biglogo.svg";
import LogoDark from "../../assets/logo/biglogo_dark.svg";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import GuestGuard from "../../guards/GuestGuard";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const navigate = useNavigate();
  const darkMode = localStorage.getItem("darkMode") === "true";
  const { enqueueSnackbar } = useSnackbar();

  const { signIn } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          ...data,
        }
      );
      await signIn(res.data.accessToken);
      enqueueSnackbar("Login Successful!", { variant: "success" });
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
                label="User Name"
                variant="filled"
                placeholder="Enter your Username"
                sx={{ textAlign: "left", mb: "10px", height: "132px" }}
                {...register("username", {
                  required: "Username is required",
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="filled"
                placeholder="Enter your Password"
                sx={{ textAlign: "left", height: "132px" }}
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Box display="flex" justifyContent="flex-end" mb={2}>
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
    </GuestGuard>
  );
};

export default LoginPage;

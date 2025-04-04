import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import axios, { AxiosError } from "axios";

import ForgotPassImg from "../../assets/auth/forgotpass.png";
import Logo from "../../assets/logo/biglogo.svg";
import LogoDark from "../../assets/logo/biglogo_dark.svg";
import GuestGuard from "../../guards/GuestGuard";
import { useSnackbar } from "notistack";

const ForgotPassPage = () => {
  const navigate = useNavigate();
  const darkMode = localStorage.getItem("darkMode") === "true";
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot_pass`, {
        ...data,
      });
      enqueueSnackbar("Your password is reset to: 123456.", {
        variant: "success",
      });
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
            src={ForgotPassImg}
            alt="Forgot Password Background"
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
                label="Email"
                type="email"
                variant="filled"
                placeholder="Enter your Email"
                sx={{ textAlign: "left", mb: "10px", height: "132px" }}
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
                  Send Request
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

export default ForgotPassPage;

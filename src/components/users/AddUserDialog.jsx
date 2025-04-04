import React, { useContext, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { isEmail } from "class-validator";
import AddUserImg from "../../assets/users/adduser.png";
import Logo from "../../assets/logo/logo.svg";
import LogoDark from "../../assets/logo/logo_dark.svg";
import { ThemeContext } from "../../context/ThemeContext";

const AddUserDialog = ({ open, setOpen, role, onAddUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Using reset here to clear the form fields
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { darkMode } = useContext(ThemeContext);

  const onSubmit = (data) => {
    onAddUser(data); // Add the new user
  };

  // Reset form values when the dialog opens (open prop changes)
  useEffect(() => {
    if (open) {
      reset({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [open, reset]); // Only trigger when dialog opens

  return (
    <Dialog open={open} maxWidth="lg" fullWidth onClose={() => setOpen(false)}>
      <DialogContent
        sx={{
          px: 0,
          py: 0,
          mb: 0,
          height: "770px",
        }}
      >
        <Box display={"flex"} sx={{ alignItems: "stretch", height: "100%" }}>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <img
              src={AddUserImg}
              alt="AddUser Background"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              width: "50%",
              padding: 3,
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              sx={{ mt: 3, mb: 4 }}
            >
              <img src={darkMode ? LogoDark : Logo} alt="3D Practice Logo" />
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "40px",
                fontWeight: 500,
                textAlign: "center",
                mb: 2,
              }}
            >
              Add {role === "Admin" ? "Administrator" : "User"}
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                placeholder="Enter your Username"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", { required: "Username is required" })}
                margin="normal"
              />

              <TextField
                fullWidth
                variant="filled"
                label="Email"
                placeholder="Enter your Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    isEmail(value) || "Please enter a valid email address",
                })}
                margin="normal"
              />

              <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                placeholder="Enter your Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                })}
                margin="normal"
              />

              <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: 600,
                    px: 5,
                    py: 1,
                  }}
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;

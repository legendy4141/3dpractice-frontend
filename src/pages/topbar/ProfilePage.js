import React, { useState, useContext } from "react";
import { isMobilePhone, isPhoneNumber } from "class-validator";
import { useForm } from "react-hook-form";
import {
  Avatar,
  TextField,
  Button,
  Box,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { MuiTelInput } from "mui-tel-input";

import { ThemeContext } from "../../context/ThemeContext";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hover, setHover] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      practiceName: "Destiny Gray",
      practiceEmail: "3dconsultation@gmail.com",
      reportDescription: "Destiny Gray",
      phoneNumber: "",
      address1: "1534 Blue Magnolia Road",
      city: "",
      state: "",
      country: "",
      postalCode: "33510",
      reportUrl: "",
      postureCoKey: "5094079603225750",
      avatar: "",
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setValue("avatar", imageUrl);
    }
  };

  const onSubmit = (data) => {
    console.log("Profile Data:", data);
  };

  return (
    <Box sx={{ padding: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "50px", mb: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: 234,
              height: 234,
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar
              alt="User"
              src={selectedImage || undefined}
              sx={{ width: "100%", height: "100%" }}
            />

            {hover && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <PhotoCamera sx={{ color: "white", fontSize: 40 }} />
              </Box>
            )}

            <input
              accept="image/*"
              type="file"
              id="avatar-upload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
            </label>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Practice Name"
              variant="filled"
              placeholder="Enter your Practice Name"
              sx={{ mb: 4 }}
              {...register("practiceName", {
                required: "Practice name is required",
              })}
              error={!!errors.practiceName}
              helperText={errors.practiceName?.message}
            />
            <TextField
              fullWidth
              label="Practice Email"
              variant="filled"
              placeholder="Enter your Practice Email"
              {...register("practiceEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.practiceEmail}
              helperText={errors.practiceEmail?.message}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <TextField
            fullWidth
            label="Report Link Description"
            variant="filled"
            multiline
            rows={4}
            placeholder="Enter your Report Description"
            {...register("reportDescription")}
          />
          <FormControl
            {...register("phoneNumber", {
              required: "Phone number is required",
              validate: (value) => {
                if (!isPhoneNumber(value) && !isMobilePhone(value)) {
                  return "Invalid phone number";
                }
                return true;
              },
            })}
          >
            <InputLabel htmlFor="phonenumber">PhoneNumber</InputLabel>
            <MuiTelInput
              id="phonenumber"
              fullWidth
              defaultCountry="US"
              value={watch("phoneNumber")}
              sx={{
                "& .MuiTelInput-IconButton": {
                  mr: "12px",
                  borderRadius: "5px",
                  width: "80px",
                  height: "60px",
                  background: darkMode ? "#313235" : "#F0F0F0",
                  "& .MuiTelInput-FlagImg": {
                    width: "33px",
                    height: "25px",
                  },
                  "&:hover": {
                    background: darkMode ? "#3A3B3E" : "#EBEBEB",
                  },
                },
              }}
              onChange={(value) => setValue("phoneNumber", value)}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              placeholder="Enter your Phone number"
            />
          </FormControl>
          <TextField
            fullWidth
            label="Address Line 1"
            variant="filled"
            {...register("address1", { required: "Address is required" })}
            error={!!errors.address1}
            helperText={errors.address1?.message}
            placeholder="Enter your Address"
          />
          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            variant="filled"
            {...register("address2")}
            placeholder="Enter your Address"
          />
          <Box sx={{ display: "flex", gap: 4 }}>
            <TextField
              fullWidth
              label="City"
              variant="filled"
              {...register("city", { required: "City is required" })}
              error={!!errors.city}
              helperText={errors.city?.message}
              placeholder="Enter your City"
            />
            <TextField
              fullWidth
              label="State"
              variant="filled"
              {...register("state", { required: "State is required" })}
              error={!!errors.state}
              helperText={errors.state?.message}
              placeholder="Enter your State"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <TextField
              fullWidth
              label="Country"
              variant="filled"
              {...register("country", { required: "Country is required" })}
              error={!!errors.country}
              helperText={errors.country?.message}
              placeholder="Enter your Country"
            />
            <TextField
              fullWidth
              label="Postal Code"
              variant="filled"
              {...register("postalCode", {
                required: "Postal Code is required",
                pattern: { value: /^[0-9]+$/, message: "Invalid postal code" },
              })}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
              placeholder="Enter your Postal Code"
            />
          </Box>
          <TextField
            fullWidth
            label="Report Link URL"
            variant="filled"
            {...register("reportUrl")}
            placeholder="Enter your Report Link URL"
          />
          <TextField
            fullWidth
            label="PostureCo Video Key"
            variant="filled"
            {...register("postureCoKey")}
            placeholder="Enter your PostureCo Video Key"
          />
        </Box>

        <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              px: "37px",
              py: "12px",
              fontSize: "24px",
              borderRadius: "10px",
            }}
            type="submit"
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfilePage;

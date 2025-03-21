import React, { useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { isEmail, isMobilePhone, isPhoneNumber } from "class-validator";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { getColors } from "../../themes/theme";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

export const SendForm = () => {
  const { mainId, subId, protocolId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderInfo: "",
    },
  });

  const onSubmit = (data) => {
    console.log("SenderInfo", data);
  };

  const handleBackClick = () => {
    navigate(`/exercise/${mainId}/${subId}`);
  };

  return (
    <Box
      sx={{
        width: "472px",
        textAlign: "left",
      }}
    >
      <Box>
        <Box
          display={"flex"}
          sx={{ mb: "12px", alignItems: "center", cursor: "pointer" }}
          onClick={handleBackClick}
        >
          <KeyboardArrowLeftIcon
            sx={{
              color: darkMode ? getColors.primaryTextDark : "#222222",
              mr: "12px",
            }}
          />
          <Typography
            sx={{
              fontSize: "22px",
              color: darkMode ? getColors.primaryTextDark : "#222222",
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {protocolId}
          </Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            mt: "20px",
            mb: "40px",
            px: "20px",
            py: "20px",
            background: getColors.listItemHoverBg,
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "20px",
              color: getColors.buttonText,
              fontWeight: 400,
              textAlign: "center",
              mb: "20px",
            }}
          >
            Enter Patient's Email or Phone Number
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            placeholder="Enter your email or phonenumber"
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              mt: "20px",
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
        </Box>
      </form>
    </Box>
  );
};

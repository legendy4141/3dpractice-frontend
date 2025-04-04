import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { isEmail } from "class-validator";
import { useParams } from "react-router-dom";
import { getColors } from "../../themes/theme";
import axios from "axios";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { useSnackbar } from "notistack";

export const SendDialog = ({ open, setOpen, careplanData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderInfo: "",
    },
  });

  const { careId, subId } = useParams();
  const { token, user } = useAuthContext();
  const [loading, setLoading] = useState(false); // Loading state
  const { enqueueSnackbar } = useSnackbar();

  const handlePreviewClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-pdf/careplan`,
        {
          userid: user?.userid,
          conditionName: `${careId}-${subId}`,
          practiceid: user?.practiceId,
          careplanData: careplanData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      // Display the PDF in a new tab
      const blobUrl = window.URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");

      // window.open(blobUrl, "_blank");
    } catch (err) {
      console.log("Error fetching PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.senderInfo) && !isEmail(data.senderInfo)) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-pdf/careplan`,
        {
          userid: user?.userid,
          conditionName: `${careId}-${subId}`,
          practiceid: user?.practiceId,
          careplanData: careplanData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const fname = response.headers
        .get("content-disposition")
        .match(/filename="(.+)"/)[1];

      if (isEmail(data.senderInfo)) {
        setLoading(true);
        await axios.post(
          `${process.env.REACT_APP_API_URL}/send-email/careplan`,
          {
            who: data.senderInfo,
            what: `${user?.practiceName} recommends the following care plan.`,
            subject: `${user?.practiceName} recommends the following care plan.`,
            type: "careplan",
            fileName: fname,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (phoneRegex.test(data.senderInfo)) {
        setLoading(true);
        await axios.post(
          `${process.env.REACT_APP_API_URL}/send-text/careplan`,
          {
            who: data.senderInfo,
            what: "http://localhost:3000/shared_reports",
            subject: `${user?.practiceName} recommends the following care plan.`,
            type: "careplan",
            fileName: fname,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (err) {
      console.log("Error sending email:", err);
      enqueueSnackbar("Error sending email!", { variant: "error" });
    } finally {
      enqueueSnackbar("Successfully Sent!", { variant: "success" });
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Backdrop sx={{ zIndex: 1400 }} open={loading}>
        <CircularProgress size={80} />
      </Backdrop>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={() => setOpen(false)}
      >
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
                    const phoneRegex = /^[0-9]{10}$/; // Validates 10 digits only
                    if (
                      !phoneRegex.test(value) && // Check for 10-digit phone number
                      !isEmail(value) // Check for valid email
                    ) {
                      return "Please enter a valid 10-digit US phone number or a valid email";
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
    </>
  );
};

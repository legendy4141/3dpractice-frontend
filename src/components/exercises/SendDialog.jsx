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
import { getColors } from "../../themes/theme";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

export const SendDialog = ({ open, setOpen, id, type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderInfo: "",
    },
  });

  const { mainId, subId } = useParams();
  const { token, user } = useAuthContext();
  const [loading, setLoading] = useState(false); // Loading state
  const { enqueueSnackbar } = useSnackbar();

  const handlePreviewClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-pdf/exercise`,
        {
          userid: user?.userid,
          conditionName: `${mainId} ${subId}`,
          practiceid: user?.practiceId,
          protocolid: id,
          type,
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
        `${process.env.REACT_APP_API_URL}/generate-pdf/exercise`,
        {
          userid: user?.userid,
          conditionName: `${mainId} ${subId}`,
          practiceid: user?.practiceId,
          protocolid: id,
          type,
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
          `${process.env.REACT_APP_API_URL}/send-email/exercise`,
          {
            who: data.senderInfo,
            what: `${user?.practiceName} recommends the following exercise plan.`,
            subject: `${user?.practiceName} recommends the following exercise plan.`,
            type: "exercise",
            fileName: fname,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (phoneRegex.test(data.senderInfo)) {
        setLoading(true);
        await axios.post(
          `${process.env.REACT_APP_API_URL}/send-text/exercise`,
          {
            who: data.senderInfo,
            what: "http://localhost:3000/shared_reports",
            subject: `${user?.practiceName} recommends the following exercise plan.`,
            type: "exercise",
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
      {/* Full-screen loading spinner */}
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
          sx={{ px: 4, py: 4, background: getColors.listItemHoverBg }}
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
                  mb: 2,
                }}
              >
                Enter Patient's Email or Phone Number
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                placeholder="Enter email or phone number"
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
                  validate: (value) =>
                    /^[0-9]{10}$/.test(value) || isEmail(value)
                      ? true
                      : "Please enter a valid 10-digit US phone number or a valid email",
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
                  "&:hover": {
                    background: getColors.buttonText,
                    color: getColors.primaryMain,
                  },
                }}
                onClick={handlePreviewClick}
                disabled={loading}
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
                  "&:hover": {
                    background: getColors.primaryTextDark,
                    color: getColors.primaryMain,
                  },
                }}
                type="submit"
                disabled={loading}
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

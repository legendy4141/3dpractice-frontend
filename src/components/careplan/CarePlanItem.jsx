import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getColors } from "../../themes/theme";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { ThemeContext } from "../../context/ThemeContext";

export const CarePlanItem = ({ id, careplanname, onClick, onDelete }) => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/careplan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      enqueueSnackbar("Successfully Deleted!", { variant: "success" });
      onDelete(id);
    } catch (err) {
      enqueueSnackbar("Error Deleting careplan!", { variant: "error" });
      console.error("Error deleting careplan:", err);
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleClicked = () => {
    onClick();
  };

  const handleModifyClicked = (e) => {
    e.stopPropagation();
    navigate(`/care-plan/${id}/modify`);
  };

  const handleCopyClicked = (e) => {
    e.stopPropagation();
    navigate(`/care-plan/${id}/copy`);
  };

  const handleDeleteClicked = (e) => {
    e.stopPropagation();
    setOpenConfirmDialog(true);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          my: "20px",
          px: "28px",
          py: "14px",
          background: getColors.primaryMain,
          borderRadius: "5px",
          cursor: "pointer",
          "&:hover": {
            background: getColors.listItemHoverBg,
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "150px",
        }}
        onClick={handleClicked}
      >
        <Box display={"flex"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "22px",
              color: getColors.buttonText,
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            {careplanname}
          </Typography>
        </Box>
        <Box display={"flex"}>
          <Button
            variant="text"
            sx={{
              fontSize: "16px",
              color: "#CBE5FF",
              "&:hover": { background: "none", color: getColors.buttonText },
            }}
            onClick={handleModifyClicked}
          >
            Modify
          </Button>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              mx: 1,
              bgcolor: "#CBE5FF",
            }}
          />
          <Button
            variant="text"
            sx={{
              fontSize: "16px",
              color: "#CBE5FF",
              "&:hover": { background: "none", color: getColors.buttonText },
            }}
            onClick={handleCopyClicked}
          >
            Copy
          </Button>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              mx: 1,
              bgcolor: "#CBE5FF",
            }}
          />
          <Button
            variant="text"
            sx={{
              fontSize: "16px",
              color: "#CBE5FF",
              "&:hover": { background: "none", color: getColors.buttonText },
            }}
            onClick={handleDeleteClicked}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this careplan?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pt: 0 }}>
          <Button
            onClick={handleCancelDelete}
            sx={{
              borderRadius: "5px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 500,
              color: darkMode
                ? getColors.appBarBgLight
                : getColors.appBarBgDark,
              textAlign: "center",
              "&: hover": {
                background: "none",
                color: getColors.primaryMain,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              borderRadius: "5px",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

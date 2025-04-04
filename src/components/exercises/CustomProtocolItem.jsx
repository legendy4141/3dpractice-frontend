import React, { useContext, useState } from "react";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getColors } from "../../themes/theme";
import { SendDialog } from "./SendDialog";
import { ThemeContext } from "../../context/ThemeContext";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import axios from "axios";
import { CopyDialog } from "./CopyDialog";
import { useNavigate, useParams } from "react-router-dom";

export const CustomProtocolItem = ({
  id,
  protocolname,
  practiceid,
  conditions,
  onCopy,
  onDelete,
}) => {
  const { mainId, subId } = useParams();
  const { token, user } = useAuthContext();
  const { darkMode } = useContext(ThemeContext);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [openCopyDialog, setOpenCopyDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleProtocolClick = () => {
    setOpenSendDialog(id);
  };

  const handleModifyClicked = (e) => {
    e.stopPropagation();
    navigate(`/exercise/${mainId}/${subId}/${id}`);
  };

  const handleCopyClicked = (e) => {
    setOpenCopyDialog(true);
    e.stopPropagation();
  };

  const handleAddProtocol = async (editedProtocolData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/protocol`,
        {
          ...editedProtocolData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URL}/protexercise/copy`,
        {
          practiceid: user?.practiceId,
          protocolid: id,
          newprotocolid: res.data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Successfully Added!", { variant: "success" });
      onCopy(res.data);
    } catch (err) {
      enqueueSnackbar("Error Adding protocol!", { variant: "error" });
      console.error("Error Adding protocol:", err);
    } finally {
      setOpenCopyDialog(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/protocol/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.post(
        `${process.env.REACT_APP_API_URL}/protexercise/deleteByPracIDnProtID`,
        {
          practiceid: user?.practiceId,
          protocolid: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Successfully Deleted!", { variant: "success" });
      onDelete(id);
    } catch (err) {
      enqueueSnackbar("Error Deleting protocol!", { variant: "error" });
      console.error("Error deleting protocol:", err);
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const handleDeleteClicked = (e) => {
    e.stopPropagation();
    setOpenConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
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
          height: "130px",
        }}
        onClick={handleProtocolClick}
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
            {protocolname}
          </Typography>
          <KeyboardArrowRightIcon
            sx={{ color: getColors.buttonText, ml: "12px" }}
          />
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
      <SendDialog
        open={openSendDialog}
        setOpen={setOpenSendDialog}
        id={id}
        type="custom"
      />
      <CopyDialog
        open={openCopyDialog}
        setOpen={setOpenCopyDialog}
        protocolData={{
          // id,
          protocolname: `Copy of ${protocolname}`,
          practiceid,
          conditions,
        }}
        onAdd={handleAddProtocol}
      />
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this protocol?
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

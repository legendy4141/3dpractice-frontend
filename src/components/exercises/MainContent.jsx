import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  Box,
  Button,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";

import { Add } from "@mui/icons-material";

import { ThemeContext } from "../../context/ThemeContext";
import { getColors } from "../../themes/theme";
import { SendForm } from "./SendForm";
import { EBPProtocolItem } from "./EBPProtocolItem";
import { CustomProtocolItem } from "./CustomProtocolItem";
import { useForm } from "react-hook-form";
import { SelectedExerciseItem } from "./SelectedExerciseItem";
import { AvailableExerciseItem } from "./AvailableExerciseItem";

export const MainContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      protocolName: "",
    },
  });

  const { mainId, subId, protocolId } = useParams();
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const allExerciseData = [
    { id: "active-resisted-extension", select: false },
    { id: "active-resisted-external-rotation", select: false },
    { id: "active-resisted-internal-rotation", select: false },
    { id: "bird-dog", select: true },
    { id: "brand-pull", select: false },
    { id: "bridging", select: false },
    { id: "bridging-leg-extension", select: false },
    { id: "bruegger-posture-sitting", select: false },
    { id: "cat-camel", select: false },
    { id: "cervical-retraction", select: true },
    { id: "cervical-spine-lateral-neck-flexion", select: false },
    { id: "cervical-spine-levator-stretch", select: false },
    { id: "cervical-spine-neck-extension", select: false },
    { id: "cervical-spine-resistive-lateral-flexion", select: true },
    { id: "cervical-spine-resistive-rotation", select: false },
    { id: "cervical-spine-scalene-stretch", select: true },
    { id: "cervical-spine-scalene-strtech2", select: false },
    { id: "cervical-spine-stretch-axial-retraction", select: false },
    { id: "cervical-spine-upper-trapezius-stretch", select: false },
  ];

  const [allExercises, setAllExercises] = useState([
    {
      id: "ankle",
      title: "Ankle",
      subItems: [
        {
          id: "ankle-sprain",
          title: "Ankle Sprain",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "cervical",
      title: "Cervical",
      subItems: [
        {
          id: "bulging-disc",
          title: "Bulging disc",
          exercises: [...allExerciseData],
        },
        {
          id: "cervical-radiculopathy",
          title: "Cervical radiculopathy",
          exercises: [...allExerciseData],
        },
        {
          id: "degenerated-disc",
          title: "Degenerated disc",
          exercises: [...allExerciseData],
        },
        {
          id: "facet-syndrome",
          title: "Facet Syndrome",
          exercises: [...allExerciseData],
        },
        {
          id: "forward-head-posture",
          title: "Forward Head Posture",
          exercises: [...allExerciseData],
        },
        {
          id: "herniated-disc",
          title: "Herniated disc",
          exercises: [...allExerciseData],
        },
        {
          id: "kyphosis",
          title: "Kyphosis",
          exercises: [...allExerciseData],
        },
        {
          id: "lordosis",
          title: "Lordosis",
          exercises: [...allExerciseData],
        },
        {
          id: "neck-pain",
          title: "Neck Pain",
          exercises: [...allExerciseData],
        },
        {
          id: "spondylolithesis",
          title: "Spondylolithesis",
          exercises: [...allExerciseData],
        },
        {
          id: "stenosis",
          title: "Stenosis",
          exercises: [...allExerciseData],
        },
        {
          id: "subluxation",
          title: "Subluxation",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "elbow",
      title: "Elbow",
      subItems: [
        {
          id: "epicondylitis",
          title: "Epicondylitis",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "foot",
      title: "Foot",
      subItems: [
        {
          id: "plantar-fasciitis",
          title: "Plantar Fasciitis",
          exercises: [...allExerciseData],
        },
        {
          id: "pronation",
          title: "Pronation",
          exercises: [...allExerciseData],
        },
        {
          id: "supination",
          title: "Supination",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "hip",
      title: "Hip",
      subItems: [
        {
          id: "piriformis-syndrome",
          title: "Piriformis Syndrome",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "knee",
      title: "Knee",
      subItems: [
        {
          id: "acl-injury",
          title: "ACL Injury",
          exercises: [...allExerciseData],
        },
        {
          id: "mcl-injury",
          title: "MCL Injury",
          exercises: [...allExerciseData],
        },
        {
          id: "meniscus-tear",
          title: "Meniscus Tear",
          exercises: [...allExerciseData],
        },
        {
          id: "osteoarthritis",
          title: "Osteoarthritis",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "lumbar",
      title: "Lumbar",
      subItems: [
        {
          id: "bulging-disc",
          title: "Bulging disc",
          exercises: [...allExerciseData],
        },
        {
          id: "cervical-radiculopathy",
          title: "Cervical radiculopathy",
          exercises: [...allExerciseData],
        },
        {
          id: "degenerated-disc",
          title: "Degenerated disc",
          exercises: [...allExerciseData],
        },
        {
          id: "facet-syndrome",
          title: "Facet Syndrome",
          exercises: [...allExerciseData],
        },
        {
          id: "forward-head-posture",
          title: "Forward Head Posture",
          exercises: [...allExerciseData],
        },
        {
          id: "herniated-disc",
          title: "Herniated disc",
          exercises: [...allExerciseData],
        },
        {
          id: "kyphosis",
          title: "Kyphosis",
          exercises: [...allExerciseData],
        },
        {
          id: "lordosis",
          title: "Lordosis",
          exercises: [...allExerciseData],
        },
        {
          id: "neck-pain",
          title: "Neck Pain",
          exercises: [...allExerciseData],
        },
        {
          id: "spondylolithesis",
          title: "Spondylolithesis",
          exercises: [...allExerciseData],
        },
        {
          id: "stenosis",
          title: "Stenosis",
          exercises: [...allExerciseData],
        },
        {
          id: "subluxation",
          title: "Subluxation",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "pelvis",
      title: "Pelvis",
      subItems: [
        {
          id: "psoas-hip-flexor-tightness",
          title: "Psoas & Hip Flexor Tightness",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "shoulder",
      title: "Shoulder",
      subItems: [
        {
          id: "adhesive-capsulitis",
          title: "Adhesive Capsulitis",
          exercises: [...allExerciseData],
        },
        {
          id: "impingement",
          title: "Impingement",
          exercises: [...allExerciseData],
        },
        {
          id: "rotator-cuff-injury",
          title: "Rotator Cuff Injury",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "thoracic",
      title: "Thoracic",
      subItems: [
        {
          id: "bulging-disc",
          title: "Bulging disc",
          exercises: [...allExerciseData],
        },
        {
          id: "degenerated-disc",
          title: "Degenerated disc",
          exercises: [...allExerciseData],
        },
        {
          id: "facet-syndrome",
          title: "Facet Syndrome",
          exercises: [...allExerciseData],
        },
        {
          id: "herniated-disc",
          title: "Herniated disc",
          exercises: [...allExerciseData],
        },
        {
          id: "kyphosis",
          title: "Kyphosis",
          exercises: [...allExerciseData],
        },
        {
          id: "lordosis",
          title: "Lordosis",
          exercises: [...allExerciseData],
        },
        {
          id: "scoliosis",
          title: "Scoliosis",
          exercises: [...allExerciseData],
        },
        {
          id: "spondylolithesis",
          title: "Spondylolithesis",
          exercises: [...allExerciseData],
        },
        {
          id: "stenosis",
          title: "Stenosis",
          exercises: [...allExerciseData],
        },
        {
          id: "subluxation",
          title: "Subluxation",
          exercises: [...allExerciseData],
        },
        {
          id: "thoracic-pain",
          title: "Thoracic Pain",
          exercises: [...allExerciseData],
        },
      ],
    },
    {
      id: "wrist",
      title: "Wrist",
      subItems: [
        {
          id: "carpal-tunnel",
          title: "Carpal Tunnel",
          exercises: [...allExerciseData],
        },
      ],
    },
  ]);

  const [allAddedProtocols, setAllAddedProtocols] = useState([]);

  const handleNewProtocolClicked = () => {
    navigate(`/exercise/${mainId}/${subId}/new`);
  };

  const onAddProtocol = (data) => {
    navigate(`/exercise/${mainId}/${subId}`);
    const newProtocol = {
      id: `new-${Date.now()}`,
      name: data.protocolName,
    };
    setAllAddedProtocols((prevProtocols) => [...prevProtocols, newProtocol]);
  };

  const handleDeselect = (id) => {
    setAllExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === mainId
          ? {
              ...exercise,
              subItems: exercise.subItems.map((subitem) =>
                subitem.id === subId
                  ? {
                      ...subitem,
                      exercises: subitem.exercises.map((exercise) =>
                        exercise.id === id
                          ? { ...exercise, select: false }
                          : { ...exercise }
                      ),
                    }
                  : subitem
              ),
            }
          : exercise
      )
    );
  };

  const handleAddToSelected = (id) => {
    setAllExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === mainId
          ? {
              ...exercise,
              subItems: exercise.subItems.map((subitem) =>
                subitem.id === subId
                  ? {
                      ...subitem,
                      exercises: subitem.exercises.map((exercise) =>
                        exercise.id === id
                          ? { ...exercise, select: true }
                          : { ...exercise }
                      ),
                    }
                  : subitem
              ),
            }
          : exercise
      )
    );
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      {protocolId !== "new" && protocolId !== undefined ? (
        <Box sx={{ mt: "40px", ml: "60px" }}>
          <SendForm />
        </Box>
      ) : protocolId === "new" ? (
        <Box sx={{ padding: 5 }}>
          <Box sx={{ mb: 5 }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ mb: 3 }}
            >
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: darkMode
                    ? getColors.drawerTextDark
                    : getColors.thumbnailTextLight,
                  textAlign: "left",
                }}
              >
                Add Protocol
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                  px: 5,
                  py: "10px",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  alert("Report");
                }}
              >
                Report
              </Button>
            </Box>
            <form onSubmit={handleSubmit(onAddProtocol)}>
              <Box
                display={"flex"}
                sx={{
                  padding: "20px",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: darkMode
                    ? getColors.appBarBorderDark
                    : getColors.appBarBorderLight,
                  gap: 4,
                  mb: 8,
                }}
              >
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Enter Protocol Name"
                    {...register("protocolName", {
                      required: "Protocol Name is required",
                    })}
                    error={!!errors.protocolName}
                    helperText={errors.protocolName?.message}
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    height: 64,
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    px: 8,
                    py: 2,
                    borderRadius: "5px",
                  }}
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
          <Box sx={{ mb: 8 }}>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 600,
                color: darkMode
                  ? getColors.drawerTextDark
                  : getColors.thumbnailTextLight,
                textAlign: "left",
                mb: 3,
              }}
            >
              Selected Exercises
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
              {allExercises
                .find((exercise) => exercise.id === mainId)
                ?.subItems?.find((subitem) => subitem.id === subId)
                ?.exercises?.filter((exercise) => exercise.select === true)
                .map((treatment, index) => (
                  <SelectedExerciseItem
                    key={index}
                    {...treatment}
                    onRemove={handleDeselect}
                  />
                ))}
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 600,
                color: darkMode
                  ? getColors.drawerTextDark
                  : getColors.thumbnailTextLight,
                textAlign: "left",
                mb: 3,
              }}
            >
              Available Exercises
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
              {allExercises
                .find((exercise) => exercise.id === mainId)
                ?.subItems?.find((subitem) => subitem.id === subId)
                ?.exercises?.filter((exercise) => exercise.select === false)
                .map((treatment, index) => (
                  <AvailableExerciseItem
                    key={index}
                    {...treatment}
                    onAdd={handleAddToSelected}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      ) : !mainId ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography
            sx={{
              fontSize: "24px",
              color: theme.palette.text.secondary,
              textAlign: "center",
            }}
          >
            No exercise category selected.
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              color: theme.palette.text.secondary,
              mt: "10px",
              textAlign: "center",
            }}
          >
            Please choose a body region from the left panel to view relevant
            exercises.
          </Typography>
        </Box>
      ) : !subId ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography
            sx={{
              fontSize: "24px",
              color: theme.palette.text.secondary,
              textAlign: "center",
            }}
          >
            No condition selected.
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              color: theme.palette.text.secondary,
              mt: "10px",
              textAlign: "center",
            }}
          >
            Please choose an option from the list to view detailed exercises.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            mt: "40px",
            mx: "60px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "28px",
                color: darkMode
                  ? getColors.drawerTextDark
                  : getColors.thumbnailTextLight,
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              Exercise Protocols for {subId}
            </Typography>
            <Box
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              columnGap={5}
              sx={{ mb: 3 }}
            >
              <EBPProtocolItem />
              {allAddedProtocols.map((protocol, index) => (
                <CustomProtocolItem key={index} {...protocol} />
              ))}
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              fontFamily: "Poppins",
              fontSize: "20px",
              px: "16px",
              py: "12px",
              background: darkMode ? "#2D2E30" : "#E6E6E6",
              color: darkMode
                ? getColors.primaryTextDark
                : getColors.secondaryTextLight,
              "&:hover": {
                color: getColors.primaryTextDark,
              },
            }}
            onClick={handleNewProtocolClicked}
          >
            New Protocol
          </Button>
        </Box>
      )}
    </Box>
  );
};

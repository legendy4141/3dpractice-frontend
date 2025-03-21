import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { ThemeContext } from "../../context/ThemeContext";
import { getColors } from "../../themes/theme";
import { DefaultPhaseItem } from "./DefaultPhaseItem";
import { OriginPhaseItem } from "./OriginPhaseItem";
import { PhaseDialog } from "./PhaseDialog";
import { CareAreaItem } from "./CareAreaItem";
import { CareSubAreaItem } from "./CareSubAreaItem";
import { CurrentPhaseItem } from "./CurrentPhaseItem";
import { SelectedTreatmentItem } from "./SelectedTreatmentItem";
import { AvailableTreatmentItem } from "./AvailableTreatmentItem";

import { Add } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { CarePlanItem } from "./CarePlanItem";
import { SendDialog } from "./SendDialog";

export const MainContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      careplanName: "",
    },
  });
  const navigate = useNavigate();

  const availableTreatmentData = [
    {
      id: "active-release-technique",
      title: "Active Release Technique",
      select: false,
    },
    { id: "class-iv-laser", title: "Class IV Laser", select: false },
    { id: "creams-ointments", title: "Creams / Ointments", select: false },
    { id: "cold-therapy", title: "Cold Therapy", select: false },
    {
      id: "decompression-therapy",
      title: "Decompression Therapy",
      select: false,
    },
    { id: "diathermy", title: "Diathermy", select: false },
    { id: "dry-needling", title: "Dry Needling", select: false },
    {
      id: "electric-muscle-stimulation",
      title: "Electric Muscles Stimulation",
      select: false,
    },
    {
      id: "electrical-nerve-stimulation",
      title: "Electrical Nerve Stimulation",
      select: false,
    },
    { id: "ergonomics", title: "Ergonomics", select: false },
    { id: "exercise", title: "Exercise", select: false },
    { id: "flexion-distraction", title: "Flexion Distraction", select: false },
    { id: "graston-technique", title: "Graston Technique", select: false },
    { id: "heat-cold", title: "Heat & Cold", select: false },
    { id: "heat-therapy", title: "Heat Therapy", select: false },
    { id: "hydrotherapy", title: "Hydrotherapy", select: false },
    {
      id: "hyaluronic-knee-injections",
      title: "Hyaluronic Knee Injections",
      select: false,
    },
    {
      id: "ice-and-heat-therapy",
      title: "Ice and Heat Therapy",
      select: false,
    },
    { id: "infrared-therapy", title: "Infrared Therapy", select: false },
    {
      id: "intersegmental-traction",
      title: "Intersegmental Traction",
      select: false,
    },
    { id: "laser-therapy", title: "Laser Therapy", select: false },
    { id: "massage-therapy", title: "Massage Therapy", select: false },
    { id: "myofascial-release", title: "Myofascial Release", select: false },
    { id: "orthotics", title: "Orthotics", select: false },
    {
      id: "pelvic-stabilization",
      title: "Pelvic Stabilization",
      select: false,
    },
    { id: "pemf-therapy", title: "PEMF Therapy", select: false },
    {
      id: "platelet-rich-plasma",
      title: "Platelet Rich Plasma",
      select: false,
    },
    { id: "red-light-therapy", title: "Red Light Therapy", select: false },
    { id: "shockwave-therapy", title: "Shockwave Therapy", select: false },
    {
      id: "sigma-systems-ultralign",
      title: "Sigma Systems Ultralign",
      select: false,
    },
    { id: "spinal-adjustment", title: "Spinal Adjustment", select: false },
    {
      id: "spine-rehab-posture-correction",
      title: "Spine Rehab & Posture Correction",
      select: false,
    },
    { id: "steroid-injection", title: "Steroid Injection", select: false },
    { id: "supplements", title: "Supplements", select: false },
    { id: "supplies", title: "Supplies", select: false },
    {
      id: "trigger-point-injections",
      title: "Trigger Point Injections",
      select: false,
    },
    { id: "traction", title: "Traction", select: false },
    { id: "ultrasound", title: "Ultrasound", select: false },
    { id: "vibration-therapy", title: "Vibration Therapy", select: false },
  ];

  const [allPhases, setAllPhases] = useState([
    {
      id: "acute",
      name: "Acute",
      description: "Acute description",
      frequency: 3,
      duration: 10,
      active: 1,
      default: true,
    },
    {
      id: "corrective",
      name: "Corrective",
      description: "Corrective description",
      frequency: 5,
      duration: 8,
      active: 2,
      default: true,
    },
    {
      id: "crisis-care-phase",
      name: "Crisis Care Phase",
      description: "Crisis Care Phase description",
      frequency: 2,
      duration: 12,
      active: 3,
      default: false,
    },
    {
      id: "critical-transition-phase",
      name: "Critical Transition Phase",
      description: "Critical Transition Phase description",
      frequency: 6,
      duration: 9,
      active: 2,
      default: false,
    },
    {
      id: "intensive",
      name: "Intensive",
      description: "Intensive description",
      frequency: 8,
      duration: 14,
      active: 3,
      default: false,
    },
    {
      id: "lifestyle-care-phase",
      name: "LifeStyle Care Phase",
      description: "LifeStyle Care Phase description",
      frequency: 1,
      duration: 5,
      active: 1,
      default: false,
    },
    {
      id: "maintenance",
      name: "Maintenance",
      description: "Maintenance description",
      frequency: 4,
      duration: 7,
      active: 2,
      default: false,
    },
    {
      id: "recovery",
      name: "Recovery",
      description: "Recovery description",
      frequency: 7,
      duration: 13,
      active: 1,
      default: false,
    },
    {
      id: "rehabilitative",
      name: "Rehabilitative",
      description: "Rehabilitative description",
      frequency: 3,
      duration: 10,
      active: 2,
      default: false,
    },
    {
      id: "relief",
      name: "Relief",
      description: "Relief description",
      frequency: 2,
      duration: 6,
      active: 3,
      default: false,
    },
    {
      id: "wellness",
      name: "Wellness",
      description: "Wellness description",
      frequency: 1,
      duration: 4,
      active: 1,
      default: true,
    },
  ]);

  const [allAddedCarePlans, setAllAddedCarePlans] = useState([
    {
      id: "careplan1",
      name: "CarePlan1",
      current_phase: [...allPhases],
      // selected_treatments: [],
      available_treatments: [...availableTreatmentData],
    },
    {
      id: "careplan2",
      name: "CarePlan2",
      current_phase: [...allPhases],
      // selected_treatments: [],
      available_treatments: [...availableTreatmentData],
    },
    {
      id: "careplan3",
      name: "CarePlan3",
      current_phase: [...allPhases],
      // selected_treatments: [],
      available_treatments: [...availableTreatmentData],
    },
  ]);

  const { mainId, careId, subId } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [phaseActionType, setPhaseActionType] = useState("add");
  const [phaseDialogOpen, setPhaseDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [phaseToEdit, setPhaseToEdit] = useState(null);
  const [allTreatments, setAllTreatments] = useState([
    {
      id: "ankle",
      title: "Ankle",
      subItems: [
        {
          id: "ankle-sprain",
          title: "Ankle Sprain",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "cervical-radiculopathy",
          title: "Cervical radiculopathy",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "degenerated-disc",
          title: "Degenerated disc",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "facet-syndrome",
          title: "Facet Syndrome",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "forward-head-posture",
          title: "Forward Head Posture",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "herniated-disc",
          title: "Herniated disc",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "kyphosis",
          title: "Kyphosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "lordosis",
          title: "Lordosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "neck-pain",
          title: "Neck Pain",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "spondylolithesis",
          title: "Spondylolithesis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "stenosis",
          title: "Stenosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "subluxation",
          title: "Subluxation",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "pronation",
          title: "Pronation",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "supination",
          title: "Supination",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "mcl-injury",
          title: "MCL Injury",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "meniscus-tear",
          title: "Meniscus Tear",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "osteoarthritis",
          title: "Osteoarthritis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "cervical-radiculopathy",
          title: "Cervical radiculopathy",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "degenerated-disc",
          title: "Degenerated disc",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "facet-syndrome",
          title: "Facet Syndrome",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "forward-head-posture",
          title: "Forward Head Posture",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "herniated-disc",
          title: "Herniated disc",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "kyphosis",
          title: "Kyphosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "lordosis",
          title: "Lordosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "neck-pain",
          title: "Neck Pain",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "spondylolithesis",
          title: "Spondylolithesis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "stenosis",
          title: "Stenosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "subluxation",
          title: "Subluxation",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "impingement",
          title: "Impingement",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "rotator-cuff-injury",
          title: "Rotator Cuff Injury",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "degenerated-disc",
          title: "Degenerated disc",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "facet-syndrome",
          title: "Facet Syndrome",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "herniated-disc",
          title: "Herniated disc",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "kyphosis",
          title: "Kyphosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "lordosis",
          title: "Lordosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "scoliosis",
          title: "Scoliosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "spondylolithesis",
          title: "Spondylolithesis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "stenosis",
          title: "Stenosis",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "subluxation",
          title: "Subluxation",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
        {
          id: "thoracic-pain",
          title: "Thoracic Pain",
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
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
          treatments: [...availableTreatmentData],
          phases: [...allPhases],
        },
      ],
    },
  ]);

  const handleChangePhases = () => {
    alert("Change Phases");
  };

  const handleDeselect = (id) => {
    setAllTreatments((prevTreatments) =>
      prevTreatments.map((careplan) =>
        careplan.id === careId
          ? {
              ...careplan,
              subItems: careplan.subItems.map((subitem) =>
                subitem.id === subId
                  ? {
                      ...subitem,
                      treatments: subitem.treatments.map((treatment) =>
                        treatment.id === id
                          ? { ...treatment, select: false }
                          : { ...treatment }
                      ),
                    }
                  : subitem
              ),
            }
          : careplan
      )
    );
  };

  const handleAddToSelected = (id) => {
    setAllTreatments((prevTreatments) =>
      prevTreatments.map((careplan) =>
        careplan.id === careId
          ? {
              ...careplan,
              subItems: careplan.subItems.map((subitem) =>
                subitem.id === subId
                  ? {
                      ...subitem,
                      treatments: subitem.treatments.map((treatment) =>
                        treatment.id === id
                          ? { ...treatment, select: true }
                          : { ...treatment }
                      ),
                    }
                  : subitem
              ),
            }
          : careplan
      )
    );
  };

  const onSubmit = (data) => {
    const newCarePlan = {
      id: `new-${Date.now()}`,
      name: data.careplanName,
      current_phase: [...allPhases],
      available_treatments: [...availableTreatmentData],
    };
    setAllAddedCarePlans((prevCarePlans) => [...prevCarePlans, newCarePlan]);
    navigate("/care-plan");
  };

  const onSaveCarePlan = (data) => {
    setAllAddedCarePlans((prevCarePlans) =>
      prevCarePlans.map((careplan) =>
        careplan.id === mainId
          ? { ...careplan, name: data.careplanName }
          : { ...careplan }
      )
    );

    navigate("/care-plan");
  };

  const addPhaseBtnClicked = () => {
    setPhaseActionType("add");
    setPhaseToEdit({
      id: `new-${Date.now()}`,
      name: "",
      description: "",
      frequency: "",
      duration: "",
      active: "",
      default: false,
    });
    setPhaseDialogOpen(true);
  };

  const handleCopyClicked = (id) => {
    setPhaseActionType("add");
    const phaseToCopy = allPhases.find((phase) => phase.id === id);
    if (phaseToCopy) {
      setPhaseToEdit({
        ...phaseToCopy,
        name: `Copy of ${phaseToCopy.name}`,
        default: false,
      });
      setPhaseDialogOpen(true);
    }
  };

  const handleCarePlanClicked = () => {
    setSendDialogOpen(true);
  };

  const handleEditClicked = (id) => {
    setPhaseActionType("edit");
    const phaseToCopy = allPhases.find((phase) => phase.id === id);
    if (phaseToCopy) {
      setPhaseToEdit({
        ...phaseToCopy,
        default: false,
      });
      setPhaseDialogOpen(true);
    }
  };

  const handleRemoveClicked = (id) => {
    setAllPhases((prevPhases) =>
      prevPhases.map((phase) =>
        phase.id === id ? { ...phase, default: false } : phase
      )
    );
  };

  const handleSetDefault = (id) => {
    setAllPhases((prevPhases) =>
      prevPhases.map((phase) =>
        phase.id === id ? { ...phase, default: true } : { ...phase }
      )
    );
  };

  const handleCopyNewPhase = (newPhase) => {
    setAllPhases((prevPhases) => [
      ...prevPhases,
      {
        ...newPhase,
        id: `new-${Date.now()}`,
      },
    ]);
    setPhaseDialogOpen(false);
  };

  const handleEditPhase = (editPhase) => {
    setAllPhases((prevPhases) =>
      prevPhases.map((phase) => (phase.id === editPhase.id ? editPhase : phase))
    );
    setPhaseDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setPhaseDialogOpen(false);
    setPhaseToEdit(null);
  };

  const filterPhasesByDefault = (value) => {
    return allPhases.filter((phase) => phase.default === value);
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Box sx={{ padding: 8 }}>
        <>
          {mainId === undefined && (
            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: darkMode
                    ? getColors.drawerTextDark
                    : getColors.thumbnailTextLight,
                  textAlign: "left",
                  mb: 2,
                }}
              >
                Treatment Care Plans
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
                {allAddedCarePlans.map((careplan, index) => (
                  <CarePlanItem
                    key={index}
                    {...careplan}
                    handleClick={handleCarePlanClicked}
                  />
                ))}
              </Box>
            </Box>
          )}
        </>
        <>
          {mainId === "default-phases" && (
            <Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                  mb: 5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "28px",
                    fontWeight: 500,
                    color: darkMode
                      ? getColors.drawerTextDark
                      : getColors.thumbnailTextLight,
                    textAlign: "left",
                  }}
                >
                  Default Phases
                </Typography>
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
                  onClick={addPhaseBtnClicked}
                >
                  Add Phase
                </Button>
              </Box>
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={3}
                sx={{ mb: 10 }}
              >
                {filterPhasesByDefault(true).map((phase, index) => (
                  <DefaultPhaseItem
                    key={index}
                    {...phase}
                    onRemove={handleRemoveClicked}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: darkMode
                    ? getColors.drawerTextDark
                    : getColors.thumbnailTextLight,
                  textAlign: "left",
                  mb: 5,
                }}
              >
                All Phases
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
                {allPhases.map((phase, index) => (
                  <OriginPhaseItem
                    key={index}
                    {...phase}
                    onSetDefault={handleSetDefault}
                    onCopyPhase={handleCopyClicked}
                  />
                ))}
              </Box>
            </Box>
          )}
        </>
        <>
          {mainId === "new-plan" &&
            (!careId ? (
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "28px",
                    fontWeight: 500,
                    color: darkMode
                      ? getColors.drawerTextDark
                      : getColors.thumbnailTextLight,
                    textAlign: "left",
                    mb: 5,
                  }}
                >
                  Create Care Plan by selecting Area
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={3}
                  sx={{ mb: 7 }}
                >
                  {allTreatments.map((carearea, index) => (
                    <CareAreaItem key={index} {...carearea} />
                  ))}
                </Box>
              </Box>
            ) : (
              <Box>
                {!subId ? (
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "28px",
                        fontWeight: 500,
                        color: darkMode
                          ? getColors.drawerTextDark
                          : getColors.thumbnailTextLight,
                        textAlign: "left",
                        mb: 5,
                      }}
                    >
                      Create Care Plan by selecting Conditions
                    </Typography>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(2, 1fr)"
                      gap={4}
                    >
                      {allTreatments
                        .find((exercise) => exercise.id === careId)
                        ?.subItems.map((careArea, index) => (
                          <CareSubAreaItem key={index} {...careArea} />
                        ))}
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{
                        mb: 3,
                      }}
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
                        {`Create Care Plan for ${
                          allTreatments.filter(
                            (exercise) => exercise.id === careId
                          )[0].title
                        } ${
                          allTreatments
                            .filter((exercise) => exercise.id === careId)[0]
                            ?.subItems.filter(
                              (subitem) => subitem.id === subId
                            )[0].title
                        }`}
                      </Typography>
                      <Button
                        variant="contained"
                        endIcon={
                          <SendIcon style={{ fontSize: 24, marginLeft: 8 }} />
                        }
                        sx={{
                          fontSize: "18px",
                          fontWeight: 500,
                          fontFamily: "Poppins",
                          px: 5,
                          py: "10px",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          setSendDialogOpen(true);
                        }}
                      >
                        Send
                      </Button>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            placeholder="Enter Care Plan Name"
                            {...register("careplanName", {
                              required: "Care Plan Name is required",
                            })}
                            error={!!errors.careplanName}
                            helperText={errors.careplanName?.message}
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
                          Create
                        </Button>
                      </Box>
                    </form>

                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      sx={{ mb: 5 }}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{
                          fontSize: "28px",
                          fontWeight: 500,
                          color: darkMode
                            ? getColors.drawerTextDark
                            : getColors.thumbnailTextLight,
                          textAlign: "left",
                        }}
                      >
                        Current Phases
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={
                          <ChangeCircleOutlinedIcon
                            style={{ fontSize: 28, marginRight: 8 }}
                          />
                        }
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
                        onClick={handleChangePhases}
                      >
                        Change Phases
                      </Button>
                    </Box>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 1fr)"
                      gap={4}
                      mb={8}
                    >
                      {allPhases.map((phase, index) => (
                        <CurrentPhaseItem
                          key={index}
                          {...phase}
                          onEdit={handleEditClicked}
                        />
                      ))}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "28px",
                        fontWeight: 500,
                        color: darkMode
                          ? getColors.drawerTextDark
                          : getColors.thumbnailTextLight,
                        textAlign: "left",
                        mb: 5,
                      }}
                    >
                      Selected Treatments
                    </Typography>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 1fr)"
                      gap={4}
                      mb={8}
                    >
                      {allTreatments
                        .find((careplan) => careplan.id === careId)
                        ?.subItems?.find((subitem) => subitem.id === subId)
                        ?.treatments?.filter(
                          (treatment) => treatment.select === true
                        )
                        .map((treatment, index) => (
                          <SelectedTreatmentItem
                            key={index}
                            {...treatment}
                            onRemove={handleDeselect}
                          />
                        ))}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "28px",
                        fontWeight: 500,
                        color: darkMode
                          ? getColors.drawerTextDark
                          : getColors.thumbnailTextLight,
                        textAlign: "left",
                        mb: 5,
                      }}
                    >
                      Available Treatments
                    </Typography>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 1fr)"
                      gap={4}
                      mb={8}
                    >
                      {allTreatments
                        .find((careplan) => careplan.id === careId)
                        ?.subItems?.find((subitem) => subitem.id === subId)
                        ?.treatments?.filter(
                          (treatment) => treatment.select === false
                        )
                        .map((treatment, index) => (
                          <AvailableTreatmentItem
                            key={index}
                            {...treatment}
                            onAdd={handleAddToSelected}
                          />
                        ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
        </>
        <>
          {mainId !== undefined &&
            mainId !== "default-phases" &&
            mainId !== "new-plan" &&
            (careId === "modify" ? (
              <Box>
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
                    {/* must Edittitle */}
                    {`Edit Care Plan `}
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={
                      <SendIcon style={{ fontSize: 24, marginLeft: 8 }} />
                    }
                    sx={{
                      fontSize: "18px",
                      fontWeight: 500,
                      fontFamily: "Poppins",
                      px: 5,
                      py: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      setSendDialogOpen(true);
                    }}
                  >
                    Send
                  </Button>
                </Box>

                <form onSubmit={handleSubmit(onSaveCarePlan)}>
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
                        placeholder="Enter Care Plan Name"
                        // careplanname should be copied via backend
                        {...register("careplanName", {
                          required: "Care Plan Name is required",
                        })}
                        error={!!errors.careplanName}
                        helperText={errors.careplanName?.message}
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
                      Save
                    </Button>
                  </Box>
                </form>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ mb: 5 }}
                  alignItems={"center"}
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: 500,
                      color: darkMode
                        ? getColors.drawerTextDark
                        : getColors.thumbnailTextLight,
                      textAlign: "left",
                    }}
                  >
                    Current Phases
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={
                      <ChangeCircleOutlinedIcon
                        style={{ fontSize: 28, marginRight: 8 }}
                      />
                    }
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
                    onClick={handleChangePhases}
                  >
                    Change Phases
                  </Button>
                </Box>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={4}
                  mb={8}
                >
                  {allPhases.map((phase, index) => (
                    <CurrentPhaseItem
                      key={index}
                      {...phase}
                      onEdit={handleEditClicked}
                    />
                  ))}
                </Box>

                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: 500,
                    color: darkMode
                      ? getColors.drawerTextDark
                      : getColors.thumbnailTextLight,
                    textAlign: "left",
                    mb: 5,
                  }}
                >
                  Selected Treatments
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={4}
                  mb={8}
                >
                  {availableTreatmentData
                    .filter((treatment) => treatment.select === true)
                    .map((treatment, index) => (
                      <SelectedTreatmentItem
                        key={index}
                        {...treatment}
                        onRemove={handleDeselect}
                      />
                    ))}
                </Box>

                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: 500,
                    color: darkMode
                      ? getColors.drawerTextDark
                      : getColors.thumbnailTextLight,
                    textAlign: "left",
                    mb: 5,
                  }}
                >
                  Available Treatments
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={4}
                  mb={8}
                >
                  {availableTreatmentData
                    .filter((treatment) => treatment.select === false)
                    .map((treatment, index) => (
                      <AvailableTreatmentItem
                        key={index}
                        {...treatment}
                        onAdd={handleAddToSelected}
                      />
                    ))}
                </Box>
              </Box>
            ) : (
              <Box>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{
                    mb: 3,
                  }}
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
                    {/* must Edittitle */}
                    {`Copy as New Care Plan`}
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={
                      <SendIcon style={{ fontSize: 24, marginLeft: 8 }} />
                    }
                    sx={{
                      fontSize: "18px",
                      fontWeight: 500,
                      fontFamily: "Poppins",
                      px: 5,
                      py: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      setSendDialogOpen(true);
                    }}
                  >
                    Send
                  </Button>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Enter Care Plan Name"
                        // careplanname should be copied via backend
                        {...register("careplanName", {
                          required: "Care Plan Name is required",
                        })}
                        error={!!errors.careplanName}
                        helperText={errors.careplanName?.message}
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

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  sx={{ mb: 5 }}
                  alignItems={"center"}
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: 500,
                      color: darkMode
                        ? getColors.drawerTextDark
                        : getColors.thumbnailTextLight,
                      textAlign: "left",
                    }}
                  >
                    Current Phases
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={
                      <ChangeCircleOutlinedIcon
                        style={{ fontSize: 28, marginRight: 8 }}
                      />
                    }
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
                    onClick={handleChangePhases}
                  >
                    Change Phases
                  </Button>
                </Box>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={4}
                  mb={8}
                >
                  {allPhases.map((phase, index) => (
                    <CurrentPhaseItem
                      key={index}
                      {...phase}
                      onEdit={handleEditClicked}
                    />
                  ))}
                </Box>

                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: 500,
                    color: darkMode
                      ? getColors.drawerTextDark
                      : getColors.thumbnailTextLight,
                    textAlign: "left",
                    mb: 5,
                  }}
                >
                  Selected Treatments
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={4}
                  mb={8}
                >
                  {availableTreatmentData
                    .filter((treatment) => treatment.select === true)
                    .map((treatment, index) => (
                      <SelectedTreatmentItem
                        key={index}
                        {...treatment}
                        onRemove={handleDeselect}
                      />
                    ))}
                </Box>

                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: 500,
                    color: darkMode
                      ? getColors.drawerTextDark
                      : getColors.thumbnailTextLight,
                    textAlign: "left",
                    mb: 5,
                  }}
                >
                  Available Treatments
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={4}
                  mb={8}
                >
                  {availableTreatmentData
                    .filter((treatment) => treatment.select === false)
                    .map((treatment, index) => (
                      <AvailableTreatmentItem
                        key={index}
                        {...treatment}
                        onAdd={handleAddToSelected}
                      />
                    ))}
                </Box>
              </Box>
            ))}
        </>
      </Box>

      <SendDialog open={sendDialogOpen} setOpen={setSendDialogOpen} />

      <PhaseDialog
        open={phaseDialogOpen}
        onClose={handleCloseDialog}
        phaseData={phaseToEdit}
        onCopy={handleCopyNewPhase}
        onEdit={handleEditPhase}
        actionType={phaseActionType}
      />
    </Box>
  );
};

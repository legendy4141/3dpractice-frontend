import React, { useContext, useState, useEffect, useMemo } from "react";
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
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { CarePlanItem } from "./CarePlanItem";
import { SendDialog } from "./SendDialog";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useProtocolData } from "../../hooks/protocoldata/useProtocolData";
import { AvailablePhaseItem } from "./AvailablePhaseItem";
import { SelectedPhaseItem } from "./SelectedPhaseItem";
import { SendWithExerciseDialog } from "./SendWithExerciseDialog";

export const MainContent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      careplanName: "",
    },
  });
  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  const [allPhases, setAllPhases] = useState([]);
  const [currentPhases, setCurrentPhases] = useState([]);
  const [defaultPhaseID, setDefaultPhaseID] = useState([]);
  const [defaultPhases, setDefaultPhases] = useState([]);
  const { mainId, careId, subId } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [phaseActionType, setPhaseActionType] = useState("add");
  const [phaseDialogOpen, setPhaseDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [sendWithExerciseDialogOpen, setSendWithExerciseDialogOpen] =
    useState(false);
  const [phaseToEdit, setPhaseToEdit] = useState(null);
  const { areas } = useProtocolData(token);
  const { conditions } = useProtocolData(token);
  const [allTreatments, setAllTreatments] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [openPhaseSection, setOpenPhaseSection] = useState(false);
  const [allCarePlans, setAllCarePlans] = useState([]);
  const [conditionID, setConditionID] = useState();
  const [currentCareplanData, setCurrentCareplanData] = useState();

  const selectedCondition = conditions[careId] || [];

  const renderingTreatments = useMemo(() => {
    return allTreatments.map((treatment) => {
      const selectedTreatment = selectedTreatments.find(
        (treat) => treat.id === treatment.id
      );
      return selectedTreatment
        ? {
            ...treatment,
            select: true,
          }
        : { ...treatment, select: false };
    });
  }, [allTreatments, selectedTreatments]);

  useEffect(() => {
    if (!user || !token || mainId !== undefined) return;
    const fetchAllCarePlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/careplan/practiceid/${user?.practiceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.join() !== allCarePlans.join()) {
          setAllCarePlans(response.data); // Only set state if the data is different
        }

        //fetch default phaseid
      } catch (err) {
        console.log("Error fetching all phases:", err);
      }
    };

    fetchAllCarePlans();
  }, [token, allCarePlans, user, mainId]);

  useEffect(() => {
    if (!user || !token) return;
    const fetchAllPhases = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/phase/securitytype/${user?.securityType}/practiceid/${user?.practiceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.join() !== allPhases.join()) {
          setAllPhases(response.data); // Only set state if the data is different
        }

        //fetch default phaseid
        const response1 = await axios.get(
          `${process.env.REACT_APP_API_URL}/practice/${user?.practiceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = response1.data;
        setDefaultPhaseID(
          result.phasedefaults
            ?.split(",")
            .map((id) => id.trim()) // Trim spaces
            .filter((id) => id !== "") // Remove empty values
            .map(Number) // Convert to numbers
        );
      } catch (err) {
        console.log("Error fetching all phases:", err);
      }
    };

    fetchAllPhases();
  }, [token, allPhases, user, mainId]);

  useEffect(() => {
    const filteredPhases = allPhases.filter((phase) =>
      defaultPhaseID.some((id) => id === phase.id)
    );
    setDefaultPhases(filteredPhases);
  }, [defaultPhaseID, allPhases]);

  useEffect(() => {
    setCurrentCareplanData({
      phasesData: currentPhases || [],
      treatmentsData: selectedTreatments || [],
    });
  }, [currentPhases, selectedTreatments]);

  useEffect(() => {
    if (
      !user ||
      !token ||
      mainId !== "new-plan" ||
      careId === undefined ||
      subId === undefined
    ) {
      return;
    }
    setSelectedTreatments([]);
    setOpenPhaseSection(false);
    setValue("careplanName", "");
    setCurrentPhases(defaultPhases);
    const fetchAllTreatments = async () => {
      try {
        const treatmentResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/treatment/securitytype/${user.securityType}/practiceid/${user.practiceId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const treatmentData = treatmentResponse.data;

        const conditionResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/condition/area/${careId}/acondition/${subId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const treatmentList = `,${conditionResponse.data.treatmentlist},`;
        setConditionID(conditionResponse.data.id);

        // Filter treatments matching the IDs in treatmentList
        const matchingTreatments = treatmentData.filter((treatment) =>
          treatmentList.includes(`,${treatment.id},`)
        );

        setAllTreatments((prev) => {
          if (prev.join() !== matchingTreatments.join()) {
            return matchingTreatments;
          }
          return prev;
        });
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchAllTreatments();
  }, [token, user, mainId, careId, subId, setValue, defaultPhases]);

  useEffect(() => {
    if ((careId !== "modify" && careId !== "copy") || !user || !token) return;
    setOpenPhaseSection(false);
    const fetchCarePlanByID = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/careplan/${mainId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setValue("careplanName", response.data.careplanname);
        if (careId === "copy")
          setValue("careplanName", `Copy of ${response.data.careplanname}`);
        const phasesOrder = response.data.phaseorder;

        const planphaseResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/planphase/practiceid/${user?.practiceId}/careplanid/${mainId}`,
          { phaseids: phasesOrder },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("PlanPhasesResponse", planphaseResponse.data);
        setCurrentPhases(planphaseResponse.data);

        const plantreatmentResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/plantreatment/practiceid/${user?.practiceId}/careplanid/${mainId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("PlanTreatmentPhases", plantreatmentResponse.data);
        setSelectedTreatments(plantreatmentResponse.data);

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/careplan/${mainId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const conditionIDs = res.data.conditions;
        const conditionID = conditionIDs.split(",").filter(Boolean).map(Number);

        const conditionResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/condition/${conditionID[0]}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const treatmentList = `,${conditionResponse.data.treatmentlist},`;

        const treatmentResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/treatment/securitytype/${user.securityType}/practiceid/${user.practiceId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const treatmentData = treatmentResponse.data;
        // Filter treatments matching the IDs in treatmentList
        const matchingTreatments = treatmentData.filter((treatment) =>
          treatmentList.includes(`,${treatment.id},`)
        );

        setAllTreatments((prev) => {
          if (prev.join() !== matchingTreatments.join()) {
            return matchingTreatments;
          }
          return prev;
        });
      } catch (error) {
        console.log("Error Fetch CarePlan", error);
      }
    };
    fetchCarePlanByID();
  }, [token, careId, setValue, allPhases, user, mainId]);

  const handleCarePlanClicked = () => {
    // setSendWithExerciseDialogOpen(true);
  };

  const handleDeleteCarePlan = (id) => {
    // Remove the deleted protocol from the local state
    setAllCarePlans((prevCarePlans) =>
      prevCarePlans.filter((careplan) => careplan.id !== id)
    );
  };

  const sendUpdatedPhases = async (updatedPhases) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/practice/${user?.practiceId}`,
        { phasedefaults: updatedPhases },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating default phases:", error);
    }
  };

  const handleChangePhases = () => {
    setOpenPhaseSection(!openPhaseSection);
  };

  const handleDeselectTreatment = (id) => {
    setSelectedTreatments((prevSelected) =>
      prevSelected.filter((treatment) => treatment.id !== id)
    );
  };

  const handleAddToSelectedTreatment = (id) => {
    const treatmentToAdd = allTreatments.find(
      (treatment) => treatment.id === id
    );

    // If the treatment exists and it's not already in selectedTreatments, add it
    if (
      treatmentToAdd &&
      !selectedTreatments.some((treatment) => treatment.id === id)
    ) {
      setSelectedTreatments((prevSelected) => [
        ...prevSelected,
        treatmentToAdd,
      ]);
    }
  };

  const handleAddToSelectedPhase = (id) => {
    const newSelected = [
      ...currentPhases,
      {
        ...allPhases.find((phase) => phase.id === id),
      },
    ];
    setCurrentPhases(newSelected);
  };

  const handleDeselectPhase = (id) => {
    setCurrentPhases(currentPhases.filter((phase) => phase.id !== id));
  };

  const onSubmit = async (data) => {
    try {
      //CarePlan Response
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/careplan`,
        {
          practiceid: user?.practiceId,
          conditions: `,${conditionID}`,
          careplanname: data.careplanName,
          repeattime: "",
          duration: "",
          active: "",
          phaseorder: currentPhases.map((phase) => phase.id).join(",") + ",",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newCarePlan = response.data;

      //phaseResponse
      await axios.post(
        `${process.env.REACT_APP_API_URL}/planphase`,
        {
          practiceid: user?.practiceId,
          careplanid: newCarePlan.id,
          phases: currentPhases,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //treatmentResponse
      await axios.post(
        `${process.env.REACT_APP_API_URL}/plantreatment`,
        {
          practiceid: user?.practiceId,
          careplanid: newCarePlan.id,
          treatments: selectedTreatments,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar("Successfully Created!", { variant: "success" });

      setAllCarePlans((prevPhases) =>
        [...prevPhases, newCarePlan].sort((a, b) =>
          a.careplanname.localeCompare(b.careplanname)
        )
      );
      navigate("/care-plan");
    } catch (error) {
      console.error("Error creating careplan:", error);
      enqueueSnackbar("Error creating careplan!", { variant: "error" });
    }
  };

  const onSaveCarePlan = async (data) => {
    try {
      //CarePlan Response
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/careplan/${mainId}`,
        {
          practiceid: user?.practiceId,
          conditions: `,${conditionID}`,
          careplanname: data.careplanName,
          repeattime: "",
          duration: "",
          active: "",
          phaseorder: currentPhases.map((phase) => phase.id).join(",") + ",",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newCarePlan = response.data;

      //phaseResponse
      await axios.post(
        `${process.env.REACT_APP_API_URL}/planphase/bulkedit`,
        {
          practiceid: user?.practiceId,
          careplanid: newCarePlan.id,
          phases: currentPhases,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //treatmentResponse
      await axios.post(
        `${process.env.REACT_APP_API_URL}/plantreatment/bulkedit`,
        {
          practiceid: user?.practiceId,
          careplanid: newCarePlan.id,
          treatments: selectedTreatments,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar("Successfully Changed!", { variant: "success" });

      setAllCarePlans((prevPhases) =>
        [...prevPhases, newCarePlan].sort((a, b) =>
          a.careplanname.localeCompare(b.careplanname)
        )
      );
      navigate("/care-plan");
    } catch (error) {
      console.error("Error creating careplan:", error);
      enqueueSnackbar("Error creating careplan!", { variant: "error" });
    }
  };

  const addPhaseBtnClicked = () => {
    setPhaseActionType("add");
    setPhaseToEdit({
      name: "",
      description: "",
      frequency: "",
      duration: "",
      active: "",
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
      });
      setPhaseDialogOpen(true);
    }
  };

  const handleEditCurrentClicked = (id) => {
    setPhaseActionType("current-edit");
    const phaseToCopy = currentPhases.find((phase) => phase.id === id);
    if (phaseToCopy) {
      setPhaseToEdit({ ...phaseToCopy });
      setPhaseDialogOpen(true);
    }
  };

  const handleEditClicked = (id) => {
    setPhaseActionType("edit");
    const phaseToCopy = allPhases.find((phase) => phase.id === id);
    if (phaseToCopy) {
      setPhaseToEdit({
        ...phaseToCopy,
      });
      setPhaseDialogOpen(true);
    }
  };

  const handleRemoveClicked = (id) => {
    setDefaultPhases((prevPhases) => {
      const updatedPhases = prevPhases.filter((phase) => phase.id !== id);

      // Prepare the updated phase IDs as a comma-separated string
      const phaseIdsString =
        updatedPhases.map((phase) => phase.id).join(",") + ",";

      // Make API call to update the backend
      sendUpdatedPhases(phaseIdsString);

      return updatedPhases;
    });
  };

  const handleSetDefault = async (id) => {
    // Update the state first
    setDefaultPhases((prevPhases) => {
      const newPhase = allPhases.find((phase) => phase.id === id);
      const alreadyExists = prevPhases.some((phase) => phase.id === id);

      // Only add if it doesn't exist
      const updatedPhases =
        newPhase && !alreadyExists ? [...prevPhases, newPhase] : prevPhases;

      const phaseIdsString =
        updatedPhases.map((phase) => phase.id).join(",") + ",";

      sendUpdatedPhases(phaseIdsString);

      return updatedPhases;
    });
  };

  const handleCopyNewPhase = async (updatedPhase) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/phase`,
        {
          practiceid: user?.practiceId,
          name: updatedPhase.name,
          description: updatedPhase.description,
          repeattime: updatedPhase.repeattime,
          duration: updatedPhase.duration,
          active: updatedPhase.active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Successfully Copied!", { variant: "success" });
      const newID = response.data.id;
      setAllPhases((prevPhases) =>
        [
          ...prevPhases,
          {
            ...updatedPhase,
            id: newID,
          },
        ].sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (error) {
      console.error("Error adding default phases:", error);
    }
    setPhaseDialogOpen(false);
  };

  const handleEditPhase = (editPhase) => {
    setAllPhases((prevPhases) =>
      prevPhases.map((phase) => (phase.id === editPhase.id ? editPhase : phase))
    );
    setPhaseDialogOpen(false);
  };

  const handleEditCurrentPhase = (editPhase) => {
    console.log("edited", editPhase);
    setCurrentPhases((prevPhases) =>
      prevPhases.map((phase) => (phase.id === editPhase.id ? editPhase : phase))
    );
    setPhaseDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setPhaseDialogOpen(false);
    setPhaseToEdit(null);
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
                {allCarePlans.map((careplan, index) => (
                  <CarePlanItem
                    key={index}
                    {...careplan}
                    onClick={handleCarePlanClicked}
                    onDelete={handleDeleteCarePlan}
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
                {defaultPhases.map((phase, index) => (
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
                  {areas.map((carearea, index) => (
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
                      {selectedCondition.map((condition, index) => (
                        <CareSubAreaItem key={index} condition={condition} />
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
                        {`Create Care Plan for ${careId} ${subId}`}
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
                        {openPhaseSection
                          ? "Selected Phases"
                          : "Current Phases"}
                      </Typography>

                      <Button
                        variant="contained"
                        startIcon={
                          openPhaseSection ? (
                            <SaveOutlinedIcon
                              style={{ fontSize: 28, marginRight: 8 }}
                            />
                          ) : (
                            <ChangeCircleOutlinedIcon
                              style={{ fontSize: 28, marginRight: 8 }}
                            />
                          )
                        }
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "20px",
                          width: "250px",
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
                        {openPhaseSection ? "Save Changes" : "Change Phases"}
                      </Button>
                    </Box>
                    {openPhaseSection ? (
                      <Box
                        display="grid"
                        gridTemplateColumns="repeat(3, 1fr)"
                        gap={4}
                        mb={8}
                      >
                        {currentPhases.map((phase, index) => (
                          <SelectedPhaseItem
                            key={index}
                            {...phase}
                            onRemove={handleDeselectPhase}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Box
                        display="grid"
                        gridTemplateColumns="repeat(3, 1fr)"
                        gap={4}
                        mb={8}
                      >
                        {currentPhases.map((phase, index) => (
                          <CurrentPhaseItem
                            key={index}
                            {...phase}
                            onEdit={handleEditCurrentClicked}
                          />
                        ))}
                      </Box>
                    )}
                    {openPhaseSection && (
                      <>
                        <Typography
                          sx={{
                            fontSize: "28px",
                            fontWeight: 500,
                            color: darkMode
                              ? getColors.drawerTextDark
                              : getColors.thumbnailTextLight,
                            textAlign: "left",
                            mb: "30px",
                          }}
                        >
                          Available Phases
                        </Typography>
                        <Box
                          display="grid"
                          gridTemplateColumns="repeat(3, 1fr)"
                          gap={4}
                          mb={8}
                        >
                          {allPhases
                            .filter(
                              (phase) =>
                                !currentPhases.some(
                                  (currentPhase) => currentPhase.id === phase.id
                                )
                            ) // Filter out phases that already exist in currentPhases
                            .map((phase, index) => (
                              <AvailablePhaseItem
                                key={index}
                                {...phase}
                                onAdd={handleAddToSelectedPhase}
                              />
                            ))}
                        </Box>
                      </>
                    )}
                    {!openPhaseSection && (
                      <>
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
                          {selectedTreatments.map((treatment, index) => (
                            <SelectedTreatmentItem
                              key={index}
                              {...treatment}
                              onRemove={handleDeselectTreatment}
                              onChange={(value) => {
                                const clone = [...selectedTreatments];
                                const treatmentIdx = clone.findIndex(
                                  (exer) => exer.id === value.id
                                );
                                clone[treatmentIdx] = {
                                  ...value,
                                };
                                setSelectedTreatments(clone);
                              }}
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
                          {renderingTreatments
                            .filter((treatment) => treatment.select === false) // Filter out treatments where select is false
                            .map((treatment, index) => (
                              <AvailableTreatmentItem
                                key={index}
                                {...treatment}
                                onAdd={handleAddToSelectedTreatment}
                              />
                            ))}
                        </Box>
                      </>
                    )}
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
                    {openPhaseSection ? "Selected Phases" : "Current Phases"}
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={
                      openPhaseSection ? (
                        <SaveOutlinedIcon
                          style={{ fontSize: 28, marginRight: 8 }}
                        />
                      ) : (
                        <ChangeCircleOutlinedIcon
                          style={{ fontSize: 28, marginRight: 8 }}
                        />
                      )
                    }
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      width: "250px",
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
                    {openPhaseSection ? "Save Changes" : "Change Phases"}
                  </Button>
                </Box>
                {openPhaseSection ? (
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={4}
                    mb={8}
                  >
                    {currentPhases.map((phase, index) => (
                      <SelectedPhaseItem
                        key={index}
                        {...phase}
                        onRemove={handleDeselectPhase}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={4}
                    mb={8}
                  >
                    {currentPhases.map((phase, index) => (
                      <CurrentPhaseItem
                        key={index}
                        {...phase}
                        onEdit={handleEditCurrentClicked}
                      />
                    ))}
                  </Box>
                )}
                {openPhaseSection && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "28px",
                        fontWeight: 500,
                        color: darkMode
                          ? getColors.drawerTextDark
                          : getColors.thumbnailTextLight,
                        textAlign: "left",
                        mb: "30px",
                      }}
                    >
                      Available Phases
                    </Typography>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 1fr)"
                      gap={4}
                      mb={8}
                    >
                      {allPhases.map((phase, index) => (
                        <AvailablePhaseItem
                          key={index}
                          {...phase}
                          onAdd={handleAddToSelectedPhase}
                        />
                      ))}
                    </Box>
                  </>
                )}
                {!openPhaseSection && (
                  <>
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
                      {selectedTreatments.map((treatment, index) => (
                        <SelectedTreatmentItem
                          key={index}
                          {...treatment}
                          onRemove={handleDeselectTreatment}
                          onChange={(value) => {
                            const clone = [...selectedTreatments];
                            const treatmentIdx = clone.findIndex(
                              (exer) => exer.id === value.id
                            );
                            clone[treatmentIdx] = {
                              ...value,
                            };
                            setSelectedTreatments(clone);
                          }}
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
                      {renderingTreatments
                        .filter((treatment) => treatment.select === false) // Filter out treatments where select is false
                        .map((treatment, index) => (
                          <AvailableTreatmentItem
                            key={index}
                            {...treatment}
                            onAdd={handleAddToSelectedTreatment}
                          />
                        ))}
                    </Box>
                  </>
                )}
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
                    {openPhaseSection ? "Selected Phases" : "Current Phases"}
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={
                      openPhaseSection ? (
                        <SaveOutlinedIcon
                          style={{ fontSize: 28, marginRight: 8 }}
                        />
                      ) : (
                        <ChangeCircleOutlinedIcon
                          style={{ fontSize: 28, marginRight: 8 }}
                        />
                      )
                    }
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      width: "250px",
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
                    {openPhaseSection ? "Save Changes" : "Change Phases"}
                  </Button>
                </Box>
                {openPhaseSection ? (
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={4}
                    mb={8}
                  >
                    {currentPhases.map((phase, index) => (
                      <SelectedPhaseItem
                        key={index}
                        {...phase}
                        onRemove={handleDeselectPhase}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={4}
                    mb={8}
                  >
                    {currentPhases.map((phase, index) => (
                      <CurrentPhaseItem
                        key={index}
                        {...phase}
                        onEdit={handleEditCurrentClicked}
                      />
                    ))}
                  </Box>
                )}
                {openPhaseSection && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "28px",
                        fontWeight: 500,
                        color: darkMode
                          ? getColors.drawerTextDark
                          : getColors.thumbnailTextLight,
                        textAlign: "left",
                        mb: "30px",
                      }}
                    >
                      Available Phases
                    </Typography>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 1fr)"
                      gap={4}
                      mb={8}
                    >
                      {allPhases.map((phase, index) => (
                        <AvailablePhaseItem
                          key={index}
                          {...phase}
                          onAdd={handleAddToSelectedPhase}
                        />
                      ))}
                    </Box>
                  </>
                )}
                {!openPhaseSection && (
                  <>
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
                      {selectedTreatments.map((treatment, index) => (
                        <SelectedTreatmentItem
                          key={index}
                          {...treatment}
                          onRemove={handleDeselectTreatment}
                          onChange={(value) => {
                            const clone = [...selectedTreatments];
                            const treatmentIdx = clone.findIndex(
                              (exer) => exer.id === value.id
                            );
                            clone[treatmentIdx] = {
                              ...value,
                            };
                            setSelectedTreatments(clone);
                          }}
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
                      {renderingTreatments
                        .filter((treatment) => treatment.select === false) // Filter out treatments where select is false
                        .map((treatment, index) => (
                          <AvailableTreatmentItem
                            key={index}
                            {...treatment}
                            onAdd={handleAddToSelectedTreatment}
                          />
                        ))}
                    </Box>
                  </>
                )}
              </Box>
            ))}
        </>
      </Box>

      <SendDialog
        open={sendDialogOpen}
        setOpen={setSendDialogOpen}
        careplanData={currentCareplanData}
      />

      <SendWithExerciseDialog
        open={sendWithExerciseDialogOpen}
        setOpen={setSendWithExerciseDialogOpen}
      />

      <PhaseDialog
        open={phaseDialogOpen}
        onClose={handleCloseDialog}
        phaseData={phaseToEdit}
        onCopy={handleCopyNewPhase}
        onEdit={handleEditPhase}
        onCurrentEdit={handleEditCurrentPhase}
        actionType={phaseActionType}
      />
    </Box>
  );
};

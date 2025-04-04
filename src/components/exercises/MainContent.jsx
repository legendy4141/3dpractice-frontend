import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { EBPProtocolItem } from "./EBPProtocolItem";
import { CustomProtocolItem } from "./CustomProtocolItem";
import { useForm } from "react-hook-form";
import { SelectedExerciseItem } from "./SelectedExerciseItem";
import { AvailableExerciseItem } from "./AvailableExerciseItem";
import axios from "axios";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";
import { enqueueSnackbar } from "notistack";

export const MainContent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { protocolName: "" },
  });

  const { mainId, subId, protocolId } = useParams();
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [allExercises, setAllExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { user, token } = useAuthContext();
  const [allEBProtocols, setAllEBProtocols] = useState([]);
  const [conditionID, setConditionID] = useState();
  const [exerciseIDList, setExerciseIDList] = useState([]);
  const [customProtocols, setCustomProtocols] = useState([]);

  const renderingExercises = useMemo(() => {
    return allExercises.map((exercise) => {
      const selectedExercise = selectedExercises.find(
        (exer) => exer.exerciseid === exercise.id
      );
      return selectedExercise
        ? {
            ...exercise,
            instructions: selectedExercise.instructions,
            hold: selectedExercise.hold,
            repeat: selectedExercise.repeat,
            timesperday: selectedExercise.timesperday,
            range: selectedExercise.range,
            resistance: selectedExercise.resistance,
            direction: selectedExercise.direction,
            select: true,
          }
        : { ...exercise, select: false };
    });
  }, [allExercises, selectedExercises]);

  useEffect(() => {
    const fetchAllEBProtocols = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ebprotocol`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.join() !== allEBProtocols.join()) {
          setAllEBProtocols(response.data); // Only set state if the data is different
        }
      } catch (err) {
        console.log("Error fetching EB protocols:", err);
      }
    };

    if (token) {
      fetchAllEBProtocols();
    }
  }, [token, allEBProtocols]); // Dependency on token and allEBProtocols to avoid redundant API calls

  // Fetch condition ID if mainId and subId are present

  useEffect(() => {
    if (mainId && subId) {
      const fetchConditionID = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/condition/getid`,
            {
              area: mainId,
              acondition: subId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setConditionID(response.data);
        } catch (err) {
          console.log("Error fetching condition ID:", err);
        }
      };
      fetchConditionID();
    }
  }, [mainId, subId, protocolId, token]); // Only call when mainId, subId, or protocolId changes

  useEffect(() => {
    if (conditionID) {
      const fetchCustomProtocols = async () => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/protocol/getwithIdNcondition`,
            {
              practiceID: user?.practiceId,
              conditionID: conditionID,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCustomProtocols(res.data);
        } catch (err) {
          console.log("Error fetching condition ID:", err);
        }
      };

      fetchCustomProtocols();
    }
  }, [conditionID, token, user]);

  // Fetch Exercise IDs if protocolId is "new"
  useEffect(() => {
    if (protocolId !== undefined && mainId && subId) {
      const fetchExerciseIDs = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/condition/getexercises`,
            {
              area: mainId,
              acondition: subId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const dataArray = response.data.split(",").map(Number);
          setExerciseIDList(dataArray.slice(1)); // Avoid setting empty or incorrect data
          setValue("protocolName", "");
        } catch (err) {
          console.log("Error fetching exercise IDs:", err);
        }
      };
      fetchExerciseIDs();
    }
  }, [protocolId, mainId, subId, token, setValue]); // Trigger only when protocolId, mainId, or subId changes

  // Fetch exercises based on exercise IDs
  useEffect(() => {
    if (exerciseIDList.length > 0) {
      const fetchExercises = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/exercise/getexercises`,
            {
              ids: exerciseIDList,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAllExercises(response.data);
        } catch (err) {
          console.log("Error fetching exercises:", err);
        }
      };
      fetchExercises();
    }
  }, [exerciseIDList, token]); // Fet

  useEffect(() => {
    if (
      protocolId !== undefined &&
      protocolId !== "new" &&
      mainId &&
      subId &&
      user
    ) {
      const fetchSelectedExerciseIDs = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/protexercise/getByPracIDnProtID`,
            {
              practiceid: user?.practiceId,
              protocolid: protocolId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSelectedExercises(response.data);
        } catch (err) {
          console.log("Error fetching exercise IDs:", err);
        }
      };
      fetchSelectedExerciseIDs();

      const selectedProtocol = customProtocols?.find(
        (customProtocol) => customProtocol.id.toString() === protocolId
      );

      selectedProtocol &&
        setValue("protocolName", selectedProtocol.protocolname);
    }
  }, [
    protocolId,
    mainId,
    subId,
    token,
    user,
    customProtocols,
    allExercises,
    setValue,
  ]);

  useEffect(() => {
    setSelectedExercises([]);
  }, [protocolId]);

  const getProtocolNamesByCondition = (conditionID) => {
    const result = [];

    if (!conditionID) return result;

    allEBProtocols.forEach((protocol) => {
      const conditionsArray = protocol.conditions.split(",");
      if (conditionsArray.includes(conditionID.toString())) {
        result.push(protocol);
      }
    });

    return result;
  };

  const ebProtocols = getProtocolNamesByCondition(conditionID);

  const handleAddToSelected = (id) => {
    const newSelected = [
      ...selectedExercises,
      {
        ...allExercises.find((exerc) => exerc.id === id),
        exerciseid: id,
      },
    ];
    setSelectedExercises(newSelected);
  };

  const handleDeselect = (id) => {
    setSelectedExercises(
      selectedExercises.filter((exerc) => exerc.exerciseid !== id)
    );
  };

  //-------------------style------------------------------------

  const submitButtonStyles = {
    height: 64,
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: "Poppins",
    px: 8,
    py: 2,
    borderRadius: "5px",
  };

  const reportButtonStyles = {
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: "Poppins",
    px: 5,
    py: "10px",
    borderRadius: "5px",
  };

  const protocolsBoxStyles = { mt: "40px", mx: "60px" };

  const protocolTitleStyles = {
    fontFamily: "Poppins",
    fontSize: "28px",
    color: darkMode ? getColors.drawerTextDark : getColors.thumbnailTextLight,
    fontWeight: 600,
    textAlign: "left",
  };

  const newProtocolButtonStyles = {
    fontFamily: "Poppins",
    fontSize: "20px",
    px: "16px",
    py: "12px",
    background: darkMode ? "#2D2E30" : "#E6E6E6",
    color: darkMode ? getColors.primaryTextDark : getColors.secondaryTextLight,
    "&:hover": {
      color: getColors.primaryTextDark,
    },
  };

  const NoSelectionMessage = ({ message, description }) => (
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
        {message}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          color: theme.palette.text.secondary,
          mt: "10px",
          textAlign: "center",
        }}
      >
        {description}
      </Typography>
    </Box>
  );

  const titleStyles = {
    fontSize: "22px",
    fontWeight: 600,
    color: darkMode ? getColors.drawerTextDark : getColors.thumbnailTextLight,
    textAlign: "left",
  };

  const formBoxStyles = {
    padding: "20px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: darkMode
      ? getColors.appBarBorderDark
      : getColors.appBarBorderLight,
    gap: 4,
    mb: 8,
  };

  const sectionTitleStyles = {
    fontSize: "22px",
    fontWeight: 600,
    color: darkMode ? getColors.drawerTextDark : getColors.thumbnailTextLight,
    textAlign: "left",
    mb: 3,
  };

  const handleNewProtocolClicked = () =>
    navigate(`/exercise/${mainId}/${subId}/new`);

  const onAddProtocol = async (data) => {
    if (protocolId === "new") {
      let protocol;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/protocol`,
          {
            protocolname: data.protocolName,
            practiceid: user.practiceId,
            conditions: conditionID && `,${conditionID}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        protocol = response.data;
        setCustomProtocols((prevProtocols) => [...prevProtocols, protocol]);
      } catch (err) {
        console.log("Error adding protocol:", err);
        enqueueSnackbar("Error adding protocol", { variant: "error" });
        return;
      }

      if (protocol) {
        const selectedExercises = renderingExercises
          .filter((exercise) => exercise.select === true)
          .map((exercise) => {
            const randomKey = Math.floor(10000000 + Math.random() * 90000000);

            return {
              practiceid: user.practiceId,
              protocolid: protocol?.id,
              conditionid: 0,
              exerciseid: exercise.id,
              instructions: exercise.instructions,
              hold: exercise.hold,
              repeat: exercise.repeat,
              timesperday: exercise.timesperday,
              range: exercise.range,
              resistance: exercise.resistance,
              direction: exercise.direction,
              randomkey: randomKey,
            };
          });

        try {
          await axios.post(
            `${process.env.REACT_APP_API_URL}/protexercise/bulk-create`,
            selectedExercises,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          enqueueSnackbar("Successfully Added!", { variant: "success" });
          navigate(`/exercise/${mainId}/${subId}`);
        } catch (err) {
          console.log("Error adding protocol:", err);
          enqueueSnackbar("Error adding protocol", { variant: "error" });
        }
      }
    } else {
      let protocol;
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/protocol/${protocolId}`,
          {
            protocolname: data.protocolName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        protocol = response.data;
        setCustomProtocols((prevProtocols) =>
          prevProtocols.map((prevProtocol) =>
            prevProtocol.id === protocol.id ? protocol : prevProtocol
          )
        );
      } catch (err) {
        console.log("Error updating protocol:", err);
        enqueueSnackbar("Error updating protocol", { variant: "error" });
        return;
      }

      if (protocol) {
        const temp = renderingExercises.filter((exercise) => exercise.select);
        const selected = temp.map((exercise, index) => {
          return {
            exerciseid: exercise.id,
            instructions: exercise.instructions,
            hold: exercise.hold,
            repeat: exercise.repeat,
            timesperday: exercise.timesperday,
            range: exercise.range,
            resistance: exercise.resistance,
            direction: exercise.direction,
          };
        });

        try {
          await axios.post(
            `${process.env.REACT_APP_API_URL}/protexercise/bulk-edit`,
            {
              practiceid: user?.practiceId,
              protocolid: parseInt(protocolId, 10),
              selected,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          enqueueSnackbar("Successfully Changed!", { variant: "success" });
          navigate(`/exercise/${mainId}/${subId}`);
        } catch (err) {
          console.log("Error changing protocol:", err);
          enqueueSnackbar("Error changing protocol", { variant: "error" });
        }
      }
    }
  };

  const handleDeleteProtocol = (id) => {
    // Remove the deleted protocol from the local state
    setCustomProtocols((prevProtocols) =>
      prevProtocols.filter((protocol) => protocol.id !== id)
    );
  };

  const handleCopyProtocol = (protocol) => {
    setCustomProtocols((prevProtocols) => [...prevProtocols, protocol]);
  };
  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      {protocolId ? (
        <Box sx={{ padding: 5 }}>
          <Box sx={{ mb: 5 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Typography sx={titleStyles}>
                {protocolId === "new" ? "Add Protocol" : "Edit Protocol"}
              </Typography>
              <Button
                variant="contained"
                sx={reportButtonStyles}
                onClick={() => alert("Report")}
              >
                Report
              </Button>
            </Box>
            <form onSubmit={handleSubmit(onAddProtocol)}>
              <Box display="flex" sx={formBoxStyles}>
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
                  sx={submitButtonStyles}
                >
                  {protocolId === "new" ? "Add" : "Save"}
                </Button>
              </Box>
            </form>
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography sx={sectionTitleStyles}>
              {" "}
              Selected Exercises{" "}
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
              {renderingExercises
                .filter((exercise) => exercise.select)
                .map((exercise, index) => (
                  <SelectedExerciseItem
                    key={index}
                    {...exercise}
                    onRemove={handleDeselect}
                    onChange={(value) => {
                      const clone = [...selectedExercises];
                      const exerciseIdx = clone.findIndex(
                        (exer) => exer.exerciseid === value.id
                      );
                      clone[exerciseIdx] = {
                        ...value,
                        exerciseid: value.id,
                      };
                      setSelectedExercises(clone);
                    }}
                  />
                ))}
            </Box>
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography sx={sectionTitleStyles}>
              {" "}
              Available Exercises{" "}
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
              {renderingExercises
                .filter((exercise) => !exercise.select)
                .map((exercise, index) => (
                  <AvailableExerciseItem
                    key={index}
                    {...exercise}
                    onAdd={handleAddToSelected}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      ) : !mainId ? (
        <NoSelectionMessage
          message="No Protocol Area selected."
          description="Please choose a body region from the left panel to view relevant exercises."
        />
      ) : !subId ? (
        <NoSelectionMessage
          message="No condition selected."
          description="Please choose an option from the list to view detailed exercises."
        />
      ) : (
        <Box sx={protocolsBoxStyles}>
          <Typography sx={protocolTitleStyles}>
            Exercise Protocols for {subId}
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            columnGap={5}
            sx={{ mb: 3 }}
          >
            {customProtocols.map((protocol, index) => (
              <CustomProtocolItem
                key={index}
                {...protocol}
                onCopy={handleCopyProtocol}
                onDelete={handleDeleteProtocol}
              />
            ))}
            {ebProtocols.map((ebprotocol, index) => (
              <EBPProtocolItem key={index} {...ebprotocol} />
            ))}
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={newProtocolButtonStyles}
            onClick={handleNewProtocolClicked}
          >
            New Exercise Protocol
          </Button>
        </Box>
      )}
    </Box>
  );
};

import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { getColors } from "../../themes/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { Add } from "@mui/icons-material";

export const AvailableExerciseItem = ({
  id,
  name,
  bmname,
  hold,
  repeat,
  timesperday,
  onAdd,
}) => {
  const img = require(`../../assets/exercise/${bmname}.png`);
  const { darkMode } = useContext(ThemeContext);

  const handleClick = () => {
    onAdd(id);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "475px",
        height: "120px",
        padding: 1,
        borderRadius: "5px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: darkMode
          ? getColors.thumbnailBorderDark
          : getColors.thumbnailBorderLight,
        background: darkMode
          ? getColors.thumbnnailBgDark
          : getColors.thumbnnailBgLight,
        cursor: "pointer",
        "&:hover": {
          borderColor: darkMode
            ? getColors.thumbnailTextDark
            : getColors.thumbnailTextLight,
        },
      }}
      onClick={handleClick} // Move the onClick handler here
    >
      <Box>
        <Box display={"flex"} alignItems={"center"}>
          <img src={img} alt="img" style={{ width: "100px", height: "75px" }} />
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              color: darkMode
                ? getColors.drawerTextDark
                : getColors.thumbnailTextLight,
              ml: "20px",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box display={"flex"}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: darkMode
                ? getColors.drawerTextDark
                : getColors.thumbnailTextLight,
              ml: "15px",
            }}
          >
            {`Hold=${hold}`}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: darkMode
                ? getColors.drawerTextDark
                : getColors.thumbnailTextLight,
              mx: "20px",
            }}
          >
            {`Repeat=${repeat}`}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: darkMode
                ? getColors.drawerTextDark
                : getColors.thumbnailTextLight,
            }}
          >
            {`PerDay=${timesperday}`}
          </Typography>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        width="max-content"
        sx={{
          borderRadius: "50%",
          padding: "20px",
          color: "#009903",
          bgcolor: "#EAFFEF",
          alignItems: "center",
          "&:hover": {
            color: "green",
          },
          ml: 4,
          mr: 2,
        }}
      >
        <Add sx={{ fontSize: "30px" }} />
      </Box>
    </Box>
  );
};

import React, { useContext } from "react";
import { Box, ListItem, ListItemText } from "@mui/material";
import { getColors } from "../../themes/theme";
import { useNavigate, useParams } from "react-router-dom";
import { exerciseData } from "../../utils/exerciseData";
import { ThemeContext } from "../../context/ThemeContext";

export const SubList = () => {
  const { mainId, subId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const selectedSubItems =
    exerciseData.find((item) => item.id === mainId)?.subItems || [];

  const handleSubItemClick = (subId) => {
    navigate(`/exercise/${mainId}/${subId}`);
  };

  return (
    <>
      {!!selectedSubItems.length && (
        <Box
          sx={{
            width: "300px",
            px: "20px",
            pt: 2,
            borderRight: `1px solid ${
              darkMode
                ? getColors.appBarBorderDark
                : getColors.appBarBorderLight
            }`,
          }}
        >
          {selectedSubItems.map((subItem, index) => (
            <ListItem
              key={index}
              onClick={() => handleSubItemClick(subItem.id)}
              sx={{
                fontSize: "22px",
                px: "28px",
                py: "14px",
                mb: 1,
                background:
                  subId === subItem.id
                    ? getColors.listItemHoverBg
                    : "transparent",
              }}
            >
              <ListItemText
                primary={subItem.title}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: subId === subItem.id && getColors.primaryTextDark,
                  },
                }}
              />
            </ListItem>
          ))}
        </Box>
      )}
    </>
  );
};

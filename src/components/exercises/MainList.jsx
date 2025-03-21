import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { getColors } from "../../themes/theme";
import { exerciseData } from "../../utils/exerciseData";
import { useNavigate, useParams } from "react-router-dom";

export const MainList = () => {
  const { mainId } = useParams();
  const navigate = useNavigate();
  const handleItemClick = (selectedId) => {
    navigate(`/exercise/${selectedId}`);
  };
  return (
    <>
      {exerciseData.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => handleItemClick(item.id)}
          sx={{
            fontSize: "22px",
            width: "220px",
            mb: 1,
            px: "28px",
            py: "14px",
            background:
              mainId === item.id ? getColors.listItemHoverBg : "transparent",
          }}
        >
          <ListItemText
            primary={item.title}
            sx={{
              "& .MuiListItemText-primary": {
                color: mainId === item.id && getColors.primaryTextDark,
              },
            }}
          />
        </ListItem>
      ))}
    </>
  );
};

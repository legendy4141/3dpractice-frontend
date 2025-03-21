import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getColors } from "../../themes/theme";

export const MainList = () => {
  const { mainId } = useParams();
  const navigate = useNavigate();
  const handleItemClick = (selectedId) => {
    navigate(`/care-plan/${selectedId}`);
  };

  const careplanMenu = [
    {
      id: "default-phases",
      title: "Default Phases",
    },
    {
      id: "new-plan",
      title: "New Care Plan",
    },
  ];

  return (
    <>
      {careplanMenu.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => handleItemClick(item.id)}
          sx={{
            fontSize: "22px",
            width: "280px",
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

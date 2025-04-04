import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { getColors } from "../../themes/theme";
import { useNavigate, useParams } from "react-router-dom";
import { useProtocolData } from "../../hooks/protocoldata/useProtocolData";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";

export const MainList = () => {
  const { mainId } = useParams();
  const { token } = useAuthContext();
  const { areas } = useProtocolData(token);
  const navigate = useNavigate();

  const handleItemClick = (selectedId) => {
    navigate(`/exercise/${selectedId}`);
  };

  return (
    <>
      {areas.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => handleItemClick(item.area)}
          sx={{
            fontSize: "22px",
            width: "220px",
            mb: 1,
            px: "28px",
            py: "14px",
            background:
              mainId === item.area ? getColors.listItemHoverBg : "transparent",
          }}
        >
          <ListItemText
            primary={item.area}
            sx={{
              "& .MuiListItemText-primary": {
                color: mainId === item.area && getColors.primaryTextDark,
              },
            }}
          />
        </ListItem>
      ))}
    </>
  );
};

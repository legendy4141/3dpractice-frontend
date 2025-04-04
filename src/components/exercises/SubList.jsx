import React, { useContext } from "react";
import { Box, ListItem, ListItemText } from "@mui/material";
import { getColors } from "../../themes/theme";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useProtocolData } from "../../hooks/protocoldata/useProtocolData";
import { useAuthContext } from "../../hooks/contexts/useAuthContext";

export const SubList = () => {
  const { mainId, subId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { token } = useAuthContext();
  const { conditions } = useProtocolData(token);

  const handleSubItemClick = (subId) => {
    navigate(`/exercise/${mainId}/${subId}`);
  };

  const selectedSubItems = conditions[mainId] || [];

  return (
    <>
      <Box
        sx={{
          width: "300px",
          px: "20px",
          pt: 2,
          borderRight: `1px solid ${
            darkMode ? getColors.appBarBorderDark : getColors.appBarBorderLight
          }`,
        }}
      >
        {selectedSubItems.map((subItem, index) => (
          <ListItem
            key={index}
            onClick={() => handleSubItemClick(subItem)}
            sx={{
              fontSize: "22px",
              px: "28px",
              py: "14px",
              mb: 1,
              background:
                subId === subItem ? getColors.listItemHoverBg : "transparent",
            }}
          >
            <ListItemText
              primary={subItem}
              sx={{
                "& .MuiListItemText-primary": {
                  color: subId === subItem && getColors.primaryTextDark,
                },
              }}
            />
          </ListItem>
        ))}
      </Box>
    </>
  );
};

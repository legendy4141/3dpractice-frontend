import React, { useContext } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import Logo from "../../assets/logo/logo.svg";
import LogoDark from "../../assets/logo/logo_dark.svg";
import { menuItems } from "../../utils/menuItems";
import { getColors } from "../../themes/theme";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const currentSection = location.pathname.split("/")[1];

  return (
    <Drawer variant="permanent">
      <Box
        sx={{
          width: "210px",
          mx: "30px",
          mt: "45px",
          mb: "24px",
          cursor: "pointer",
        }}
      >
        <img
          src={darkMode ? LogoDark : Logo}
          alt="3D Practice Logo"
          onClick={() => navigate("/")}
        />
      </Box>
      <List sx={{ mx: "22px" }}>
        {menuItems.slice(1).map((item, index) => (
          <ListItem
            key={index}
            selected={currentSection === item.id}
            onClick={() => {
              if (item.id === "wall_art") {
                window.open(`/webgl/${item.route}`, "_blank");
              } else if (item.id === "videos") {
                navigate(item.route);
              } else if (item.id === "hip") {
                navigate(`${item.route}${item.route}/Hip`);
              } else if (item.id === "jaw") {
                navigate(`${item.route}${item.route}/Jaw`);
              } else {
                navigate(
                  item.id === "spine" ||
                    item.id === "nervous_system" ||
                    item.id === "treatments"
                    ? item.route
                    : `${item.route}${item.route}`
                );
              }
            }}
            sx={{
              fontSize: "20px",
              height: "52px",
              my: 1,
              background:
                currentSection === item.id
                  ? getColors.listItemHoverBg
                  : "transparent",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "40px",
                "&.MuiListItemIcon-root": {
                  "& svg": {
                    filter:
                      currentSection === item.id
                        ? "brightness(0) invert(1)"
                        : darkMode
                        ? "brightness(0.7) invert(1)"
                        : "none",
                  },
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiListItemText-primary": {
                  color:
                    currentSection === item.id && getColors.primaryTextDark,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

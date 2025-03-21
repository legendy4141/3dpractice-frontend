import { createTheme } from "@mui/material/styles";

export const getColors = {
  primaryMain: "#3B5CFB",
  primaryHover: "linear-gradient(90deg, #007FFF 0%, #703BF7 100%)",
  drawerBgDark: "#1D1E21",
  drawerBgLight: "#ffffff",
  drawerTextDark: "#bbbbbb",
  drawerTextLight: "#555555",
  appBarBgDark: "#1D1E21",
  appBarBgLight: "#ffffff",
  appBarBorderDark: "#2A2A2A",
  appBarBorderLight: "#E8E8E8",
  buttonBg: "#3B5CFB",
  buttonText: "#ffffff",
  outlinedButtonText: "#666666",
  outlinedButtonBorder: "#666666",
  outlinedButtonHoverBg: "linear-gradient(90deg, #007FFF 0%, #703BF7 100%)",
  listItemHoverBg: "linear-gradient(90deg, #007FFF 0%, #703BF7 100%)",
  listItemTextDark: "#bbbbbb",
  listItemTextLight: "#555555",
  listItemIconBorderBottom: "#C8C8C8",
  primaryTextDark: "#ffffff",
  primaryTextLight: "#333333",
  secondaryTextDark: "#D0D0D0",
  secondaryTextLight: "#444444",
  thumbnailTextDark: "#bbbbbb",
  thumbnailTextLight: "#222222",
  thumbnnailBgDark: "#202022",
  thumbnnailBgLight: "#ffffff",
  thumbnailBorderDark: "#3A3A3A",
  thumbnailBorderLight: "#E8E8E8",
  thumbnailHoverBgDark: "#262628",
  thumbnailHoverBgLight: "#f0f0f0",
};

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: getColors.primaryMain,
      },
      background: {
        default:
          mode === "dark" ? getColors.drawerBgDark : getColors.drawerBgWhite,
      },
      text: {
        primary:
          mode === "dark"
            ? getColors.primaryTextDark
            : getColors.primaryTextLight,
        secondary:
          mode === "dark"
            ? getColors.secondaryTextDark
            : getColors.secondaryTextLight,
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background:
              mode === "dark"
                ? getColors.drawerBgDark
                : getColors.drawerBgWhite,
            color:
              mode === "dark"
                ? getColors.drawerTextDark
                : getColors.drawerTextLight,
            borderRight: `1px solid ${
              mode === "dark"
                ? getColors.appBarBorderDark
                : getColors.appBarBorderLight
            }`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background:
              mode === "dark"
                ? getColors.appBarBgDark
                : getColors.appBarBgLight,
            borderBottom: `1px solid ${
              mode === "dark"
                ? getColors.appBarBorderDark
                : getColors.appBarBorderLight
            }`,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            background: mode === "dark" ? "#757575" : "#bdbdbd",
            color: mode === "dark" ? "#1D1E21" : "#ffffff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            fontFamily: "Poppins",
            "&:hover": {
              background: getColors.outlinedButtonHoverBg,
            },
          },
          contained: {
            background: getColors.buttonBg,
            color: getColors.buttonText,
          },
          outlined: {
            color:
              mode === "dark"
                ? getColors.thumbnailTextDark
                : getColors.outlinedButtonText,
            border:
              mode === "dark"
                ? `2px solid ${getColors.thumbnailTextDark}`
                : `2px solid ${getColors.outlinedButtonText}`,
            "&:hover": {
              color: getColors.buttonText,
              border: "2px solid transparent",
              background: getColors.buttonBg,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "white" : "black",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            cursor: "pointer",
            borderRadius: "8px",
            transition: "background 0.3s ease",
            "&:hover": {
              background: getColors.listItemHoverBg,
              "& .MuiListItemText-primary": {
                color: "white",
              },
              "& .MuiListItemIcon-root": {
                "& svg": {
                  filter: "brightness(0) invert(1)",
                },
              },
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color:
              mode === "dark"
                ? getColors.listItemTextDark
                : getColors.listItemTextLight,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: "outlined" },
                style: {
                  "& .MuiOutlinedInput-root": {
                    padding: 0,
                  },
                  "& .MuiOutlinedInput-input": {
                    borderRadius: 5,
                    fontFamily: "Inter",
                    fontSize: "18px",
                    padding: "19px 24px",
                    color:
                      mode === "dark"
                        ? getColors.thumbnailTextDark
                        : getColors.secondaryTextLight,
                    background: mode === "dark" ? "#313235" : "#F0F0F0",
                    "&:hover": {
                      background: mode === "dark" ? "#3A3B3E" : "#EBEBEB",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              },
              {
                props: { variant: "filled" },
                style: {
                  "& .MuiFilledInput-root": {
                    borderRadius: 5,
                    "&:before": { display: "none" },
                    "&:after": { display: "none" },
                  },
                  "& .MuiFilledInput-multiline": {
                    padding: 0,
                  },
                  "& .MuiFilledInput-input": {
                    fontFamily: "Inter",
                    fontSize: "18px",
                    padding: "19px 24px",
                    color:
                      mode === "dark"
                        ? getColors.thumbnailTextDark
                        : getColors.secondaryTextLight,
                  },
                },
              },
              {
                props: { variant: "standard" },
                style: {},
              },
            ],
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            position: "relative",
            transform: "none",
            marginBottom: 16,
            "&.MuiInputLabel-shrink": {
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 500,
              color:
                mode === "dark"
                  ? getColors.thumbnailTextDark
                  : getColors.secondaryTextLight,
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "Inter",
    },
  });

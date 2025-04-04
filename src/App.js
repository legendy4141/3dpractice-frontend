import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { ThemeProviderWrapper } from "./context/ThemeContext";
import { ViewModeProvider } from "./context/ViewModeContext";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";
import { MainRoute } from "./Route";

const AppContent = () => {
  return (
    <AuthProvider>
      <MainRoute />
    </AuthProvider>
  );
};

const App = () => {
  return (
    <ThemeProviderWrapper>
      <ViewModeProvider>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          autoHideDuration={1500}
        >
          <Router>
            <CssBaseline />
            <AppContent />
          </Router>
        </SnackbarProvider>
      </ViewModeProvider>
    </ThemeProviderWrapper>
  );
};

export default App;

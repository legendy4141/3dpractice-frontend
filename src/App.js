import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import { ThemeProviderWrapper } from "./context/ThemeContext";
import { ViewModeProvider } from "./context/ViewModeContext";

import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import { VideoTopbar } from "./components/topbar/VideoTopbar";
import { VideoPlayerSection } from "./components/videosection/VideoPlayerSection";
import { ProfileTopbar } from "./components/topbar/ProfileTopbar";

import LoginPage from "./pages/auth/LoginPage";
import ResetPassPage from "./pages/auth/ResetPassPage";
import ForgotPassPage from "./pages/auth/ForgotPassPage";

import Dashboard from "./pages/Dashboard";
import SpinePage from "./pages/sidebar/SpinePage";
import ShoulderPage from "./pages/sidebar/ShoulderPage";
import KneePage from "./pages/sidebar/KneePage";
import AnkleNFootPage from "./pages/sidebar/AnkleNFootPage";
import ElbowNWristPage from "./pages/sidebar/ElbowNWristPage";
import HipPage from "./pages/sidebar/HipPage";
import NerveousSystemPage from "./pages/sidebar/NerveousSystemPage";
import TreatmentsPage from "./pages/sidebar/TreatmentsPage";
import PhaseOfCarePage from "./pages/sidebar/PhaseOfCarePage";
import WallArtPage from "./pages/sidebar/WallArtPage";
import VideosPage from "./pages/sidebar/VideosPage";
import JawPage from "./pages/sidebar/JawPage";

import ProfilePage from "./pages/topbar/ProfilePage";
import ExercisePage from "./pages/topbar/ExercisePage";

import "./index.css";
import CarePlanPage from "./pages/topbar/CarePlanPage";
import UsersPage from "./pages/topbar/UsersPage";

const SectionPage = () => {
  const { section } = useParams();

  const pageMap = {
    spine: <SpinePage />,
    shoulder: <ShoulderPage />,
    knee: <KneePage />,
    ankleNfoot: <AnkleNFootPage />,
    elbowNwrist: <ElbowNWristPage />,
    hip: <HipPage />,
    jaw: <JawPage />,
    nervous_system: <NerveousSystemPage />,
    treatments: <TreatmentsPage />,
    phase_of_care: <PhaseOfCarePage />,
    wall_art: <WallArtPage />,
    videos: <VideosPage />,
  };

  return pageMap[section];
};

const AppContent = () => {
  const location = useLocation();
  const excludedPages = [
    "/wall_art",
    "/spine/interactive-cervical-spine",
    "/spine/interactive-full-spine",
    "/login",
    "/forgot_pass",
    "/reset_pass",
  ];

  const isExcludedPage = excludedPages.includes(location.pathname);

  return (
    <Box display="flex" height="100vh">
      {!isExcludedPage && <Sidebar />}
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        sx={{
          ml: isExcludedPage ? 0 : "270px",
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset_pass" element={<ResetPassPage />} />
          <Route path="/forgot_pass" element={<ForgotPassPage />} />
          <Route
            path="/care-plan"
            element={
              <>
                <Topbar />
                <CarePlanPage />
              </>
            }
          />
          <Route
            path="/care-plan/:mainId/:careId?/:subId?"
            element={
              <>
                <Topbar />
                <CarePlanPage />
              </>
            }
          />
          <Route
            path="/exercise"
            element={
              <>
                <Topbar />
                <ExercisePage />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Topbar />
                <UsersPage />
              </>
            }
          />
          <Route
            path="/exercise/:mainId/:subId?/:protocolId?"
            element={
              <>
                <Topbar />
                <ExercisePage />
              </>
            }
          />
          <Route
            path="/:section/:videoId/:selectedSubItem?"
            element={
              <>
                <VideoTopbar />
                <VideoPlayerSection />
              </>
            }
          />
          <Route
            path="/:section"
            element={
              <>
                {<Topbar />}
                {<SectionPage />}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Topbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {<ProfileTopbar />}
                {<ProfilePage />}
              </>
            }
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProviderWrapper>
      <ViewModeProvider>
        <Router>
          <CssBaseline />
          <AppContent />
        </Router>
      </ViewModeProvider>
    </ThemeProviderWrapper>
  );
};

export default App;

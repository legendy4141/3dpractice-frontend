import React from "react";
import { Box } from "@mui/material";
import { Routes, Route, useParams, useLocation } from "react-router-dom";

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
import AuthGuard from "./guards/AuthGuard";

import { useAuthContext } from "./hooks/contexts/useAuthContext";
import SharePage from "./pages/share/SharePage";
import ShareVideoPlayerPage from "./pages/share/ShareVideoPlayerPage";
import ShareReportPage from "./pages/share/ShareReportPage";

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

export const MainRoute = () => {
  const location = useLocation();

  const excludedPages = [
    "/wall_art",
    "/spine/interactive-cervical-spine",
    "/spine/interactive-full-spine",
    "/login",
    "/forgot_pass",
    "/reset_pass",
    "/shared_videos/",
    "/shared_reports",
  ];

  const isExcludedPage = excludedPages.some((epage) =>
    location.pathname.startsWith(epage)
  );

  const { user } = useAuthContext();
  const isUser = user?.securityType === 3;
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
          <Route path="/shared_videos/:id" element={<ShareVideoPlayerPage />} />
          <Route path="/shared_reports/:id" element={<ShareReportPage />} />
          <Route
            path="/share"
            element={
              <AuthGuard>
                <Topbar />
                <SharePage />
              </AuthGuard>
            }
          />
          <Route
            path="/care-plan"
            element={
              <AuthGuard>
                <Topbar />
                <CarePlanPage />
              </AuthGuard>
            }
          />
          <Route
            path="/care-plan/:mainId/:careId?/:subId?"
            element={
              <>
                <AuthGuard>
                  <Topbar />
                  <CarePlanPage />
                </AuthGuard>
              </>
            }
          />
          <Route
            path="/exercise"
            element={
              <>
                <AuthGuard>
                  <Topbar />
                  <ExercisePage />
                </AuthGuard>
              </>
            }
          />
          {!isUser && (
            <Route
              path="/users"
              element={
                <>
                  <AuthGuard>
                    <Topbar />
                    <UsersPage />
                  </AuthGuard>
                </>
              }
            />
          )}
          <Route
            path="/exercise/:mainId/:subId?/:protocolId?"
            element={
              <>
                <AuthGuard>
                  <Topbar />
                  <ExercisePage />
                </AuthGuard>
              </>
            }
          />
          <Route
            path="/:section/:videoId/:selectedSubItem?"
            element={
              <>
                <AuthGuard>
                  <VideoTopbar />
                  <VideoPlayerSection />
                </AuthGuard>
              </>
            }
          />
          <Route
            path="/:section"
            element={
              <>
                <AuthGuard>
                  <Topbar />
                  <SectionPage />
                </AuthGuard>
              </>
            }
          />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Topbar />
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <AuthGuard>
                  <ProfileTopbar />
                  <ProfilePage />
                </AuthGuard>
              </>
            }
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Box>
    </Box>
  );
};

import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const ShareReportPage = () => {
  const location = useLocation();

  const fileName = location.pathname.split("/")[2];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100vh",
        padding: 0,
        margin: 0,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <iframe
        src={`${process.env.REACT_APP_API_URL}/shared-report/${fileName}`}
        type="application/pdf"
        width="100%"
        height="100%"
        title="Exercise Report"
        style={{ border: "none" }}
      />
    </Box>
  );
};

export default ShareReportPage;

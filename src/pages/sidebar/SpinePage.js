import React, { useContext } from "react";
import { Box } from "@mui/material";

import { ViewModeContext } from "../../context/ViewModeContext";

import { Thumbnail } from "../../components/custom/Thumbnail";
import { Listbox } from "../../components/custom/Listbox";

import { spineVideoData } from "../../utils/videoData";

const SpinPage = () => {
  const { viewMode } = useContext(ViewModeContext);

  return (
    <Box
      display={viewMode === "thumbnail" ? "grid" : "block"}
      gridTemplateColumns={
        viewMode === "thumbnail"
          ? "repeat(auto-fill, minmax(350px, 1fr))"
          : "none"
      }
      gap={2}
      sx={{
        margin: viewMode === "thumbnail" ? 10 : 5,
      }}
    >
      {spineVideoData.map((video, index) =>
        viewMode === "thumbnail" ? (
          <Thumbnail key={index} {...video} />
        ) : (
          <Listbox key={index} {...video} />
        )
      )}
    </Box>
  );
};

export default SpinPage;

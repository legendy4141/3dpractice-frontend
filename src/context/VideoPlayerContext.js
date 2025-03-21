import React from "react";

export const VideoPlayerContext = React.createContext({
  isLoading: false,
  setIsLoading: () => {},
});

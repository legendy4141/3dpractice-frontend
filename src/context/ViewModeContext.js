import React, { createContext, useState, useEffect } from "react";

export const ViewModeContext = createContext();

export const ViewModeProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState("thumbnail");

  useEffect(() => {
    const savedMode = localStorage.getItem("viewMode");
    if (savedMode) {
      setViewMode(savedMode);
    }
  }, []);

  const updateViewMode = (mode) => {
    localStorage.setItem("viewMode", mode);
    setViewMode(mode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, updateViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};

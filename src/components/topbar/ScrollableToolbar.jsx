import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

export const ScrollableToolbar = ({ children, childrenSx }) => {
  const scrollRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(200);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateWidth = () => {
      if (scrollRef.current) {
        setContainerWidth(scrollRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateWidth);

    updateWidth();

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const isContentOverflowing =
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth;
        setIsOverflowing(isContentOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [containerWidth, location]);

  useEffect(() => {
    if (containerWidth > 0) {
      setScrollDistance(containerWidth);
    }
  }, [containerWidth]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        width: 0,
        flexGrow: 1,
      }}
    >
      {isOverflowing && (
        <IconButton onClick={scrollLeft} sx={{ marginRight: "8px" }}>
          <ArrowBack />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "hidden",
          width: "80%",
          scrollBehavior: "smooth",
        }}
      >
        {React.Children.map(children, (child) => {
          if (!child) return null;
          return React.cloneElement(child, {
            sx: { ...child.props.sx, flexShrink: 0, ...childrenSx },
          });
        })}
      </Box>

      {isOverflowing && (
        <IconButton onClick={scrollRight} sx={{ marginLeft: "8px" }}>
          <ArrowForward />
        </IconButton>
      )}
    </Box>
  );
};

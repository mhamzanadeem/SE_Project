import React, { useEffect } from "react";
import Ucard from "./Ucard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SampleNextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      "&:hover": { backgroundColor: "black" },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);

const SamplePrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      "&:hover": { backgroundColor: "black" },
    }}
  >
    <ArrowBackIosNewIcon />
  </IconButton>
);

const Upcomming = ({ items, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for large screens
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // Default centerMode is off so that the first and last slides are flush
    centerMode: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 800, settings: { slidesToShow: 2, centerMode: false } },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: true, // Enable centering when only one slide is visible
          centerPadding: "0px",
        },
      },
    ],
  };

  // Inject CSS overrides for slick slider (hover scaling, overflow, spacing)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .slick-list {
        overflow-x: hidden !important;
        overflow-y: visible !important;
        padding-top: 20px;
        padding-bottom: 20px;
      }
      .slick-slide > div {
        position: relative;
        transform-origin: center center;
        transition: transform 0.3s ease;
      }
      .slick-slide > div:hover {
        transform: scale(1.05);
        z-index: 10;
      }
      .slick-slide {
        padding: 0 5px !important;
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        mx: "auto",
        overflow: "hidden",
        px: 1,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        sx={{
          background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {title}
      </Typography>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} style={{ margin: 0, padding: 0 }}>
            <Ucard item={item} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Upcomming;

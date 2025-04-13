//  components/homes/Home.jsx

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeCard from "./HomeCard";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: 15,
        transform: "translateY(-50%)",
        bgcolor: "rgba(0,0,0,0.6)",
        color: "white",
        zIndex: 2,
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        "&:hover": { bgcolor: "black" },
      }}
    >
      <ArrowForwardIos sx={{ fontSize: 24 }} />
    </IconButton>
  );
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: 15,
        transform: "translateY(-50%)",
        bgcolor: "rgba(0,0,0,0.6)",
        color: "white",
        zIndex: 2,
        width: 50,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        "&:hover": { bgcolor: "black" },
      }}
    >
      <ArrowBackIos sx={{ fontSize: 24 }} />
    </IconButton>
  );
};

const Home = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto sliding
    autoplaySpeed: 5000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Box sx={{ width: "100%", position: "relative", overflow: "hidden" }}>
      <Slider {...settings}>
        {items.map((item) => (
          <HomeCard key={item.id} item={item} />
        ))}
      </Slider>
    </Box>
  );
};

export default Home;

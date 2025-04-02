import React, { useState } from "react";
import { Box } from "@mui/material";
import { homeData } from "../../dummyData";
import Home from "./Home";

const Homes = () => {
  const [items] = useState(homeData);

  return (
    <Box sx={{ width: "100%", bgcolor: "black" }}>
      <Home items={items} />
    </Box>
  );
};

export default Homes;

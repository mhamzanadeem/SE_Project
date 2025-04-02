import React, { useState } from "react";
import { trending } from "../../dummyData";
import TrendingCard from "./TrendingCard";
import {
  Container,
  Typography,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Trending = () => {
  const [items] = useState(trending);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ py: 5 }}>
      {/* Gradient + Shadow Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        sx={{
          background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Trending Movies
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {items.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id || index}
            sx={{
              // On small screens, center each Grid item’s content
              ...(isSmallScreen && {
                display: "flex",
                justifyContent: "center",
              }),
            }}
          >
            {isSmallScreen ? (
              <Box sx={{ width: "280px", mx: "auto" }}>
                <TrendingCard item={item} />
              </Box>
            ) : (
              <TrendingCard item={item} />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Trending;

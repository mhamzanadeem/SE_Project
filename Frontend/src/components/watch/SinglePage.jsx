// components/watch/SinglePage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, Divider, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { homeData, recommended } from "../../dummyData";
import Upcomming from "../upcoming/Upcomming";

const SinglePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const foundItem = homeData.find((i) => i.id === parseInt(id));
    if (foundItem) {
      setItem(foundItem);
    }
  }, [id]);

  const [rec] = useState(recommended);

  return (
    <>
      {item ? (
        <>
          {/* Header Section */}
          <Box
            sx={{
              backgroundColor: "#1e272d",
              py: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {item.name}
            </Typography>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              | {item.time} | HD
            </Typography>
          </Box>

          {/* Main Content Section */}
          <Container maxWidth="md" sx={{ my: 4 }}>
            {/* Video */}
            <Box sx={{ my: 4 }}>
              <video
                src={item.video}
                controls
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Date: {item.date}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                {item.desc}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                Get access to the direct Project Overview with this report. Just
                by a quick glance, you’ll have an idea of the total tasks
                allotted to the team, number of milestones given &amp;
                completed, total Links created for the project and the total
                time taken by all the users. Each section would elaborate the
                data further, if chosen.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                Get access to the direct Project Overview with this report. Just
                by a quick glance, you’ll have an idea of the total tasks
                allotted to the team, number of milestones given &amp;
                completed, total Links created for the project and the total
                time taken by all the users. Each section would elaborate the
                data further, if chosen.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                Get access to the direct Project Overview with this report. Just
                by a quick glance, you’ll have an idea of the total tasks
                allotted to the team, number of milestones given &amp;
                completed, total Links created for the project and the total
                time taken by all the users. Each section would elaborate the
                data further, if chosen.
              </Typography>
            </Box>

            {/* Social Share */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
              <Typography variant="h6" sx={{ mr: 1 }}>
                Share:
              </Typography>
              <IconButton color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary">
                <LinkedInIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mt: 4, mb: 2 }} />
          </Container>

          {/* Recommended Movies Section */}
          <Upcomming items={rec} title="Recommended Movies" />
        </>
      ) : (
        <Typography variant="h5" color="error" align="center">
          Item not found.
        </Typography>
      )}
    </>
  );
};

export default SinglePage;

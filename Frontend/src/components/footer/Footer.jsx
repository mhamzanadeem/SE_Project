import React from "react";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import { Facebook, Twitter, GitHub, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#191919",
        color: "white",
        mt: 10,
        py: 5,
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <List sx={{ display: "flex", flexWrap: "wrap", p: 0, m: 0 }}>
              {[
                "Terms of Use",
                "Privacy Policy",
                "Blog",
                "FAQ",
                "Watch List",
              ].map((text) => (
                <ListItem
                  key={text}
                  sx={{
                    width: "auto",
                    px: 2,
                    py: 0,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                      "& .MuiListItemText-primary": {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      color: "white",
                      variant: "body2",
                      sx: { fontWeight: 500, transition: "color 0.3s ease" },
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" sx={{ mt: 3, opacity: 0.7 }}>
              © 2022 STREAMIT. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {[Facebook, Twitter, GitHub, Instagram].map((Icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: "white",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.2)" },
                  }}
                >
                  <Icon fontSize="large" />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

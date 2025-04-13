// src/components/footer/Footer.jsx
import { Box, Typography, Container } from "@mui/material"; // Added Container for consistency

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#000000", // Teammate's background color
        p: 2,
        textAlign: "center",
        borderTop: "1px solid #333333", // Teammate's border
        color: "text.secondary", // Use theme color for text
        // Fixed positioning can cause layout issues, use mt: 'auto' in App's layout if possible
        // If fixed is required:
        position: "fixed",
        bottom: 0,
        left: 0, // Ensure it starts from the left edge
        width: "100%",
        zIndex: (theme) => theme.zIndex.appBar + 1, // Ensure it's above content if fixed
      }}
    >
      {/* Wrap text in Container for better alignment if needed, though center aligns globally */}
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Watchlists. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

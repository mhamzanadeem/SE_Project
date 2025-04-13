import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#000000",
        p: 2,
        textAlign: "center",
        borderTop: "1px solid #333333",
        position: "fixed",
        bottom: 0,
        width: "100%"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Watchlists. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer

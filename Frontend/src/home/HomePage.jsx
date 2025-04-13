import { Box, Typography, Paper, Grid, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"
import SearchAutocomplete from "../components/header/SearchAutocomplete"

// Styled components
const MovieCard = styled(Paper)(({ theme }) => ({
  background: "transparent",
  boxShadow: "none",
  position: "relative",
}))

const RatingBadge = styled(Box)(({ isGood }) => ({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: isGood ? "rgba(0, 128, 0, 0.2)" : "rgba(255, 165, 0, 0.2)",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "12px",
}))

const HomePage = () => {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "#121212",
        p: 3,
        overflowY: "auto",
        minHeight: "calc(100vh - 40px)", // Subtract browser chrome height
      }}
    >
      {/* Welcome message */}
      <Paper
        sx={{
          border: "1px solid rgba(244, 67, 54, 0.2)",
          borderRadius: "8px",
          p: 3,
          mb: 4,
          bgcolor: "rgba(18, 18, 18, 0.8)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
          Welcome to{" "}
          <Box component="span" sx={{ color: "#f44336" }}>
            Watchlists
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ color: "#bdbdbd", mb: 1 }}>
          Browse movies, add them to watchlists and share them with friends.
        </Typography>
        <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
          Just click the{" "}
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#333333",
              px: 0.75,
              py: 0.25,
              borderRadius: "4px",
            }}
          >
            <AddIcon sx={{ fontSize: "16px" }} />
          </Box>{" "}
          to add a movie, the poster to see more details or{" "}
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#333333",
              px: 0.75,
              py: 0.25,
              borderRadius: "4px",
            }}
          >
            <CheckIcon sx={{ fontSize: "16px" }} />
          </Box>{" "}
          to mark the movie as watched.
        </Typography>
      </Paper>

      {/* Search bar */}
      <SearchAutocomplete/>

      {/* Popular movies */}
      <Typography variant="h5" sx={{ fontWeight: "600", mb: 3 , mt: 4 }}>
        Popular movies right now
      </Typography>

      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <MovieCard>
              <Box sx={{ position: "relative" }}>
                <img
                  src="/images/home1.jpg"
                  alt="Movie poster"
                  style={{ width: "100%", height: "auto", borderRadius: "4px" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
                    padding: "4px",
                  }}
                >
                  <AddIcon sx={{ fontSize: "16px", color: "white" }} />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
                {index % 2 === 0 ? (
                  <>
                    <RatingBadge isGood>
                      <span style={{ marginRight: "4px" }}>😊</span> 83
                    </RatingBadge>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      /100
                    </Typography>
                  </>
                ) : (
                  <>
                    <RatingBadge>
                      <span style={{ marginRight: "4px" }}>😐</span> 68
                    </RatingBadge>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      /100
                    </Typography>
                  </>
                )}
              </Box>
              <Box sx={{ mt: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {index % 2 === 0 ? "Top Gun: Maverick" : "Fantastic Beasts: The Secrets of Dumbledore"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#757575" }}>
                  (2022)
                </Typography>
              </Box>
            </MovieCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HomePage

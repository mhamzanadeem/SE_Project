// Define the API URL
// const apiUrl = 'https://api.themoviedb.org/3/trending/movie/week?api_key=bad64aad7360bfd1615d7eea5599e286';
// const apiUrl2 = 'https://api.themoviedb.org/3/person/popular?api_key=bad64aad7360bfd1615d7eea5599e286';
// const apiUrl3 = 'https://api.themoviedb.org/3/trending/tv/week?api_key=bad64aad7360bfd1615d7eea5599e286';
// const apiUrl4 = 'https://api.themoviedb.org/3/movie/550?api_key=bad64aad7360bfd1615d7eea5599e286';

// // Fetch data from the API
// fetch(apiUrl2)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('API Response:', data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

// api_key='bad64aad7360bfd1615d7eea5599e286';
// for (let page = 1; page <= 10; page++) {
//   const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=28&page=${page}`;

//   fetch(apiUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(`Page ${page} Results:`, data.results);
//       // Process the data as needed
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }

///////////// Youtube API //////////////

//const apiKey = 'AIzaSyC8nS5070mWv1x-VoXw2Z7WAs54mzbuylQ';
// const movieTitle = 'Inception';
// const query = `${movieTitle} trailer`;
// const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     if (data.items.length > 0) {
//       const videoId = data.items[0].id.videoId;
//       const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//       console.log('Trailer URL:', videoUrl);
//     } else {
//       console.log('No trailer found for this movie.');
//     }
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  CardActionArea,
} from "@mui/material";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api_key = "bad64aad7360bfd1615d7eea5599e286";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        for (let page = 1; page <= 10; page++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=28&page=${page}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          allMovies = [...allMovies, ...data.results];
        }
        setMovies(allMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  if (error)
    return (
      <Typography color="error" align="center">{`Error: ${error}`}</Typography>
    );

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2c5364" }}
      >
        Action Movies
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ borderRadius: 2 }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;

import "./App.css";
import axios from "axios";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  TextField,
  Box,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [isExist, setIsExsist] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [open, setOpen] = useState(false);
  const getAll = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: "cc40ac8cd3ea88c392a25337ea31fb61"
          },
        }
      );
      setMovies(response.data.results);
      setResultSearch(response.data.results);
      setIsExsist(true);
      // console.log("movies", response.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  function handleSearch(value) {
    setSearchMovies(value);
    if (!value.trim()) {
      setMovies([]);
      return;
    }
    if (!isExist) {
      getAll();
    } else {
      const filteredMovies = resultSearch.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setMovies(filteredMovies);
    }
  }
  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Container>
        <Box sx={{textAlign: "center", mt: 10}}>
          <Typography variant="h4" gutterBottom>
            Mini Movie Explorer
          </Typography>
        </Box>
        <TextField
          label="Search movies..."
          variant="outlined"
          fullWidth
          value={searchMovies}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          sx={{ marginBottom: 2 }}
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {movies.length > 0 &&
            movies.map((movie) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Card
                    onClick={() => handleOpen(movie)}
                    sx={{ cursor: "pointer", height: "100%", margin: "10px" }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <CardContent sx={{ height: "100px" }}>
                      <Typography variant="h6">{movie.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Release Date: {movie.release_date}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>

        <Modal open={open} onClose={handleClose}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            sx={{
              backgroundColor: "white",
              p: 4,
              borderRadius: 2,
              width: "90%",
              maxWidth: 500,
              mx: "auto",
              my: "20vh",
              outline: "none",
            }}
          >
            {selectedMovie && (
              <>
                <Typography variant="h5" gutterBottom>
                  {selectedMovie.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedMovie.overview}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {selectedMovie.vote_average}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Release Date: {selectedMovie.release_date}
                </Typography>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </div>
  );
}
export default App;

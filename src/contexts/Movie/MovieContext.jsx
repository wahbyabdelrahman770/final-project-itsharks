import { createContext, useContext, useEffect, useState } from "react";
import { getMovieGenreID } from "../../utils/genres";

export const MovieStore = createContext({});

const MovieContext = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  const token = import.meta.env.VITE_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const getMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
      setAllMovies(res.results);

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const getTopRatingMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
      setAllMovies(res.results);

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setError(true);
      setLoading(false);
    }
  };

  const getNewestMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
      setAllMovies(res.results);

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const getGenresId = async () => {
    setLoading(true);
    setError(false);

    try {
      const apiLink =
        "https://api.themoviedb.org/3/genre/movie/list?language=en";
      const req = await fetch(apiLink, options);
      const res = await req.json();

      let genres = res.genres;

      setLoading(false);
      setError(false);
      setMoviesGenres(genres);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const filterMovies = (name) => {
    setLoading(true);
    setError(false);
    try {
      const genreID = getMovieGenreID(name);

      const filtered = allMovies.filter((movie) =>
        movie.genre_ids.includes(genreID),
      );

      setMovies(filtered);
      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const movieLength = movies.length;

  const movieDetails = async (movieID) => {
    setLoading(true);
    setError(false);

    try {
      const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc/${movieID}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (input.trim() !== "") {
      searchMovies();
    }
  }, [input]);

  useEffect(() => {
    getMovies();
    getGenresId();
    scrollToTop();
  }, [page]);

  return (
    <MovieStore.Provider
      value={{
        movies,
        moviesGenres,
        filterMovies,
        movieLength,
        page,
        nextPage,
        previousPage,
        getTopRatingMovies,
        getMovies,
        getNewestMovies,
        movieDetails,
        loading,
        setInput,
        error,
      }}
    >
      {children}
    </MovieStore.Provider>
  );
};

export default MovieContext;

export const useMovie = () => useContext(MovieStore);

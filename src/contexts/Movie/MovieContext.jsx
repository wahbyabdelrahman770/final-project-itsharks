import { createContext, useContext, useEffect, useState } from "react";
import { getMovieGenreID } from "../../utils/genres";

export const MovieStore = createContext({});

const MovieContext = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState("ALL");

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
      const apiLink = active === "ALL" ? `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc` : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_genres=${getMovieGenreID(active)}&page=${page}&sort_by=popularity.desc`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);

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

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };
  const movieLength = movies.length;

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
    scrollToTop();
  }, [page, active]);

  return (
    <MovieStore.Provider
      value={{
        movies,
        movieLength,
        page,
        setPage,
        nextPage,
        previousPage,
        getTopRatingMovies,
        getMovies,
        getNewestMovies,
        loading,
        setInput,
        error,
        setActive,
        active,
      }}
    >
      {children}
    </MovieStore.Provider>
  );
};

export default MovieContext;

export const useMovie = () => useContext(MovieStore);

import React, { createContext, useContext, useEffect, useState } from "react";

export const MovieStore = createContext({});
const MovieContext = ({ children }) => {
  const [movies, setMovies] = useState([]);
  //   const [moviesGenres, setMoviesGenres] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTNiODYwYjkyZmRmNDBjMGI0YzI4YjY1MWFlZGE3NiIsIm5iZiI6MTc5NDI1MDgwNS4wMjksInN1YiI6IjZhZjIxODM1ZmFhOTlmMjU3ZDE1NTAwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sjgfVghvgXHkZM1jai47GIHPCtztYdObUOYYPXdtdxs",
    },
  };

  //   const optionsGenres = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTNiODYwYjkyZmRmNDBjMGI0YzI4YjY1MWFlZGE3NiIsIm5iZiI6MTc5NDI1MDgwNS4wMjksInN1YiI6IjZhZjIxODM1ZmFhOTlmMjU3ZDE1NTAwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sjgfVghvgXHkZM1jai47GIHPCtztYdObUOYYPXdtdxs",
  //     },
  //   };

  const getMovies = async () => {
    const apiLink =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    try {
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);

      console.log(res.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  //   const genres = async () => {
  //     const apiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  //     try {
  //       const req = await fetch(apiLink, optionsGenres);
  //       const res = await req.json();

  //       setMoviesGenres(res);

  //       console.log(res);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  useEffect(() => {
    getMovies();
    // genres()
  }, []);
  return (
    <MovieStore.Provider value={{ movies }}>{children}</MovieStore.Provider>
  );
};

export default MovieContext;

export const useMovie = () => useContext(MovieStore);

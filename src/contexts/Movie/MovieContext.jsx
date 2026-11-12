import React, { createContext, useContext, useEffect, useState } from "react";

export const MovieStore = createContext({});
const MovieContext = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [page, setPage] = useState(1);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTNiODYwYjkyZmRmNDBjMGI0YzI4YjY1MWFlZGE3NiIsIm5iZiI6MTc5NDI1MDgwNS4wMjksInN1YiI6IjZhZjIxODM1ZmFhOTlmMjU3ZDE1NTAwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sjgfVghvgXHkZM1jai47GIHPCtztYdObUOYYPXdtdxs",
    },
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };

  const getMovies = async () => {
    const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    try {
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTopRatingMovies = async () => {
    const apiLink = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    try {
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
    } catch (err) {
      console.log(err.message);
    }
  };
  const getNewestMovies = async () => {
    const apiLink = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
    try {
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getGenresId = async () => {
    const apiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const req = await fetch(apiLink, options);
    const res = await req.json();

    let genres = res.genres;

    setMoviesGenres(genres);
  };

  const filteredMovies = movies.filter((movie) => {
    //   let genres = movie.genre_ids[0];
    //   return genres;

    //   if (movie.id == movieId.includes()) {
    //     console.log("H");
    //   } else {
    //     console.log("no");
    //   }
    //   // console.log(movieId);

    //   console.log(movieId);
    // });
    // return filterrr;
    if (!selectedGenreId) return true;

    return movie.genre_ids.includes(selectedGenreId);
  });

  const movieLength = movies.length;

  useEffect(() => {
    getMovies();
    getGenresId();
    getTopRatingMovies();
    getNewestMovies();
  }, [page]);
  return (
    <MovieStore.Provider
      value={{
        movies,
        moviesGenres,
        filteredMovies,
        movieLength,
        page,
        nextPage,
        previousPage,
        getTopRatingMovies,
        getMovies,
        getNewestMovies,
      }}
    >
      {children}
    </MovieStore.Provider>
  );
};

export default MovieContext;

export const useMovie = () => useContext(MovieStore);

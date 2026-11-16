import React, { createContext, useContext, useEffect, useState } from "react";

export const MovieStore = createContext({});
const MovieContext = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [searchMoviesResults, setSearchMoviesResults] = useState([]);
  const [loading, setLoading] = useState(true);

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
    try {
      const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTopRatingMovies = async () => {
    setLoading(true);
    try {
      const apiLink = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  const getNewestMovies = async () => {
    setLoading(true);
    try {
      const apiLink = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setMovies(res.results);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const getGenresId = async () => {
    const apiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const req = await fetch(apiLink, options);
    const res = await req.json();

    let genres = res.genres;

    setMoviesGenres(genres);
  };

  const filterMovies = async () => {
    const apiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const req = await fetch(apiLink, options);
    const res = await req.json();

    let genres = res.genres;
    console.log(genres);

    // let g = genres.map((g) => {
    //   console.log(g.name);
    //   return g;
    // });

    // const filteredMovies = movies.filter((movie) => {
    //   // console.log(movie.genre_ids);
    //   // return movie.genre_ids.includes(res.genres);
    //   // console.log(g);

    //   genres.map((g) => {
    //     console.log(g.name);
    //     return g;
    //   });
    //   return movie;
    // });

    const fil = genres.map((g) => {
      console.log(g.name);

      const filteredMovies = movies.filter((movie) => {
        console.log(movie.genre_ids.includes(g));
      });
    });

    setFilteredMovies(filteredMovies);
  };

  const movieLength = movies.length;

  const searchMovies = async () => {
    const apiLink = `https://api.themoviedb.org/3/search/movie?&query=${input}&include_adult=false&language=en-US&page=${page}`;
    try {
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSearchMoviesResults(res.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  const movieDetails = async (movieID) => {
    try {
      const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc/${movieID}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (input.trim() !== "") {
      searchMovies();
    }
  }, [input]);

  useEffect(() => {
    getMovies();
    getGenresId();
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
        searchMoviesResults,
        movieDetails,
        loading,
        searchMovies,
        setInput,
      }}
    >
      {children}
    </MovieStore.Provider>
  );
};

export default MovieContext;

export const useMovie = () => useContext(MovieStore);

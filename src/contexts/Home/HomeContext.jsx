import { createContext, useContext, useEffect, useState } from "react";

const HomeContext = createContext({});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

const apiNowPlaying =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const apiPopularApi =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const getHeroMovies = async () => {
  const response = await fetch(apiNowPlaying, options);

  if (!response.ok) {
    throw new Error("Failed to fetch hero movies");
  }

  const data = await response.json();

  return data.results.slice(0, 5);
};

const getPopularMovies = async () => {
  const response = await fetch(apiPopularApi, options);

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await response.json();

  return data.results.slice(0, 10);
};

const getGenreMovies = async (genres) => {
  const selectedGenres = genres.slice(0, 4);

  const results = await Promise.all(
    selectedGenres.map(async (genre) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc&language=en-US&page=1`,
        options,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${genre.name} movies`);
      }

      const data = await response.json();

      const movie = data.results.find(
        (item) => item.backdrop_path || item.poster_path,
      );

      return {
        genreId: genre.id,
        genreName: genre.name,
        movie: movie || null,
      };
    }),
  );

  return results;
};

export function HomeProvider({ children }) {
  const [heroMovies, setHeroMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load Home Data
  const loadHomeData = async () => {
    setLoading(true);
    setError(false);

    // Get Hero Movies
    try {
      const hero = await getHeroMovies();
      setHeroMovies(hero);
    } catch (err) {
      console.error("Hero Movies Error:", err);
      setError(true);
    }

    try {
      const popular = await getPopularMovies();
      setPopularMovies(popular);
    } catch (err) {
      console.error("Popular Movies Error:", err);
      setError(true);
    }

    setLoading(false);
  };

  const loadGenreMovies = async (genres) => {
    try {
      const results = await getGenreMovies(genres);
      setGenreMovies(results);
    } catch (err) {
      console.error("Genre Movies Error:", err);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        heroMovies,
        popularMovies,
        genreMovies,
        loadGenreMovies,
        loading,
        error,
        retry: loadHomeData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);
  return context;
}

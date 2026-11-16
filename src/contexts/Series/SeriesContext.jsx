import { createContext, useContext, useEffect, useState } from "react";
import { getTvGenreID } from "../../utils/genres";

export const seriesStore = createContext({});

const SeriesContext = ({ children }) => {
  const [series, setSeries] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [allSeries, setAllSeries] = useState([]);

  const token = import.meta.env.VITE_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const seriesLength = series.length;

  const getSeries = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setLoading(false);
      setError(false);
      setSeries(res.results);
      setAllSeries(res.results);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const getGenres = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = "https://api.themoviedb.org/3/genre/tv/list?language=en";
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setLoading(false);
      setError(false);
      setSeriesGenres(res.genres);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const nextSeries = () => {
    setPage(page + 1);
  };

  const prevSeries = () => {
    setPage(page - 1);
  };

  const getRatingSeries = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSeries(res.results);
      setAllSeries(res.results);

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const getNewestSeries = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSeries(res.results);
      setAllSeries(res.results);

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const seriesDetails = async (seriesID) => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc/${seriesID}`;
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

  const filterSeries = async (name) => {
    setLoading(true);
    setError(false);

    try {
      const genreID = getTvGenreID(name);

      const filtered = allSeries.filter((movie) =>
        movie.genre_ids.includes(genreID),
      );

      setLoading(false);
      setError(false);
      setSeries(filtered);
    } catch (err) {
      console.log(err.message);
      setError(true);
    }
  };

  useEffect(() => {
    if (input.trim() !== "") {
      searchSeries();
    }
  }, [input]);

  useEffect(() => {
    getSeries();
    getGenres();
  }, [page]);

  return (
    <seriesStore.Provider
      value={{
        series,
        seriesGenres,
        nextSeries,
        prevSeries,
        page,
        seriesLength,
        getNewestSeries,
        getRatingSeries,
        getSeries,
        setInput,
        seriesDetails,
        loading,
        input,
        error,
        filterSeries,
        notFound,
      }}
    >
      {children}
    </seriesStore.Provider>
  );
};

export default SeriesContext;

export const useSeries = () => useContext(seriesStore);

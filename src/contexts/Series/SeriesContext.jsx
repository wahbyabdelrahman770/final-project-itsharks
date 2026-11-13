import { createContext, useContext, useEffect, useState } from "react";

export const seriesStore = createContext({});

const SeriesContext = ({ children }) => {
  const [series, setSeries] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTNiODYwYjkyZmRmNDBjMGI0YzI4YjY1MWFlZGE3NiIsIm5iZiI6MTc5NDI1MDgwNS4wMjksInN1YiI6IjZhZjIxODM1ZmFhOTlmMjU3ZDE1NTAwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sjgfVghvgXHkZM1jai47GIHPCtztYdObUOYYPXdtdxs",
    },
  };

  const seriesLength = series.length;

  const getSeries = async () => {
    setLoading(true);
    try {
      const apiLink = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setLoading(false);
      setSeries(res.results);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const getGenres = async () => {
    setLoading(true);
    try {
      const apiLink = "https://api.themoviedb.org/3/genre/tv/list?language=en";
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setLoading(false);
      setSeriesGenres(res.genres);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
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
    try {
      const apiLink = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();
      setSeries(res.results);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const getNewestSeries = async () => {
    setLoading(true);
    try {
      const apiLink = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();
      setSeries(res.results);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const searchSeries = async () => {
    setLoading(true);
    try {
      const apiLink = `https://api.themoviedb.org/3/search/tv?&query=${input}&include_adult=false&language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSearchResults(res.results);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const seriesDetails = async (seriesID) => {
    try {
      const apiLink = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc/${seriesID}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    searchSeries();
  }, [input]);

  useEffect(() => {
    getSeries();
    getGenres();
    getRatingSeries();
    getNewestSeries();
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
        searchResults,
        seriesDetails,
        loading,
      }}
    >
      {children}
    </seriesStore.Provider>
  );
};

export default SeriesContext;

export const useSeries = () => useContext(seriesStore);

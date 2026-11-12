import { createContext, useContext, useEffect, useState } from "react";

export const seriesStore = createContext({});

const SeriesContext = ({ children }) => {
  const [series, setSeries] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [page, setPage] = useState(1);

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
    const apiLink = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    const req = await fetch(apiLink, options);
    const res = await req.json();
    setSeries(res.results);
  };

  const getGenres = async () => {
    const apiLink = "https://api.themoviedb.org/3/genre/tv/list?language=en";
    const req = await fetch(apiLink, options);
    const res = await req.json();
    setSeriesGenres(res.genres);
  };

  const nextSeries = () => {
    setPage(page + 1);
  };
  const prevSeries = () => {
    setPage(page - 1);
  };

  const getRatingSeries = async () => {
    const apiLink = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
    const req = await fetch(apiLink, options);
    const res = await req.json();
    setSeries(res.results);
  };

  const getNewestSeries = async () => {
    const apiLink = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`;
    const req = await fetch(apiLink, options);
    const res = await req.json();
    setSeries(res.results);
  };

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
      }}
    >
      {children}
    </seriesStore.Provider>
  );
};

export default SeriesContext;

export const useSeries = () => useContext(seriesStore);

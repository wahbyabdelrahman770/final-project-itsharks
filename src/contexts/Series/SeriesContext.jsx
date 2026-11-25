import { createContext, useContext, useEffect, useState } from "react";
import { getTvGenreID } from "../../utils/genres";

export const seriesStore = createContext({});

const SeriesContext = ({ children }) => {
  const [series, setSeries] = useState([]);
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

  const getSeries = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = active === "ALL" ? `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc` : `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&with_genres=${getTvGenreID(active)}&page=${page}&sort_by=popularity.desc`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSeries(res.results);

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const getRatingSeries = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiLink = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
      const req = await fetch(apiLink, options);
      const res = await req.json();

      setSeries(res.results);

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

      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setError(true);
    }
  };

  const seriesLength = series.length;

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (input.trim() !== "") {
      searchSeries();
    }
  }, [input]);

  useEffect(() => {
    getSeries();
    scrollToTop();
  }, [page, active]);

  return (
    <seriesStore.Provider
      value={{
        series,
        active,
        setActive,
        nextPage,
        previousPage,
        page,
        setPage,
        seriesLength,
        getNewestSeries,
        getRatingSeries,
        getSeries,
        setInput,
        loading,
        input,
        error
      }}
    >
      {children}
    </seriesStore.Provider>
  );
};

export default SeriesContext;

export const useSeries = () => useContext(seriesStore);

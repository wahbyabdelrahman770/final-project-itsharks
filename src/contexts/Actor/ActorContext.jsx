import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

export const ActorStore = createContext(null);

const token = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const ActorContext = ({ children }) => {
  const [actor, setActor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Actor Details
  const getActorDetails = useCallback(async (actorID) => {
    if (!actorID || actorID === "undefined") {
      setActor({});
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    setActor({});

    try {
      const apiLink =
        `https://api.themoviedb.org/3/person/${actorID}?language=en-US&append_to_response=combined_credits`;

      const req = await fetch(apiLink, options);

      if (!req.ok) {
        throw new Error(`HTTP Error: ${req.status}`);
      }

      const res = await req.json();

      setActor(res);
    } catch (err) {
      console.error("Actor Fetch Error:", err);
      setActor({});
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const actorMovieCount = new Set();
  actor?.combined_credits?.cast.filter(media => media?.media_type === "movie")?.forEach(movie => actorMovieCount.add(movie?.title));
  actor?.combined_credits?.crew.filter(media => media?.media_type === "movie")?.forEach(movie => actorMovieCount.add(movie?.title));

  const actorSeriesCount = new Set();
  actor?.combined_credits?.cast.filter(media => media?.media_type === "tv")?.forEach(series => actorSeriesCount.add(series?.name));
  actor?.combined_credits?.crew.filter(media => media?.media_type === "tv")?.forEach(series => actorSeriesCount.add(series?.name));

  // Actor Movies
  const actorMovies = useMemo(() => {
    return (actor?.combined_credits ? [...(actor?.combined_credits?.cast), ...(actor?.combined_credits?.crew)] : [])
      .filter((movie) => movie.media_type === "movie")
      .sort((firstMovie, secondMovie) =>
        (secondMovie.release_date || "").localeCompare(
          firstMovie.release_date || "",
        ),
      );
  }, [actor]);

  // Actor TV Series
  const actorSeries = useMemo(() => {
    return (actor?.combined_credits ? [...(actor?.combined_credits?.cast), ...(actor?.combined_credits?.crew)] : [])
      .filter((series) => series.media_type === "tv")
      .sort((firstSeries, secondSeries) =>
        (secondSeries.first_air_date || "").localeCompare(
          firstSeries.first_air_date || "",
        ),
      );
  }, [actor]);

  return (
    <ActorStore.Provider
      value={{
        actor,
        actorMovies,
        actorSeries,
        actorMovieCount,
        actorSeriesCount,
        loading,
        error,
        getActorDetails,
      }}
    >
      {children}
    </ActorStore.Provider>
  );
};

export default ActorContext;

export const useActor = () => useContext(ActorStore);

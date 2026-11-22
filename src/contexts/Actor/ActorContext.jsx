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
        `https://api.themoviedb.org/3/person/${actorID}` +
        `?language=en-US&append_to_response=combined_credits`;

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

  // Actor Movies
  const actorMovies = useMemo(() => {
    return (actor.combined_credits?.cast || [])
      .filter((movie) => movie.media_type === "movie")
      .sort((firstMovie, secondMovie) =>
        (secondMovie.release_date || "").localeCompare(
          firstMovie.release_date || "",
        ),
      );
  }, [actor]);

  // Actor TV Series
  const actorSeries = useMemo(() => {
    return (actor.combined_credits?.cast || [])
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

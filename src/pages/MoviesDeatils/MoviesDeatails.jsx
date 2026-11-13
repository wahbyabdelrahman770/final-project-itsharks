import { useParams } from "react-router-dom";
import { useMovie } from "../../contexts/Movie/MovieContext";
import { useEffect } from "react";

const MoviesDeatails = () => {
  const { movieID } = useParams();
  const { movieDetails } = useMovie();

  useEffect(() => {
    movieDetails(movieID);
  }, []);

  return <div>MoviesDeatails</div>;
};

export default MoviesDeatails;

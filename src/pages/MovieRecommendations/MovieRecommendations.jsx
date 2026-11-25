import { Link } from "react-router-dom";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import Loading from "../../components/Loading";
import MovieCard from "../../components/MovieCard";

const MovieRecommendations = () => {
    const { movieID, movieDetails, recommended, loading } = useMovieDetails();

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Link to={`/movies/${movieID}`} className="inline-block mt-8 ml-8 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924] active:text-[#e50924] active:border-b-[#e50924]">← Back to {movieDetails?.title}</Link>
            <h1 className="text-white text-4xl text-center font-semibold my-8">All Recommendations for {`"${movieDetails?.title}"`}</h1>

            <div className="w-[93%] mx-auto mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommended?.map(movie => <MovieCard key={Math.random()} movie={movie} />)}
            </div>
        </div>
    );
};

export default MovieRecommendations;
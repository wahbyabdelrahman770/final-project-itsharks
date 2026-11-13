import { Link } from "react-router-dom";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";

const PlayIcon = ({ className, fill }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill={fill}
        >
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
        </svg>
    );
};

const Overview = () => {
    const { movieDetails, background, poster, release_date, rated, rating, trailerLink } = useMovieDetails();
    return (
        <div className="w-full min-h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${window.innerWidth < 600 ? poster : background})` }}>
            <div className="w-full min-h-screen py-8 px-10 pt-32 relative flex items-end gap-x-8 bg-[linear-gradient(90deg,#090b10_8%,#090b10d6_42%,#090b103d_75%),linear-gradient(0deg,#090b10_0%,transparent_32%)]">
                <Link to="/movies" className="absolute top-[5%] left-[5%] text-[#898989] hover:text-white duration-150">&lt; Back to movies</Link>

                <section className="w-[20%] min-w-37.5 hidden lg:block">
                    <img src={poster} className="w-full" />
                </section>

                <section className="flex flex-col items-start">
                    <div className="flex justify-start items-center gap-x-1">
                        <span className="inline-block w-6 h-[2.05px] bg-[#e50924]"></span>
                        <p className="text-[#d8d9dc] text-[14px] font-semibold">FEATURED FILM</p>
                    </div>

                    <h1 className="w-3/4 my-3 text-6xl text-white font-serif">{movieDetails?.title}</h1>
                    <p className="text-[#7f858f] uppercase text-[14px] mb-2">{movieDetails?.original_title}</p>
                    {movieDetails?.tagline && <p className="my-6 font-serif text-[#c0c4cb] text-[17px] italic">{`"${movieDetails.tagline}"`}</p>}

                    <div className="text-[#d4d6db] text-[1rem] font-semibold flex flex-row items-center flex-wrap gap-2">
                        ⭐<span className="text-yellow-300 font-bold">{rating}</span><span className="text-xs">/10</span>
                        <span className="text-xs text-[#cec9c9]"> • </span>
                        <span>{release_date}</span>
                        <span className="text-xs text-[#cec9c9]"> • </span>
                        <span>{movieDetails?.runtime} min</span>
                        <span className="text-xs text-[#cec9c9]"> • </span>
                        <span className="border p-1">{rated}</span>
                    </div>

                    <div className="w-full my-6 flex flex-row items-center flex-wrap gap-2">
                        {movieDetails?.genres ? (movieDetails.genres).map(genre => <p key={genre.name} className="uppercase text-[#e1e2e5] border-[0.5px] rounded-[20px] p-[6px_12px] text-[13px]">{genre.name}</p>) : ""}
                    </div>

                    <p className="text-[#afb3bc] max-w-152.5 text-[14px]">{movieDetails?.overview}</p>

                    <Link to={trailerLink} target="blank" className="py-4 px-0 mt-7 w-41.25 bg-[#e50924] text-white text-[12px] font-semibold uppercase rounded-md cursor-pointer flex justify-around items-center duration-150 hover:shadow-[0px_0px_17px_2px_#eb3c3c]"><PlayIcon fill="white" className="w-6 h-6" /> Watch Trailer</Link>
                </section>
            </div>
        </div>
    );
};

export default Overview;
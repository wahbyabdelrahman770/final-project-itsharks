import { Link } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";

import { useHome } from "../../contexts/Home/HomeContext";
import { useMovie } from "../../contexts/Movie/MovieContext";
import Loading from "../Loading";
import ErrorState from "../ErrorState";

const IMAGE_URL = "https://image.tmdb.org/t/p/";

function TrendMovie() {
  const { popularMovies, loading, error, retry } = useHome();
  const { moviesGenres } = useMovie();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorState onRetry={retry} />;
  }
  if (!popularMovies?.length) {
    return <ErrorState onRetry={retry} />;
  }

  const movie = popularMovies[5] || popularMovies[0];

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  // Movie Genre
  const genreName =
    moviesGenres.find((genre) => movie.genre_ids?.includes(genre.id))?.name ||
    "Movie";

  // Rating
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <section className="w-full overflow-hidden bg-[#090a0e] px-4 py-16 text-white sm:px-6 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center overflow-hidden bg-[#11141d] lg:grid-cols-[1.15fr_0.85fr]">
        {/* Movie Image */}
        <div className="group relative aspect-16/10 overflow-hidden sm:aspect-video lg:aspect-auto lg:h-full lg:min-h-120">
          <img
            src={
              movie.backdrop_path
                ? `${IMAGE_URL}original${movie.backdrop_path}`
                : movie.poster_path
                  ? `${IMAGE_URL}w780${movie.poster_path}`
                  : "/placeholder.png"
            }
            alt={movie.title || "Movie"}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#11141d]/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-[#11141d]" />

          {/* Featured Number Mobile */}
          <span className="absolute bottom-4 left-5 font-serif text-7xl font-bold text-white/20 sm:text-8xl lg:hidden">
            01
          </span>
        </div>

        {/* Movie Information */}
        <div className="relative flex min-h-full flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-10 xl:px-14">
          {/* Label */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-0.5 w-7 bg-red-600" />

            <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-400 sm:text-xs">
              #1 Trending This Week
            </p>
          </div>

          {/* Movie Title */}
          <h2 className="mb-5 font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
            {movie.title}

            <span className="mt-1 block italic text-red-600">Featured.</span>
          </h2>

          {/* Overview */}
          <p className="mb-7 line-clamp-3 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            {movie.overview ||
              "Discover this featured movie and explore its story."}
          </p>

          {/* Movie Details */}
          <div className="mb-9 flex flex-wrap items-center gap-x-3 gap-y-3 text-xs font-semibold text-gray-400 sm:text-sm">
            <span className="flex items-center gap-2 text-yellow-400">
              <FaStar />
              {rating}
            </span>

            <span>•</span>

            <span>{releaseYear}</span>

            <span>•</span>

            <span>{genreName}</span>
          </div>

          {/* Discover Button */}
          <Link
            to={`/movies/${movie.id}`}
            className="group flex w-fit items-center gap-4 border-b border-white/20 pb-3 text-[11px] font-bold uppercase tracking-wider transition hover:border-red-600"
          >
            Discover {movie.title}
            <FaArrowRight className="transition duration-300 group-hover:translate-x-2" />
          </Link>

          {/* Decorative Number Desktop */}
          <span className="pointer-events-none absolute -bottom-16 right-5 hidden font-serif text-[180px] leading-none text-white/[0.035] lg:block xl:text-[220px]">
            01
          </span>
        </div>
      </div>
    </section>
  );
}

export default TrendMovie;

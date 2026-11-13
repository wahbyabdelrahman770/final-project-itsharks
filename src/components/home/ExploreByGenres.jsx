import { useEffect } from "react";
import { useMovie } from "../../contexts/Movie/MovieContext";
import { useHome } from "../../contexts/Home/HomeContext";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const IMAGE_URL = "https://image.tmdb.org/t/p/w780";

function ExploreGenres() {
  const { moviesGenres } = useMovie();
  const { genreMovies, loadGenreMovies } = useHome();

  useEffect(() => {
    if (moviesGenres?.length) {
      loadGenreMovies(moviesGenres);
    }
  }, [moviesGenres]);

  return (
    <section className="bg-[#090a0e] px-6 py-16 text-white md:px-12 lg:px-16">
      <div className="mb-10 flex items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[3px] text-red-600">
            Find your mood
          </p>

          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Explore by Genre
          </h2>
        </div>

        <Link
          to="/movies"
          className="group mb-2 hidden items-center gap-4 border-b border-white/20 pb-2 text-xs font-bold tracking-wider transition hover:border-red-600 md:flex"
        >
          Browse all genres
          <FaArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {genreMovies.map((genre) => (
          <Link
            to="/movies"
            key={genre.genreId}
            className="group relative flex h-40 items-end overflow-hidden rounded-lg border border-white/10 bg-[#11141d] p-5 transition duration-500 hover:border-red-600 sm:h-52"
          >
            {/* Background Image */}

            {genre.movie && (
              <img
                src={`${IMAGE_URL}${
                  genre.movie.backdrop_path || genre.movie.poster_path
                }`}
                alt={genre.genreName}
                className="absolute inset-0 z-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            )}

            <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/40 to-transparent" />

            <div className="absolute inset-0 z-10 bg-linear-to-t from-red-600/80 via-red-500/20 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <h3 className="relative z-20 text-lg font-bold tracking-wide text-white transition duration-300 group-hover:text-white sm:text-xl">
              {genre.genreName}
            </h3>
          </Link>
        ))}
      </div>

      <Link
        to="/movies"
        className="group mt-8 flex w-fit items-center gap-3 border-b border-white/20 pb-2 text-xs font-bold tracking-wider transition hover:border-red-600 md:hidden"
      >
        Browse all genres
        <FaArrowRight className="transition group-hover:translate-x-1" />
      </Link>
    </section>
  );
}

export default ExploreGenres;

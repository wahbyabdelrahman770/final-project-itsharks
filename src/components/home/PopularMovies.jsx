import { Link } from "react-router-dom";
import { FaStar, FaPlay, FaArrowRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";

import { useHome } from "../../contexts/Home/HomeContext";
import { useMovie } from "../../contexts/Movie/MovieContext";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import ErrorState from "./../ErrorState";
import Loading from "./../Loading";

const IMAGE_URL = "https://image.tmdb.org/t/p/";

function PopularMovies() {
  const { popularMovies, loading } = useHome();
  const { moviesGenres } = useMovie();
  if (loading) {
    return <Loading />;
  }

  if (!popularMovies || popularMovies.length === 0) {
    return <ErrorState />;
  }

  return (
    <section className="w-full overflow-hidden bg-[#090a0e] px-6 py-16 text-white md:px-12 lg:px-16">
      {/* Section Header */}
      <div className="mb-10 flex items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[3px] text-red-600">
            CURATED FOR YOU
          </p>

          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Popular Movies
          </h2>
        </div>

        <Link
          to="/movies"
          className="group mb-2 hidden items-center gap-4 border-b border-white/20 pb-2 text-xs font-bold tracking-wider transition hover:border-red-600 md:flex"
        >
          VIEW ALL MOVIES
          <FaArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Movies Slider */}
      <Swiper
        modules={[FreeMode, Scrollbar]}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
        }}
        scrollbar={{
          draggable: true,
          hide: false,
          dragSize: "auto",
        }}
        className="popular-swiper w-full overflow-hidden! pb-12! [&_.swiper-scrollbar]:h-2! [&_.swiper-scrollbar]:rounded-full! [&_.swiper-scrollbar]:bg-gray-900! [&_.swiper-scrollbar-drag]:rounded-full! [&_.swiper-scrollbar-drag]:bg-gray-700! [&_.swiper-scrollbar-drag]:cursor-grab! [&_.swiper-scrollbar-drag]:active:cursor-grabbing"
      >
        {popularMovies.slice(0, 10).map((movie) => {
          const releaseYear = movie.release_date
            ? movie.release_date.slice(0, 4)
            : "N/A";

          // Get Genre Name from MovieContext API
          const genreName =
            moviesGenres.find((genre) => movie.genre_ids?.includes(genre.id))
              ?.name || "MOVIE";

          return (
            <SwiperSlide key={movie.id} className="h-auto">
              {/* Movie Card */}
              <Link
                to={`/movies/${movie.id}`}
                className="group block h-full cursor-pointer"
              >
                {/* Poster */}
                <div className="relative mb-4 aspect-2/3 overflow-hidden bg-gray-900">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_URL}w500${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded bg-black/85 px-3 py-2 text-xs font-bold text-yellow-400">
                    <FaStar />
                    {movie.vote_average?.toFixed(1)}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="flex size-16 items-center justify-center rounded-full border border-white/70 text-white transition duration-300 group-hover:scale-110 group-hover:border-red-600 group-hover:bg-red-600">
                      <FaPlay className="ml-1 text-xl" />
                    </div>
                  </div>
                </div>

                {/* Movie Information */}
                <div>
                  <h3 className="mb-2 truncate text-base font-bold transition group-hover:text-red-500">
                    {movie.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs tracking-wide text-gray-500">
                    <span>{releaseYear}</span>
                    <span>•</span>
                    <span className="truncate">{genreName}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Mobile View All */}
      <Link
        to="/movies"
        className="mt-4 flex items-center justify-center gap-3 text-xs font-bold tracking-wider md:hidden"
      >
        VIEW ALL MOVIES
        <FaArrowRight />
      </Link>
    </section>
  );
}

export default PopularMovies;

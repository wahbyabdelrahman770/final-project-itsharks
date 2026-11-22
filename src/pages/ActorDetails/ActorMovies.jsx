import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar, FaFilm, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";

const ActorMovies = ({ movies = [] }) => {
  const swiperRef = useRef(null);

  if (!movies.length) {
    return (
      <p className="mt-16 text-center text-gray-400">
        No movies available for this actor.
      </p>
    );
  }

  return (
    <section className="mt-20">
      {/* Section Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#e50924]">
            Explore The Career
          </span>

          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            Filmography
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            Discover movies featuring this actor.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous movies"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#202127] text-white transition duration-300 hover:border-[#e50924] hover:bg-[#e50924]"
          >
            <FaArrowLeft />
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next movies"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e50924] text-white transition duration-300 hover:bg-red-700"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Movies Carousel */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={18}
        slidesPerView={1.5}
        grabCursor={true}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-5!"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.credit_id || movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              className="group block h-full overflow-hidden rounded-xl border border-white/10 bg-[#15161b] transition duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_10px_35px_#e5092420]"
            >
              {/* Movie Poster */}
              <div className="relative aspect-2/3 overflow-hidden bg-[#202127]">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    <FaFilm className="text-5xl" />
                  </div>
                )}

                {/* Movie Rating */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/80 px-2 py-1 text-xs font-bold text-white">
                  <FaStar className="text-yellow-400" />
                  {typeof movie.vote_average === "number" &&
                  movie.vote_count > 0
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="rounded-full border border-white/30 bg-[#e50924] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
                    View Details
                  </span>
                </div>
              </div>

              {/* Movie Information */}
              <div className="p-4">
                <h3 className="line-clamp-1 font-bold text-white transition group-hover:text-[#e50924]">
                  {movie.title || "Untitled Movie"}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {movie.release_date?.slice(0, 4) || "Unknown Year"}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Movies Count */}
      <p className="mt-5 text-right text-xs text-gray-500">
        {movies.length} Movies
      </p>
    </section>
  );
};

export default ActorMovies;

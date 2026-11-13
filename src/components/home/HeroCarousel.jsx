import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaPlay, FaArrowRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import { useHome } from "../../contexts/Home/HomeContext";

import "swiper/css";
import "swiper/css/effect-fade";
import Loading from "../Loading";

const IMAGE_URL = "https://image.tmdb.org/t/p/";

function HeroCarousel() {
  const { heroMovies, loading } = useHome();

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  if (loading) {
    return <Loading />;
  }

  if (!heroMovies || heroMovies.length === 0) {
    return (
      <section className="flex h-screen items-center justify-center bg-[#090a0e] text-white">
        No Movies Available
      </section>
    );
  }

  const movie = heroMovies[activeIndex];

  const title = movie.title || movie.name;

  const releaseYear =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

  return (
    <section className="relative isolate h-screen min-h-162.5 overflow-hidden bg-[#090a0e] text-white">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={heroMovies.length > 1}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="absolute! inset-0! z-0! h-full! w-full!"
      >
        {heroMovies.map((item) => (
          <SwiperSlide key={item.id} className="h-full!">
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${IMAGE_URL}original${item.backdrop_path})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-[#090a0e] via-[#090a0e]/90 via-40% to-transparent" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-[#090a0e] via-transparent to-black/30" />

      <div className="relative z-20 mx-auto flex h-full max-w-screen-2xl items-center justify-between gap-10 px-8 py-16 lg:px-16">
        <div className="w-full max-w-3xl">
          <div className="mb-10 flex items-center gap-3 text-xs font-bold tracking-widest">
            <span className="h-0.5 w-8 bg-red-600" />
            FEATURED THIS WEEK
          </div>

          <h1 className="mb-6 max-w-3xl font-serif text-6xl leading-none font-bold tracking-tight md:text-7xl lg:text-8xl">
            {title}
          </h1>

          <p className="mb-8 font-serif text-xl italic text-gray-300">
            Discover your next favorite movie.
          </p>

          <div className="mb-7 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2 font-bold text-yellow-400">
              <FaStar />
              {movie.vote_average?.toFixed(1)}
            </span>

            <span className="text-gray-300">{releaseYear}</span>

            <span className="text-gray-400">•</span>

            <span className="text-gray-300">Now Playing</span>

            <span className="text-gray-400">•</span>

            <span className="text-gray-300">Movie</span>
          </div>

          {/* Genres */}
          <div className="mb-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/30 px-4 py-2 text-xs">
              FEATURED
            </span>

            <span className="rounded-full border border-white/30 px-4 py-2 text-xs">
              CINEMA
            </span>
          </div>

          <p className="mb-9 max-w-3xl text-sm leading-8 text-gray-300 md:text-base">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-7">
            <Link
              to="/movies"
              className="flex items-center gap-5 rounded bg-red-600 px-7 py-5 text-xs font-bold tracking-wider transition duration-300 hover:-translate-y-1 hover:bg-red-700"
            >
              EXPLORE MOVIE
              <FaArrowRight />
            </Link>

            <Link
              to={`/movies/${movie.id}`}
              className="group flex items-center gap-4 text-xs font-bold tracking-wider"
            >
              <span className="flex size-15 items-center justify-center rounded-full border border-white/40 transition duration-300 group-hover:border-red-600 group-hover:bg-red-600">
                <FaPlay className="text-xs" />
              </span>
              WATCH TRAILER
            </Link>
          </div>
        </div>

        {/* Right Movie Poster */}
        <div className="relative mr-8 hidden w-64 shrink-0 lg:block xl:w-72">
          <img
            src={
              movie.poster_path ? `${IMAGE_URL}w500${movie.poster_path}` : ""
            }
            alt={title}
            className="aspect-2/3 w-full object-cover shadow-2xl"
          />

          <span className="absolute -right-12 -bottom-5 font-serif text-8xl font-light text-white/30">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Right Pagination */}
      <div className="absolute top-1/2 right-8 z-30 flex -translate-y-1/2 flex-col items-center gap-3">
        {heroMovies.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              swiperRef.current?.slideToLoop(index);
            }}
            className={`w-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "h-9 bg-red-600"
                : "h-2 bg-gray-500 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Label */}
      <div className="absolute bottom-8 left-8 z-30 hidden rotate-180 text-xs tracking-widest text-gray-500 [writing-mode:vertical-rl] md:block">
        SCROLL TO DISCOVER
      </div>
    </section>
  );
}

export default HeroCarousel;

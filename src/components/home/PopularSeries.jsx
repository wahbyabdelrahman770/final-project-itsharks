import { Link } from "react-router-dom";
import { FaStar, FaPlay, FaArrowRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";

import { useSeries } from "../../contexts/Series/SeriesContext";

import Loading from "../Loading";
import ErrorState from "../ErrorState";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

const IMAGE_URL = "https://image.tmdb.org/t/p/";

function PopularSeries() {
  const { series, seriesGenres, loading, getSeries } = useSeries();

  if (loading) {
    return <Loading />;
  }

  if (!series?.length) {
    return <ErrorState onRetry={getSeries} />;
  }

  return (
    <section className="w-full overflow-hidden bg-[#090a0e] px-6 py-16 text-white md:px-12 lg:px-16">
      {/* Section Header */}
      <div className="mb-10 flex items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[3px] text-red-600">
            STORIES WORTH WATCHING
          </p>

          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            Popular TV Series
          </h2>
        </div>

        <Link
          to="/series"
          className="group mb-2 hidden items-center gap-4 border-b border-white/20 pb-2 text-xs font-bold tracking-wider transition hover:border-red-600 md:flex"
        >
          VIEW ALL SERIES
          <FaArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Series Slider */}
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
        className="popular-series-swiper w-full overflow-hidden! pb-12! [&_.swiper-scrollbar]:h-2! [&_.swiper-scrollbar]:rounded-full! [&_.swiper-scrollbar]:bg-gray-900! [&_.swiper-scrollbar-drag]:rounded-full! [&_.swiper-scrollbar-drag]:bg-gray-700! [&_.swiper-scrollbar-drag]:cursor-grab! [&_.swiper-scrollbar-drag]:active:cursor-grabbing"
      >
        {series.slice(0, 10).map((item) => {
          // First Air Year
          const releaseYear = item.first_air_date
            ? item.first_air_date.slice(0, 4)
            : "N/A";

          // Series Genre
          const genreName =
            seriesGenres.find((genre) => item.genre_ids?.includes(genre.id))
              ?.name || "TV Series";

          return (
            <SwiperSlide key={item.id} className="h-auto">
              {/* Series Card */}
              <Link
                to={`/series/${item.id}`}
                className="group block h-full cursor-pointer"
              >
                {/* Poster */}
                <div className="relative mb-4 aspect-2/3 overflow-hidden bg-gray-900">
                  <img
                    src={
                      item.poster_path
                        ? `${IMAGE_URL}w500${item.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded bg-black/85 px-3 py-2 text-xs font-bold text-yellow-400">
                    <FaStar />
                    {item.vote_average?.toFixed(1) || "N/A"}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="flex size-16 items-center justify-center rounded-full border border-white/70 text-white transition duration-300 group-hover:scale-110 group-hover:border-red-600 group-hover:bg-red-600">
                      <FaPlay className="ml-1 text-xl" />
                    </div>
                  </div>
                </div>

                {/* Series Information */}
                <div>
                  <h3 className="mb-2 truncate text-base font-bold transition group-hover:text-red-500">
                    {item.name}
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
        to="/series"
        className="mt-4 flex items-center justify-center gap-3 text-xs font-bold tracking-wider md:hidden"
      >
        VIEW ALL SERIES
        <FaArrowRight />
      </Link>
    </section>
  );
}

export default PopularSeries;

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSeries } from "../../contexts/Series/SeriesContext";

const SeriesCard = ({
  ser: {
    backdrop_path,
    original_name,
    first_air_date,
    vote_average,
    genre_ids,
  },
}) => {
  const { seriesGenres } = useSeries();
  return (
    <div className="group flex flex-col gap-4 cursor-pointer w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(20%-16px)]">
      <div className="relative w-full aspect-2/3 overflow-hidden bg-[#151515]">
        <img
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${backdrop_path}`}
          alt=""
        />

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#171717] px-3 py-2 rounded-sm text-yellow-400 text-sm font-bold">
          ⭐ {vote_average.toFixed(1)}
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Link
              to=""
              className="flex items-center justify-center w-full h-full"
            >
              <FaArrowRight className="text-[14px]" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-white group-hover:text-red-500 transition-colors">
          {original_name}
        </h3>

        <div className="flex items-center gap-3 text-[11px] tracking-wider text-gray-400">
          <span>{first_air_date.slice(0, 4)}</span>
          <span>•</span>
          <span>
            {seriesGenres.map((gen) => {
              if (gen.id == genre_ids[0]) {
                return gen.name;
              }
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;

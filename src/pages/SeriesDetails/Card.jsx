import { FaPlay, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getTvGenre } from "../../utils/genres";
import { ImageWithLoading } from "../../components/Movie-And-Series-Media-Page-Components/MovieAndSeriesMediaComponents";

const Card = ({
  series: { id, poster_path, name, vote_average, first_air_date, genre_ids },
}) => {
  return (
    <Link to={`/series/${id}`} className="group block h-full cursor-pointer">
      {/* Poster */}
      <div className="relative mb-4 aspect-2/3 overflow-hidden bg-gray-900">
        <ImageWithLoading
          src={`https://media.themoviedb.org/t/p/original${poster_path}`}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded bg-black/85 px-3 py-2 text-xs font-bold text-yellow-400">
          <FaStar />
          {vote_average?.toFixed(1)}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex size-16 items-center justify-center rounded-full border border-white/70  transition duration-300 group-hover:scale-110 group-hover:border-red-600 group-hover:bg-red-600">
            <FaPlay className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Movie Information */}
      <div>
        <h3 className="mb-2  truncate text-base font-bold transition group-hover:text-red-500">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-xs tracking-wide text-gray-500">
          <span>{first_air_date.slice(0, 4)}</span>
          <span>•</span>
          <span className="truncate">{getTvGenre(genre_ids[0])}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;

import { FaPlay, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getMovieGenre } from "../../utils/genres";
import { ImageWithLoading } from "../../components/Movie-And-Series-Media-Page-Components/MovieAndSeriesMediaComponents";

const Card = ({
  className,
  movie: { id, poster_path, title, vote_average, release_date, genre_ids },
}) => {
  return (
    <Link
      to={`/movies/${id}`}
      className={`group block h-full cursor-pointer ${className}`}
    >
      {/* Poster */}
      <div className="relative mb-4 aspect-2/3 overflow-hidden bg-gray-900">
        <ImageWithLoading
          src={`https://media.themoviedb.org/t/p/original${poster_path}`}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-active:scale-110"
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded bg-black/85 px-3 py-2 text-xs font-bold text-yellow-400">
          <FaStar />
          {vote_average?.toFixed(1)}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 transition duration-300 group-hover:opacity-100 group-active:opacity-100">
          <div className="flex size-16 items-center justify-center rounded-full border border-white/70 text-white transition duration-300 group-hover:scale-110 group-hover:border-red-600 group-hover:bg-red-600 group-active:scale-110 group-active:border-red-600 group-active:bg-red-600">
            <FaPlay className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Movie Information */}
      <div>
        <h3 className="mb-2  truncate text-base font-bold transition group-hover:text-red-500 group-active:text-red-500">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-xs tracking-wide text-gray-500">
          <span>{release_date.slice(0, 4)}</span>
          <span>•</span>
          <span className="truncate">{getMovieGenre(genre_ids[0])}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;

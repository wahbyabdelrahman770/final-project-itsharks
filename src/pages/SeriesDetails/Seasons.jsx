import { Link } from "react-router-dom";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import { FaPlay, FaStar } from "react-icons/fa";

export const Season = ({ to, season: { name, season_number, poster_path, air_date, vote_average, episode_count } }) => {
    return (
        <Link
            to={to}
            className="group block h-full cursor-pointer"
        >
            {/* Poster */}
            <div className="relative mb-4 aspect-2/3 overflow-hidden bg-gray-900">
                <img
                    src={`https://media.themoviedb.org/t/p/original${poster_path}`}
                    alt={name}
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
                <h3 className="mb-2 text-white truncate text-base font-bold transition group-hover:text-red-500 group-active:text-red-500">
                    {name}
                </h3>

                <div className="flex items-center gap-2 text-xs tracking-wide text-gray-500">
                    <span>{air_date?.slice(0, 4)}</span>
                    <span>•</span>
                    <span className="truncate">{episode_count} Episodes</span>
                </div>
            </div>
        </Link>
    );
};

const Seasons = () => {
    const { seasons } = useSeriesDetails();
    const firstFiveSeasons = seasons.slice(0, 5);

    return (
        <div className="w-[93%] mx-auto my-8">
            <div className="mb-4 flex flex-col">
                <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">the complete journey</span>
                <section className="flex flex-row justify-between items-end">
                    <p className="mt-2 font-serif text-[1.9rem] text-white font-medium">Seasons</p>
                    {seasons.length > 5 && <Link to="seasons" className="text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924] active:text-[#e50924] active:border-b-[#e50924]">View All Seasons →</Link>}
                </section>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {firstFiveSeasons?.map(season => <Season to={`season/${season?.season_number}`} key={Math.random()} season={season} />)}
            </div>
        </div>
    );
};

export default Seasons;
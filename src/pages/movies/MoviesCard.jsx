import { Link } from "react-router-dom";

export default function MoviesCard({
  movie: { backdrop_path, original_title, release_date, vote_average },
}) {
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
            <Link to="">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-white group-hover:text-red-500 transition-colors">
          {original_title}
        </h3>

        <div className="flex items-center gap-3 text-[11px] tracking-wider text-gray-400">
          <span>{release_date.slice(0, 4)}</span>
          <span>•</span>
          <span>SCI-FI</span>
        </div>
      </div>
    </div>
  );
}

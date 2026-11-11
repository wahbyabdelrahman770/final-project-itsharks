import MoviesCard from "./MoviesCard";
import { useMovie } from "../../contexts/Movie/MovieContext";

export default function Movies() {
  const {
    movies,
    filteredMovies,
    movieLength,
    page,
    nextPage,
    previousPage,
    getMovies,
    getTopRatingMovies,
    getNewestMovies,
  } = useMovie();
  return (
    <div className="min-h-screen bg-[#08090d] text-white">
      <main className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Hero */}
        <section className="relative flex flex-col justify-center gap-7 py-24 border-b border-white/10">
          <span className="text-xs font-bold tracking-[4px] text-gray-300">
            <span className="text-red-600">━━</span> THE COMPLETE COLLECTION
          </span>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight">
                Explore Movies<span className="text-red-600">.</span>
              </h1>

              <p className="max-w-xl text-gray-400 leading-7 text-sm md:text-base">
                Discover exceptional stories, from celebrated masterpieces to
                the next thing everyone will be talking about.
              </p>
            </div>

            <div className="flex flex-col lg:items-end">
              <span className="text-5xl font-serif font-bold">
                {movieLength}
              </span>
              <span className="text-[10px] tracking-widest text-gray-400">
                TITLES TO DISCOVER
              </span>
            </div>
          </div>
        </section>

        {/* Search & Sort */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-7 py-9">
          <div className="flex items-center gap-4 w-full md:w-120 border-b border-white/10 pb-4">
            <span className="text-gray-400 text-xl">⌕</span>
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest text-gray-400 font-medium">
              SORT BY
            </span>
            <select
              onChange={(e) => {
                const value = e.target.value;
                value == "popular" && getMovies();
                value == "Rating" && getTopRatingMovies();
                value == "Newest" && getNewestMovies();
              }}
              className="bg-[#11131a] text-white border border-white/10 px-4 py-2 text-sm outline-none cursor-pointer rounded hover:border-white/30 transition-colors"
            >
              <option value="popular" className="bg-[#11131a] text-white">
                Popularity
              </option>
              <option value="Rating" className="bg-[#11131a] text-white">
                Rating
              </option>
              <option value="Newest" className="bg-[#11131a] text-white">
                Newest
              </option>
            </select>
          </div>
        </section>

        {/* Categories */}
        <section className="flex flex-wrap items-center gap-2 mb-16">
          <button className="rounded-full bg-red-600 text-white px-6 py-2.5 text-[9px] font-bold tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer">
            ALL
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            ACTION
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            DRAMA
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            Science Fiction
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            COMEDY
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            CRIME
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            FANTASY
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            MYSTERY
          </button>
          <button
            // onClick={filteredMovies}
            className="rounded-full bg-black text-[#969da9] border border-white/15 px-6 py-2.5 text-[9px] font-bold tracking-wider hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            ROMANCE
          </button>
        </section>

        {/* Results */}
        <section className="flex justify-between items-center border-b border-white/10 pb-5 mb-7">
          <p className="text-[11px] tracking-wider text-gray-400">
            SHOWING <span className="text-white">20</span> OF 40 RESULTS
          </p>

          <span className="text-[11px] tracking-wider text-gray-400">
            20 PER PAGE
          </span>
        </section>

        {/* Movies */}
        <section className="flex flex-wrap items-start gap-x-5 gap-y-12">
          {movies.map((movie) => {
            return <MoviesCard key={movie.id} movie={movie} />;
          })}
        </section>

        {/* Pagination */}
        <section className="flex justify-center items-center gap-2 py-24">
          <button
            disabled={page <= 1 ? true : false}
            onClick={previousPage}
            className={`flex items-center gap-3 px-3 py-3 text-xs  ${page > 1 ? "hover:text-white text-gray-400 cursor-pointer" : "text-gray-600"} transition-colors`}
          >
            ❮ PREVIOUS
          </button>

          <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
            {page}
          </div>
          <div className="w-10 h-10 border border-white/10 bg-black/40 text-gray-400 flex items-center justify-center text-sm font-medium">
            {page + 1}
          </div>

          <button
            onClick={nextPage}
            className="flex items-center gap-3 px-3 py-3 text-xs text-gray-400 cursor-pointer hover:text-white transition-colors"
          >
            NEXT ❯
          </button>
        </section>
      </main>
    </div>
  );
}

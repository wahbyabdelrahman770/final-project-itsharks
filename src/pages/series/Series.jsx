import { useSeries } from "../../contexts/Series/SeriesContext";
import Loading from "./../../components/Loading";
import ErrorState from "../../components/ErrorState";
import NotFound from "../../components/NotFound";
import { useTheme } from "../../contexts/ThemeProvider";
import SeriesCard from "../../components/SeriesCard";

const Series = () => {
  const {
    series,
    seriesLength,
    page,
    setPage,
    nextPage,
    previousPage,
    getSeries,
    getRatingSeries,
    getNewestSeries,
    loading,
    error,
    active,
    setActive
  } = useSeries();

  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      <main className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Hero */}
        <section className="relative flex flex-col justify-center gap-7 py-24 border-b border-white/10">
          <span className="text-xs font-bold tracking-[4px] flex flex-row items-center gap-2">
            <span className="inline-block w-6 h-[2.05px] bg-[#e50924]"></span> THE COMPLETE COLLECTION
          </span>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight">
                Explore TV Series<span className="text-red-600">.</span>
              </h1>

              <p className="max-w-xl leading-7 text-sm md:text-base">
                Discover exceptional stories, from celebrated masterpieces to
                the next thing everyone will be talking about.
              </p>
            </div>

            <div className="flex flex-col lg:items-end">
              <span className="text-5xl font-serif font-bold">
                {seriesLength}
              </span>
              <span className="text-[10px] tracking-widest">
                TITLES TO DISCOVER
              </span>
            </div>
          </div>
        </section>

        {/* Search & Sort */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-7 py-9">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-widest font-medium">
              SORT BY
            </span>
            <select
              onChange={(e) => {
                const value = e.target.value;
                value == "popular" && getSeries();
                value == "Rating" && getRatingSeries();
                value == "On The Air" && getNewestSeries();
              }}
              className="border border-gray-900 px-4 py-2 text-sm outline-none cursor-pointer rounded transition-colors"
            >
              <option value="popular" className="">
                Popularity
              </option>
              <option value="Rating" className="">
                Rating
              </option>
              <option value="On The Air" className="">
                On The Air
              </option>
            </select>
          </div>
        </section>

        {/* Categories */}
        <section className="flex flex-wrap items-center gap-2 mb-16">
          <button
            onClick={() => {
              setActive("ALL");
              setPage(1);
            }}
            className={`${active === "ALL" ? "bg-red-600 shadow-lg shadow-red-600/30" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            ALL
          </button>

          <button
            onClick={() => {
              setActive("Animation");
              setPage(1);
            }}
            className={`${active === "Animation" ? "bg-red-600" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            ANIMATION
          </button>

          <button
            onClick={() => {
              setActive("Action & Adventure");
              setPage(1);
            }}
            className={`${active === "Action & Adventure" ? "bg-red-600" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            ACTION & ADVENTURE
          </button>

          <button
            onClick={() => {
              setActive("Drama");
              setPage(1);
            }}
            className={`${active === "Drama" ? "bg-red-600" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            DRAMA
          </button>

          <button
            onClick={() => {
              setActive("Comedy");
              setPage(1);
            }}
            className={`${active === "Comedy" ? "bg-red-600" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            COMEDY
          </button>

          <button
            onClick={() => {
              setActive("Crime");
              setPage(1);
            }}
            className={`${active === "Crime" ? "bg-red-600" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            CRIME
          </button>

          <button
            onClick={() => {
              setActive("Sci-Fi & Fantasy");
              setPage(1);
            }}
            className={`${active === "Sci-Fi & Fantasy" ? "bg-red-600" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            SCI-FI & FANTASY
          </button>

          <button
            onClick={() => {
              setActive("Mystery");
              setPage(1);
            }}
            className={`${active === "Mystery" ? "bg-red-600" : "border border-gray-900"} ${theme === "dark" ? "border-white" : "border-black"} hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white rounded-full px-6 py-2.5 text-[9px] font-bold tracking-wider transition-all cursor-pointer`}
          >
            MYSTERY
          </button>
        </section>

        {/* Results */}
        <section className="flex justify-between items-center border-b border-white/10 pb-5 mb-7">
          <p className="text-[11px] tracking-wider">
            SHOWING{" "}
            <span
              className={`${theme === "dark" ? "text-white font-bold" : "text-black font-bold"}`}
            >
              20
            </span>{" "}
            OF 40 RESULTS
          </p>

          <span className="text-[11px] tracking-wider">20 PER PAGE</span>
        </section>

        {/* Series */}
        {loading ? <Loading /> : <section className="grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-12">
          {series.map((ser) => {
            return <SeriesCard series={ser} key={ser.id} />;
          })}
          {error == true && <ErrorState />}
          {seriesLength == 0 && <NotFound />}
        </section>}

        {/* Pagination */}
        <section className="flex justify-center items-center gap-2 py-24">
          <button
            disabled={page <= 1 ? true : false}
            onClick={previousPage}
            className={`flex items-center gap-3 px-3 py-3 text-xs ${page > 1 ? "text-gray-400 cursor-pointer" : "text-gray-600"} transition-colors`}
          >
            ❮ PREVIOUS
          </button>

          <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
            {page}
          </div>
          <div className="w-10 h-10 border border-white/10 text-gray-400 flex items-center justify-center text-sm font-medium">
            {page + 1}
          </div>

          <button
            onClick={nextPage}
            className="flex items-center gap-3 px-3 py-3 text-xs text-gray-400 cursor-pointer transition-colors"
          >
            NEXT ❯
          </button>
        </section>
      </main>
    </div>
  );
};

export default Series;

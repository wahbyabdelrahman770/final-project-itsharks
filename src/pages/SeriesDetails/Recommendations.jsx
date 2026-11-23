import { Link } from "react-router-dom";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import SeriesCard from "../../components/SeriesCard";

const Recommendations = () => {
  const { recommendedSeries } = useSeriesDetails();
  return (
    <div className="w-[93%] mx-auto mt-8 mb-4">
      <div className="mb-4 flex flex-col">
        <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">
          keep discovering
        </span>

        <section className="flex flex-row justify-between items-end">
          <p className="mt-2 font-serif text-[1.9rem]  font-medium">
            You May Also Like
          </p>
          {recommendedSeries?.length > 5 && <Link to="recommendations" className=" uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924] active:text-[#e50924] active:border-b-[#e50924]">
            View All Recommendations →
          </Link>}
        </section>
      </div>

      <div className="mt-4 w-[95%] mx-auto md:w-full grid grid-cols-2 md:grid-cols-5 gap-4 space-y-3">
        {recommendedSeries.map((series) => (
          <SeriesCard key={Math.random()} series={series} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;

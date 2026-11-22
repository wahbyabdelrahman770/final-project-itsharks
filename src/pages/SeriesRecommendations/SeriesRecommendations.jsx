import { Link } from "react-router-dom";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import Card from "../SeriesDetails/Card";

const SeriesRecommendations = () => {
    const { seriesID, seriesDetails, recommendedSeries } = useSeriesDetails();
    return (
        <div>
            <Link to={`/series/${seriesID}`} className="inline-block mt-8 ml-8 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">← Back to {seriesDetails?.name}</Link>
            <h1 className="text-white text-4xl text-center font-semibold my-8">All Recommendations for {`"${seriesDetails?.name}"`}</h1>

            <div className="w-[93%] mx-auto mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedSeries?.map(series => <Card key={Math.random()} series={series} />)}
            </div>
        </div>
    );
};

export default SeriesRecommendations;
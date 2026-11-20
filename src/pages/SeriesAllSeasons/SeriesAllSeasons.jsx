import { Link } from "react-router-dom";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import { Season } from "../SeriesDetails/Seasons";
import Loading from "../../components/Loading";

const SeriesAllSeasons = () => {
    const { seasons, name, seriesID, loading } = useSeriesDetails();

    if (loading) { return <Loading />; }
    return (
        <div className="w-[93%] mx-auto my-8">
            <Link to={-1} className="inline-block mt-4 ml-4 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">← Back to {name}</Link>

            <h1 className="text-4xl text-white font-semibold text-center mb-8">All Seasons Of {`"${name}"`}</h1>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {seasons?.map(season => <Season to={`/series/${seriesID}/season/${season?.season_number}`} key={Math.random()} season={season} />)}
            </div>
        </div>
    );
};

export default SeriesAllSeasons;
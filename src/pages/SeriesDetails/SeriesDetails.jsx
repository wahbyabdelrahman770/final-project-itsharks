import DetailsLoading from "../../components/DetailsLoading";
import Media from "../../components/Movie-And-Series-Details/Media";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import Credits from "./Credits";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";
import Recommendations from "./Recommendations";
import Seasons from "./Seasons";

const SeriesDetails = () => {
	const { loading, backdrops, posters, logos, videos: { results: videos = [] } = {} } = useSeriesDetails();
	if (loading) {
		return <DetailsLoading />;
	}
	return (
		<div className="w-full">
			<Overview />
			<ProductionDetails />
			<Credits />
			<Seasons />
			<Media backdrops={backdrops} posters={posters} logos={logos} videos={videos} />
			<Recommendations />
		</div>
	);
};

export default SeriesDetails;
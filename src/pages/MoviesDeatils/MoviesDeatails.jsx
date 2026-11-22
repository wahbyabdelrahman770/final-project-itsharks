import DetailsLoading from "../../components/DetailsLoading";
import Media from "../../components/Movie-And-Series-Details/Media";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import Collection from "./Collection";
import Credits from "./Credits";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";
import Recommendations from "./Recommendations";

const MoviesDeatails = () => {
	const { loading, collectionID, backdrops, posters, logos, videos: { results: videos = [] } = {} } = useMovieDetails();
	if (loading) {
		return <DetailsLoading />;
	}
	return (
		<div className="w-full" >
			<Overview />
			<ProductionDetails />
			<Credits />
			{collectionID && <Collection />}
			<Media backdrops={backdrops} posters={posters} logos={logos} videos={videos} />
			<Recommendations />
		</div >
	);
};

export default MoviesDeatails;
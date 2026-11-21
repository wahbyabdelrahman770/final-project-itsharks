import ContentLoading from "../../components/ContentLoading";
import DetailsLoading from "../../components/DetailsLoading";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import Collection from "./Collection";
import Credits from "./Credits";
import Media from "./Media";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";
import Recommendations from "./Recommendations";

const MoviesDeatails = () => {
	const { loading, collectionID } = useMovieDetails();
	if (loading) {
		return <DetailsLoading />;
	}
	return (
		<div className="w-full" >
			<Overview />
			<ProductionDetails />
			<Credits />
			{collectionID && <Collection />}
			<Media />
			<Recommendations />
		</div >
	);
};

export default MoviesDeatails;
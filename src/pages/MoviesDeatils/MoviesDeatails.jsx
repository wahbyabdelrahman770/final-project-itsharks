import ContentLoading from "../../components/ContentLoading";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import Collection from "./Collection";
import Credits from "./Credits";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";
import Recommendations from "./Recommendations";

const MoviesDeatails = () => {
	const { loading, collectionID } = useMovieDetails();
	return (
		<ContentLoading loading={loading}>
			<div className="w-full" >
				<Overview />
				<ProductionDetails />
				<Credits />
				{collectionID && <Collection />}
				<Recommendations />
			</div >
		</ContentLoading>
	);
};

export default MoviesDeatails;
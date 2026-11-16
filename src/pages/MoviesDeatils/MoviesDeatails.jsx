import ContentLoading from "../../components/ContentLoading";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import Credits from "./Credits";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";
import Recommendations from "./Recommendations";

const MoviesDeatails = () => {
	const { loading } = useMovieDetails();
	return (
		<ContentLoading loading={loading}>
			<div className="w-full" >
				<Overview />
				<ProductionDetails />
				<Credits />
				<Recommendations />
			</div >
		</ContentLoading>
	);
};

export default MoviesDeatails;
import DetailsLoading from "../../components/DetailsLoading";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import Credits from "./Credits";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";
import Recommendations from "./Recommendations";
import Seasons from "./Seasons";

const SeriesDetails = () => {
	const { loading } = useSeriesDetails();
	if (loading) {
		return <DetailsLoading />;
	}
	return (
		<div className="w-full">
			<Overview />
			<ProductionDetails />
			<Credits />
			<Seasons />
			<Recommendations />
		</div>
	);
};

export default SeriesDetails;
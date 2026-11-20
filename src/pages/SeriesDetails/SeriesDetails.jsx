import Loading from "../../components/Loading";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import Credits from "./Credits";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";
import Recommendations from "./Recommendations";
import Seasons from "./Seasons";

const SeriesDetails = () => {
	const { loading } = useSeriesDetails();
	if (loading) {
		return <Loading />;
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
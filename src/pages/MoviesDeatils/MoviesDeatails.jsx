import Credits from "./Credits";
import Overview from "./Overview";
import ProductionDetails from "./ProductionDetails";

const MoviesDeatails = () => {
	return (
		<div className="w-full">
			<Overview />
			<ProductionDetails />
			<Credits />
		</div >
	);
};

export default MoviesDeatails;
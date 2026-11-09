import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Contact from "./pages/contact/Contact";

const App = () => {
	return (
		<div>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/series" element={<Series />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
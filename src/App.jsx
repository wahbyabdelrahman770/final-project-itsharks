import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Contact from "./pages/contact/Contact";
import MoviesDeatails from "./pages/MoviesDeatils/MoviesDeatails";
import MovieContext from "./contexts/Movie/MovieContext";

const App = () => {
  return (
    <MovieContext>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieID" element={<MoviesDeatails />} />
          <Route path="/series" element={<Series />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </MovieContext>
  );
};

export default App;

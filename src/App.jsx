import { Outlet, Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Contact from "./pages/contact/Contact";

import MoviesDeatails from "./pages/MoviesDeatils/MoviesDeatails";
import MovieContext from "./contexts/Movie/MovieContext";
import MovieDetailsProvider from "./contexts/Movie/MovieDetailsProvider";

import SeriesContext from "./contexts/Series/SeriesContext";
import SeriesDetails from "./pages/SeriesDetails/SeriesDetails";

import Footer from "./components/Footer";

import { HomeProvider } from "./contexts/Home/HomeContext";
import NavContext from "./contexts/Navbar/Navbar";
import MovieFullCast from "./pages/fullCast/MovieFullCast";
import SeriesDetailsProvider from "./contexts/Series/SeriesDetailsProvider";
import SeriesFullCast from "./pages/fullCast/SeriesFullCast";
import Season from "./pages/SeriesSeason/Season";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SeasonFullCast from "./pages/fullCast/SeasonFullCast";
import SeriesSeasonProvider from "./contexts/Series/SeriesSeasonProvider";
import SeriesAllSeasons from "./pages/SeriesAllSeasons/SeriesAllSeasons";

import ActorContext from "./contexts/Actor/ActorContext";
import ActorDetails from "./pages/ActorDetails/ActorDetails";
const App = () => {
  return (
    <NavContext>
      <HomeProvider>
        <MovieContext>
          <SeriesContext>
            <Nav />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/movies" element={<Movies />} />

              <Route
                path="/movies/:movieID"
                element={
                  <MovieDetailsProvider>
                    <Outlet />
                  </MovieDetailsProvider>
                }
              >
                <Route index element={<MoviesDeatails />} />
                <Route path="credits" element={<MovieFullCast />} />
              </Route>

              <Route path="/series" element={<Series />} />

              <Route
                path="/series/:seriesID"
                element={
                  <SeriesDetailsProvider>
                    <SeriesSeasonProvider>
                      <Outlet />
                    </SeriesSeasonProvider>
                  </SeriesDetailsProvider>
                }
              >
                <Route index element={<SeriesDetails />} />
                <Route path="credits" element={<SeriesFullCast />} />
                <Route path="seasons" element={<SeriesAllSeasons />} />
                <Route path="season/:seasonNumber" element={<Season />} />
                <Route
                  path="season/:seasonNumber/credits"
                  element={<SeasonFullCast />}
                />
              </Route>

              <Route
                path="/actor/:actorID"
                element={
                  <ActorContext>
                    <ActorDetails />
                  </ActorContext>
                }
              >
                <Route index element={<ActorDetails />} />
              </Route>
              <Route path="/contact" element={<Contact />} />

              <Route path="/login" element={<Login />} />
            </Routes>

            <Footer />
            <ScrollToTopButton />
          </SeriesContext>
        </MovieContext>
      </HomeProvider>
    </NavContext>
  );
};

export default App;

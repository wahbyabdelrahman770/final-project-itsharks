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

// Media Pages (master)
import MovieMedia from "./pages/MovieMedia/MovieMedia";
import SeriesMedia from "./pages/SeriesMedia.jsx/SeriesMedia";

// Theme (master)
import { useTheme } from "./contexts/ThemeProvider";

// Actor Page (Mohamed)
import ActorContext from "./contexts/Actor/ActorContext";
import ActorDetails from "./pages/ActorDetails/ActorDetails";
import SeasonMedia from "./pages/SeasonMedia/SeasonMedia";

const App = () => {
  const { theme } = useTheme();

  return (
    <NavContext>
      <HomeProvider>
        <MovieContext>
          <SeriesContext>
            <div
              className={`min-h-screen transition-colors duration-300 ${theme === "light"
                  ? "bg-[#F4F5F7] text-[#171923]"
                  : "bg-black text-[#E2E8F0]"
                }`}
            >
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
                  <Route path="media" element={<MovieMedia />} />
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
                  <Route path="media" element={<SeriesMedia />} />
                  <Route path="season/:seasonNumber" element={<Season />} />
                  <Route
                    path="season/:seasonNumber/credits"
                    element={<SeasonFullCast />}
                  />

                  <Route
                    path="season/:seasonNumber/media"
                    element={<SeasonMedia />}
                  />
                </Route>

                {/* Actor Details */}
                <Route
                  path="/actor/:actorID"
                  element={
                    <ActorContext>
                      <ActorDetails />
                    </ActorContext>
                  }
                />

                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
              </Routes>

              <Footer />
            </div>
            <ScrollToTopButton />
          </SeriesContext>
        </MovieContext>
      </HomeProvider>
    </NavContext>
  );
};

export default App;

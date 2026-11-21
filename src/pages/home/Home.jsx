import PopularSeries from "../../components/home/PopularSeries";
import HeroCarousel from "./../../components/home/HeroCarousel";
import PopularMovies from "./../../components/home/PopularMovies";
import ExploreGenres from "./../../components/home/ExploreByGenres";
import TrendMovie from "./../../components/home/TrendMovie";
import { useTheme } from "../../contexts/ThemeProvider";

const Home = () => {
  const { theme } = useTheme();
  return (
    <div>
      <HeroCarousel />
      <PopularMovies />
      <TrendMovie />
      <PopularSeries />
      <ExploreGenres />
    </div>
  );
};

export default Home;

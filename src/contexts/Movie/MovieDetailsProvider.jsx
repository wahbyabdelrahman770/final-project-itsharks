import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { formatUSD } from "../../utils/moneyFormatter";
import { getLanguage } from "../../utils/languages";

const MovieDetailsContext = createContext({});

const MovieDetailsProvider = ({ children }) => {
    const { movieID } = useParams();
    const [movieDetails, setMovieDetails] = useState({});

    const token = import.meta.env.VITE_zero_token;
    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    const api = `https://api.themoviedb.org/3/movie/${movieID}?append_to_response=credits,images,videos,release_dates`;
    async function getMovieDetails() {
        try {
            const request = await fetch(api, options);
            const response = await request.json();
            setMovieDetails(response);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    const { images: { backdrops = [], posters = [] } = {}, credits: { cast = [], crew = [] } = {}, release_dates, videos, production_companies } = movieDetails;

    const background = backdrops[0] ? `https://media.themoviedb.org/t/p/original${backdrops[0].file_path}` : null;
    const poster = posters[0] ? `https://media.themoviedb.org/t/p/original${posters[0].file_path}` : null;

    const rating = movieDetails.vote_average ? Number(movieDetails.vote_average).toFixed(1) : "";

    const rated_1 = release_dates?.results.find(item => item["iso_3166_1"] == "US")?.release_dates[0].certification;
    const rated_2 = release_dates?.results.find(item => item["iso_3166_1"] == "JP")?.release_dates[0].certification;
    const rated = rated_1 == "" ? rated_2 : rated_1;

    const trailerKey = videos?.results?.find(item => item.name == "Main Trailer" || item.name == "Official Trailer" || item.name == "Original Trailer" || item.name == "Official Trailer [Subtitled]" || item.name == "International Trailer [Subtitled]" || item.name == "Official English Trailer [Dubbed]" || item.name.includes("official") || item.name.includes("Official") || item.name.includes("trailer") || item.name.includes("Trailer") || item.name.includes("4K"))?.key;
    const trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`;

    const director = crew?.find(person => person.job == "Director")?.name;

    const release_date = movieDetails?.release_date;
    const formattedDate = release_date ? format(parseISO(release_date), "PP") : "";

    const language = getLanguage(movieDetails?.original_language);

    const revenue = `$${formatUSD(+movieDetails?.revenue)}`;
    const budget = `$${formatUSD(+movieDetails?.budget)}`;

    return (
        <MovieDetailsContext.Provider value={{
            movieDetails, cast, crew, videos, production_companies, release_date, rating,
            background, poster, director, formattedDate, language, revenue, budget, rated, trailerLink
        }}>
            {children}
        </MovieDetailsContext.Provider>
    );
};

export default MovieDetailsProvider;

export const useMovieDetails = () => useContext(MovieDetailsContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLanguage } from "../../utils/languages";
import formatDate from "../../utils/dateFormatter";

const SeriesDetailsContext = createContext({});

const SeriesDetailsProvider = ({ children }) => {
    const { seriesID } = useParams();
    const [seriesDetails, setSeriesDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const token = import.meta.env.VITE_zero_token;
    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const api = `https://api.themoviedb.org/3/tv/${seriesID}?append_to_response=content_ratings,credits,recommendations,images,videos`;

    async function getSeriesDetails() {
        setLoading(true);
        try {
            const request = await fetch(api, options);
            const response = await request.json();
            setSeriesDetails(response);
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const { name, content_ratings, production_companies, credits: { cast = [], crew = [] } = {}, recommendations, seasons, images: { backdrops = [], posters = [], logos = [] } = {}, videos } = seriesDetails;

    const background = `https://media.themoviedb.org/t/p/original${seriesDetails?.backdrop_path}`;
    const poster = `https://media.themoviedb.org/t/p/original${seriesDetails?.poster_path}`;

    const rating = seriesDetails.vote_average ? Number(seriesDetails.vote_average).toFixed(1) : "";

    const firstAirDate = seriesDetails.first_air_date;
    const lastAirDate = seriesDetails.last_air_date;
    const formattedFirstAirDate = formatDate(firstAirDate);
    const formattedLastAirDate = formatDate(lastAirDate);

    const rated_1 = content_ratings?.results.find(item => item?.iso_3166_1 == "US")?.rating;
    const rated_2 = content_ratings?.results.find(item => item?.iso_3166_1 == "JP")?.rating;
    const rated = rated_1 ? rated_1 : rated_2;

    const language = getLanguage(seriesDetails?.original_language);

    const recommendedSeries = recommendations?.results.slice(0, 5);

    const trailerKey = videos?.results?.find(
        (item) =>
            item.type == "Trailer" ||
            item.type == "trailer" ||
            item.name == "Main Trailer" ||
            item.name == "Official Trailer" ||
            item.name == "Original Trailer" ||
            item.name == "Official Trailer [Subtitled]" ||
            item.name == "International Trailer [Subtitled]" ||
            item.name == "Official English Trailer [Dubbed]" ||
            item.name.includes("official") ||
            item.name.includes("Official") ||
            item.name.includes("trailer") ||
            item.name.includes("Trailer")
    )?.key;
    const trailerLink = trailerKey != null ? `https://www.youtube.com/embed/${trailerKey}` : null;

    useEffect(() => {
        getSeriesDetails();
    }, [seriesID]);

    return (
        <SeriesDetailsContext.Provider value={{ seriesID, seriesDetails, name, loading, background, poster, firstAirDate, rating, rated, trailerLink, formattedFirstAirDate, formattedLastAirDate, language, production_companies, cast, crew, recommendedSeries, seasons, backdrops, posters, logos, videos }}>
            {children}
        </SeriesDetailsContext.Provider>
    );
};

export default SeriesDetailsProvider;

export const useSeriesDetails = () => useContext(SeriesDetailsContext);
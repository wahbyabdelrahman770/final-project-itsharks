import { format, parseISO } from "date-fns";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLanguage } from "../../utils/languages";

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

    const api = `https://api.themoviedb.org/3/tv/${seriesID}?append_to_response=content_ratings,credits,recommendations`;

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

    const { content_ratings, production_companies, credits: { cast = [], crew = [] } = {}, recommendations } = seriesDetails;

    const background = `https://media.themoviedb.org/t/p/original${seriesDetails?.backdrop_path}`;
    const poster = `https://media.themoviedb.org/t/p/original${seriesDetails?.poster_path}`;

    const rating = seriesDetails.vote_average ? Number(seriesDetails.vote_average).toFixed(1) : "";

    const firstAirDate = seriesDetails.first_air_date;
    const lastAirDate = seriesDetails.last_air_date;
    const formattedFirstAirDate = firstAirDate ? format(parseISO(firstAirDate), "PP") : "";
    const formattedLastAirDate = lastAirDate ? format(parseISO(lastAirDate), "PP") : "";

    const rated_1 = content_ratings?.results.find(item => item?.iso_3166_1 == "US")?.rating;
    const rated_2 = content_ratings?.results.find(item => item?.iso_3166_1 == "JP")?.rating;
    const rated = rated_1 ? rated_1 : rated_2;

    const language = getLanguage(seriesDetails?.original_language);

    const recommendedSeries = recommendations?.results.slice(0, 5);

    useEffect(() => {
        getSeriesDetails();
    }, [seriesID]);

    return (
        <SeriesDetailsContext.Provider value={{ seriesID, seriesDetails, loading, background, poster, firstAirDate, rating, rated, formattedFirstAirDate, formattedLastAirDate, language, production_companies, cast, crew, recommendedSeries }}>
            {children}
        </SeriesDetailsContext.Provider>
    );
};

export default SeriesDetailsProvider;

export const useSeriesDetails = () => useContext(SeriesDetailsContext);
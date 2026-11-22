import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SeriesSeasonContext = createContext({});

const SeriesSeasonProvider = ({ children }) => {
    const { seriesID, seasonNumber } = useParams();
    const [seasonDetails, setSeasonDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const token = import.meta.env.VITE_zero_token;
    const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const api = `https://api.themoviedb.org/3/tv/${seriesID}/season/${seasonNumber}?append_to_response=credits,images,videos`;

    async function getSeasonDetails() {
        setLoading(true);
        try {
            const request = await fetch(api, options);
            const response = await request.json();
            setSeasonDetails(response);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    }

    const { air_date, episodes, overview, poster_path, vote_average, credits: { cast = [], crew = [] } = {}, images: { backdrops = [], posters = [], logos = [] } = {}, videos: { results: videos = [] } = {} } = seasonDetails;

    const poster = poster_path ? `https://media.themoviedb.org/t/p/original${poster_path}` : "/placeholderImg.avif";

    const trailerKey = videos?.find(
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
        getSeasonDetails();
    }, [seasonNumber]);

    return (
        <SeriesSeasonContext.Provider value={{ seriesID, seasonNumber, seasonDetails, loading, air_date, episodes, overview, vote_average, cast, crew, poster, trailerLink, backdrops, posters, logos, videos }}>
            {children}
        </SeriesSeasonContext.Provider>
    );
};

export default SeriesSeasonProvider;

export const useSeriesSeasonDetails = () => useContext(SeriesSeasonContext);
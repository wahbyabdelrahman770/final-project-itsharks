import {
    BackDrops,
    Logos,
    Posters,
    Videos,
} from "../../components/Movie-And-Series-Media-Page-Components/MovieAndSeriesMediaComponents";
import { useSeriesSeasonDetails } from "../../contexts/Series/SeriesSeasonProvider";
import { Link } from "react-router-dom";
import { useState } from "react";


const SeasonMedia = () => {
    const { seriesID, seasonNumber, seasonDetails, backdrops, posters, logos, videos } = useSeriesSeasonDetails();
    const [activePage, setActivePage] = useState("backdrops");
    return (
        <div className="w-[90%] md:w-[96%] mx-auto">
            <Link
                to={`/series/${seriesID}/season/${seasonNumber}`}
                className="inline-block mt-8 ml-8 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]"
            >
                ← Back to {seasonDetails?.name}
            </Link>
            <section className="my-8 bg-gray-700 rounded-2xl p-2 flex flex-row justify-around items-center text-sm sm:text-lg md:text-xl text-white">
                <button
                    className={`${activePage == "backdrops" && "activeMedia"} cursor-pointer`}
                    onClick={() => {
                        setActivePage("backdrops");
                    }}
                >
                    Backdrops
                </button>
                <button
                    className={`${activePage == "posters" && "activeMedia"} cursor-pointer`}
                    onClick={() => {
                        setActivePage("posters");
                    }}
                >
                    Posters
                </button>
                <button
                    className={`${activePage == "logos" && "activeMedia"} cursor-pointer`}
                    onClick={() => {
                        setActivePage("logos");
                    }}
                >
                    Logos
                </button>
                <button
                    className={`${activePage == "videos" && "activeMedia"} cursor-pointer`}
                    onClick={() => {
                        setActivePage("videos");
                    }}
                >
                    Videos
                </button>
            </section>

            {activePage == "backdrops" && backdrops.length != 0 && (
                <BackDrops backdrops={backdrops} />
            )}
            {activePage == "posters" && posters.length != 0 && (
                <Posters posters={posters} />
            )}
            {activePage == "logos" && logos.length != 0 && <Logos logos={logos} />}
            {activePage == "videos" && videos.length != 0 && (
                <Videos videos={videos} />
            )}
        </div>
    );
};

export default SeasonMedia;
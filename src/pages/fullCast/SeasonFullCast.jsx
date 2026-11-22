import { Link } from "react-router-dom";
import { useSeriesSeasonDetails } from "../../contexts/Series/SeriesSeasonProvider";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import ActorCard from "../../components/ActorCard";

const SeasonFullCast = () => {
    const { seasonDetails, seriesID, seasonNumber, cast, crew } = useSeriesSeasonDetails();
    const { name } = useSeriesDetails();
    return (
        <div className="relative">
            <Link to={`/series/${seriesID}/season/${seasonNumber}`} className="inline-block mt-8 ml-8 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">← Back to {seasonDetails?.name}</Link>
            <h1 className="text-white text-4xl text-center font-semibold my-8">Cast and Crew of {`"${name} ${seasonDetails?.name}"`}</h1>
            <div className="grid grid-cols-2 justify-items-center">
                {cast.length !== 0 && <div className="w-full md:w-[40%] space-y-6">
                    <h1 className="text-white text-3xl text-center">Cast</h1>
                    {cast.map(person => <ActorCard key={Math.random()} actorID={person.id} imgSrc={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"} actorName={person?.name} actorRole={person?.character} />)}
                </div>}

                {crew.length !== 0 && <div className="w-full md:w-[40%] space-y-6">
                    <h1 className="text-white text-3xl text-center">Crew</h1>
                    {crew.map(person => <ActorCard key={Math.random()} actorID={person.id} imgSrc={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"} actorName={person?.name} actorRole={person?.job} />)}
                </div>}
            </div>
        </div>
    );
};

export default SeasonFullCast;
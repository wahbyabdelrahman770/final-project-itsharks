import { Link } from "react-router-dom";
import { ActorCard } from "../MoviesDeatils/Credits";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";

const SeriesFullCast = () => {
    const { seriesDetails, seriesID, cast, crew } = useSeriesDetails();
    return (
        <div className="relative">
            <Link to={`/series/${seriesID}`} className="inline-block mt-8 ml-8 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">← Back to {seriesDetails?.name}</Link>
            <h1 className="text-white text-4xl text-center font-semibold my-8">Cast and Crew of {`"${seriesDetails?.name}"`}</h1>
            <div className="grid grid-cols-2 justify-items-center">
                <div className="w-full md:w-[40%] space-y-6">
                    <h1 className="text-white text-3xl text-center">Cast</h1>
                    {cast.map(person => <ActorCard key={Math.random()} imgSrc={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"} actorName={person?.name} actorRole={person?.character} />)}
                </div>

                <div className="w-full md:w-[40%] space-y-6">
                    <h1 className="text-white text-3xl text-center">Crew</h1>
                    {crew.map(person => <ActorCard key={Math.random()} imgSrc={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"} actorName={person?.name} actorRole={person?.job} />)}
                </div>
            </div>
        </div>
    );
};

export default SeriesFullCast;
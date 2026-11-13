import { Link } from "react-router-dom";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";

const Credits = () => {

    const { cast, crew } = useMovieDetails();
    const firstThreeCast = [cast[0], cast[1], cast[2]];
    const firstThreeCrew = [crew[0], crew[3], crew[6]];

    return (
        <div className="w-[93%] mx-auto mt-8 mb-4">
            <div className="flex flex-col">
                <span className="text-[#e50924] text-[0.6rem] font-bold tracking-[2px] uppercase">Faces of the story</span>

                <section className="flex flex-row justify-between items-end">
                    <p className="mt-2 font-serif text-[1.6rem] text-white font-medium">Cast & Crew</p>
                    <Link className="text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">View Full Cast and Crew →</Link>
                </section>
            </div>

            <div className="mt-4 md:grid md:grid-cols-6 md:gap-4 space-y-3">
                {firstThreeCast?.map(person => <div key={Math.random()} className="w-full flex flex-col items-center md:items-start">
                    <img src={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"}
                        className="w-[70%] md:w-full h-[stretch]"
                    />
                    <p className="text-white">{person?.name}</p>
                    <p className="text-[12px] text-mauve-500">{person?.character}</p>
                </div>)}

                {firstThreeCrew?.map(person => <div key={Math.random()} className="w-full flex flex-col items-center md:items-start">
                    <img src={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"}
                        className="w-[70%] md:w-full h-[stretch]"
                    />
                    <p className="text-white">{person?.name}</p>
                    <p className="text-[12px] text-mauve-500">{person?.job}</p>
                </div>)}
            </div>
        </div>
    );
};

export default Credits;
import { Link } from "react-router-dom";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";

export const ActorCard = ({ imgSrc, actorName, actorRole, className }) => {
  return (
    <div
      className={`w-full flex flex-col items-center md:items-start ${className}`}
    >
      <img
        src={imgSrc}
        loading="lazy"
        className="w-[70%] md:w-full h-[stretch]"
      />
      <p className=" text-center">{actorName}</p>
      <p
        title={actorRole}
        className="text-[12px] text-center text-mauve-500 overflow-hidden max-h-8"
      >
        {actorRole}
      </p>
    </div>
  );
};

const Credits = () => {
  const { cast, crew } = useSeriesDetails();
  const firstThreeCast = [cast[0], cast[1], cast[2]];
  const firstThreeCrew = [crew[0], crew[3], crew[6]];

  return (
    <div className="w-[93%] mx-auto mt-8 mb-4">
      <div className="mb-4 flex flex-col">
        <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">
          Faces of the story
        </span>

        <section className="flex flex-row justify-between items-end">
          <p className="mt-2 font-serif text-[1.9rem]  font-medium">
            Cast & Crew
          </p>
          <Link
            to="credits"
            className="text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]"
          >
            View Full Cast and Crew →
          </Link>
        </section>
      </div>

      <div className="mt-4 space-y-4 md:space-y-0 md:grid md:grid-cols-6 md:gap-4">
        {firstThreeCast?.map(
          (person) =>
            person && (
              <ActorCard
                key={Math.random()}
                imgSrc={
                  person?.profile_path
                    ? `https://media.themoviedb.org/t/p/original${person?.profile_path}`
                    : "/placeholderImg.avif"
                }
                actorName={person?.name}
                actorRole={person?.character}
              />
            ),
        )}

        {firstThreeCrew?.map(
          (person) =>
            person && (
              <ActorCard
                key={Math.random()}
                imgSrc={
                  person?.profile_path
                    ? `https://media.themoviedb.org/t/p/original${person?.profile_path}`
                    : "/placeholderImg.avif"
                }
                actorName={person?.name}
                actorRole={person?.job}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default Credits;

import { Link } from "react-router-dom";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";

export const ActorCard = ({
  actorID,
  imgSrc,
  actorName,
  actorRole,
  className = "",
}) => {
  return (
    <Link
      to={`/actor/${actorID}`}
      className={`w-full flex flex-col items-center md:items-start cursor-pointer group ${className}`}
    >
      <img
        src={imgSrc}
        alt={actorName}
        loading="lazy"
        className="w-[70%] md:w-full h-[stretch] transition-transform duration-300 group-hover:scale-105"
      />

      <p className="text-white text-center group-hover:text-[#e50924] transition-colors">
        {actorName}
      </p>

      <p className="text-[12px] text-center text-mauve-500">{actorRole}</p>
    </Link>
  );
};

const Credits = () => {
  const { cast, crew } = useMovieDetails();

  const firstThreeCast = cast.slice(0, 3);
  const firstThreeCrew = [crew[0], crew[3], crew[6]].filter(Boolean);

  return (
    <div className="w-[93%] mx-auto mt-8 mb-4">
      <div className="mb-4 flex flex-col">
        <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">
          Faces of the story
        </span>

        <section className="flex flex-row justify-between items-end">
          <p className="mt-2 font-serif text-[1.9rem] text-white font-medium">
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

      <div className="mt-4 md:grid md:grid-cols-6 md:gap-4">
        {/* Actors */}
        {firstThreeCast.map((person) => (
          <ActorCard
            key={person.credit_id}
            actorID={person.id}
            imgSrc={
              person.profile_path
                ? `https://media.themoviedb.org/t/p/original${person.profile_path}`
                : "/placeholderImg.avif"
            }
            actorName={person.name}
            actorRole={person.character}
          />
        ))}

        {/* Crew */}
        {firstThreeCrew.map((person) => (
          <ActorCard
            key={person.credit_id}
            actorID={person.id}
            imgSrc={
              person.profile_path
                ? `https://media.themoviedb.org/t/p/original${person.profile_path}`
                : "/placeholderImg.avif"
            }
            actorName={person.name}
            actorRole={person.job}
          />
        ))}
      </div>
    </div>
  );
};

export default Credits;

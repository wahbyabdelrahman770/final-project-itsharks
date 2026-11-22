
import { Link } from "react-router-dom";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";

// Actor Card
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
      className={`group flex w-full cursor-pointer flex-col items-center md:items-start ${className}`}
    >
      <img
        src={imgSrc}
        alt={actorName || "Cast member"}
        loading="lazy"
        className="aspect-3/4 w-[70%] rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 md:w-full"
      />

      <p className="text-center transition-colors group-hover:text-[#e50924]">
        {actorName}
      </p>

      <p className="text-center text-[12px] text-mauve-500">
        {actorRole}
      </p>
    </Link>
  );
};

const Credits = () => {
  const { cast = [], crew = [] } = useMovieDetails();

  const firstThreeCast = cast.slice(0, 3);

  const firstThreeCrew = [crew[0], crew[3], crew[6]].filter(Boolean);

  return (
    <div className="mx-auto mb-4 mt-8 w-[93%]">
      <div className="mb-4 flex flex-col">
        <span className="text-[0.8rem] font-bold uppercase tracking-[2px] text-[#e50924]">
          Faces of the story
        </span>

        <section className="flex flex-row items-end justify-between">
          <p className="mt-2 font-serif text-[1.9rem] font-medium">
            Cast & Crew
          </p>

          <Link
            to="credits"
            className="border-b border-b-[#ffffff1a] pb-1.5 text-[9px] font-bold uppercase tracking-[1.2px] transition-colors hover:border-b-[#e50924] hover:text-[#e50924]"
          >
            View Full Cast and Crew →
          </Link>
        </section>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-6">
        {/* Actors */}
        {firstThreeCast.map((person) => (
          <ActorCard
            key={person.credit_id || person.id}
            actorID={person.id}
            imgSrc={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w342${person.profile_path}`
                : "/placeholderImg.avif"
            }
            actorName={person.name}
            actorRole={person.character}
          />
        ))}

        {/* Crew */}
        {firstThreeCrew.map((person) => (
          <ActorCard
            key={person.credit_id || person.id}
            actorID={person.id}
            imgSrc={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w342${person.profile_path}`
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

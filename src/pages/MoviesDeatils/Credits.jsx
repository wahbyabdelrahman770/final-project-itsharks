
import { Link } from "react-router-dom";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import ActorCard from "../../components/ActorCard";

const Credits = () => {
  const { cast = [], crew = [] } = useMovieDetails();

  const firstThreeCast = cast.slice(0, 3);

  const firstThreeCrew = [crew[0], crew[3], crew[6]];

  if (firstThreeCast.length == 0 && firstThreeCrew.length == 0) {
    return;
  }

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
            className="border-b border-b-[#ffffff1a] pb-1.5 text-[9px] font-bold uppercase tracking-[1.2px] transition-colors hover:border-b-[#e50924] hover:text-[#e50924] active:border-b-[#e50924] active:text-[#e50924]"
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

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useActor } from "../../contexts/Actor/ActorContext";
import ActorMovies from "./ActorMovies";
import ActorSeries from "./ActorSeries";

import {
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaStar,
  FaUser,
  FaFilm,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

const ActorDetails = () => {
  const { actorID } = useParams();

  const {
    actor,
    actorMovies,
    actorSeries,
    actorMovieCount,
    actorSeriesCount,
    loading,
    error,
    getActorDetails,
  } = useActor();

  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    if (actorID && actorID !== "undefined") {
      getActorDetails(actorID);
    }

    setShowFullBio(false);
  }, [actorID, getActorDetails]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090a0e]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#090a0e] px-5 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
          <FaUser className="text-3xl text-red-500" />
        </div>

        <h2 className="text-3xl font-bold text-white">
          Something Went Wrong
        </h2>

        <p className="mt-3 text-gray-400">
          We couldn't load this actor's information.
        </p>

        <button
          type="button"
          onClick={() => getActorDetails(actorID)}
          className="mt-7 rounded-lg bg-[#e50924] px-8 py-3 font-bold text-white transition hover:bg-red-700 active:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No Actor Data
  if (!actor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090a0e] text-gray-400">
        Actor information is not available.
      </div>
    );
  }

  const actorImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/h632${actor.profile_path}`
    : "/placeholderImg.avif";

  const biography =
    actor.biography || "No biography available for this actor.";

  const hasLongBio = biography.length > 450;

  return (
    <main className="min-h-screen overflow-hidden bg-[#090a0e] text-white">

      {/* Actor Section */}
      <div className="relative overflow-hidden border-b border-white/5">

        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(229,9,36,0.18),transparent_55%)]" />

        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-900/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 md:pt-20">

          <Link
            to={-1}
            className="mb-8 text-[#898989] hover:text-white active:text-white duration-150"
          >
            &lt; Back
          </Link>

          {/* Breadcrumb */}
          <div className="mb-12 mt-8 flex cursor-default flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[2px]">
            <span className="text-gray-500">
              Cinema4You
            </span>

            <span className="text-[#e50924]">/</span>

            <span className="text-gray-500">
              People
            </span>

            <span className="text-[#e50924]">/</span>

            <span className="text-white">
              {actor.name || "Profile"}
            </span>
          </div>

          {/* Actor Hero */}
          <section className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">

            {/* Actor Image */}
            <div className="relative mx-auto w-full max-w-90 lg:mx-0">

              {/* Decorative Border */}
              <div className="absolute -inset-2 rounded-[28px] bg-linear-to-br from-[#e50924]/30 via-transparent to-transparent blur-lg" />

              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#15161b] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

                <img
                  src={actorImage}
                  alt={actor.name || "Actor"}
                  className="aspect-3/4 w-full object-cover transition duration-700 group-hover:scale-105 group-active:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-md border border-white/20 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-[2px] backdrop-blur-md">
                    {actor.known_for_department || "Entertainment"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actor Content */}
            <div className="pt-2">

              {/* Label */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-9 bg-[#e50924]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#e50924]">
                  Behind The Spotlight
                </span>
              </div>

              {/* Actor Name */}
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {actor.name}
              </h1>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap items-center gap-3">

                <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400">
                  {actor.known_for_department || "Entertainment"}
                </span>

                <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300">
                  <FaStar className="text-yellow-400" />
                  Popularity: {actor.popularity?.toFixed(1) ?? "N/A"}
                </span>

                {actorMovieCount.size > 0 && <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300">
                  <FaFilm className="text-[#e50924]" />
                  {actorMovieCount?.size} Movies
                </span>}

                {actorSeriesCount.size > 0 && <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300">
                  <FaFilm className="text-[#e50924]" />
                  {actorSeriesCount?.size} Series
                </span>}
              </div>

              {/* Description */}
              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400">
                Discover the story, career, and memorable performances
                behind one of the faces of cinema.
              </p>

              {/* Information Cards */}
              <div className="mt-9 grid gap-4 sm:grid-cols-2">

                <InfoCard
                  icon={<FaBirthdayCake />}
                  label="Birthday"
                  value={actor.birthday}
                />

                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  label="Place of Birth"
                  value={actor.place_of_birth}
                />

                <InfoCard
                  icon={<FaUser />}
                  label="Also Known As"
                  value={actor.also_known_as?.[0]}
                />

                <InfoCard
                  icon={<FaStar />}
                  label="Known For"
                  value={actor.known_for_department}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Biography Section */}
      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="mb-7 flex items-center gap-4">
          <div className="h-9 w-1 rounded-full bg-[#e50924]" />

          <div>
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#e50924]">
              The Person Behind The Roles
            </span>

            <h2 className="mt-2 text-3xl font-black">
              Biography
            </h2>
          </div>
        </div>

        <div className="max-w-5xl rounded-2xl border border-white/5 bg-[#131419] p-6 md:p-9">

          <p className="whitespace-pre-line text-base leading-8 text-gray-400">
            {showFullBio || !hasLongBio
              ? biography
              : `${biography.slice(0, 450)}...`}
          </p>

          {hasLongBio && (
            <button
              type="button"
              onClick={() => setShowFullBio(!showFullBio)}
              className="mt-6 flex items-center gap-2 text-sm font-bold text-[#e50924] transition hover:text-red-400 active:text-red-400"
            >
              {showFullBio ? "Show Less" : "Read More"}

              {showFullBio ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          )}
        </div>
      </section>

      {/* Filmography Section */}
      <div className="mx-auto max-w-7xl px-5 pb-20">

        {/* Actor Movies */}
        <ActorMovies movies={actorMovies || []} />

        {/* Actor TV Series */}
        <ActorSeries series={actorSeries || []} />

      </div>
    </main>
  );
};

// Information Card
const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm transition">

      <div className="mb-3 flex items-center gap-3">

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-[#e50924]">
          {icon}
        </span>

        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>

      <p className="wrap-break-word text-sm font-semibold leading-6 text-white">
        {value || "Not Available"}
      </p>
    </div>
  );
};

export default ActorDetails;

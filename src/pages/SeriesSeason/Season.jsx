import { useState, useRef, useLayoutEffect, } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import formatDate from "../../utils/dateFormatter";
import { useSeriesSeasonDetails } from "../../contexts/Series/SeriesSeasonProvider";
import ActorCard from './../../components/ActorCard';
import { Button, Modal } from "@heroui/react";
import { IframeWithLoading } from "../../components/Movie-And-Series-Media-Page-Components/MovieAndSeriesMediaComponents";
import PlayIcon from "../../components/PlayIcon";
import Media from "../../components/Movie-And-Series-Details/Media";

export function ShowMoreText({ text, maxLines = 3, className = '' }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef(null);

    const clampStyle = isExpanded
        ? {}
        : {
            display: '-webkit-box',
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        };

    useLayoutEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const checkClamped = () => {
            if (isExpanded) return;
            setIsClamped(el.scrollHeight > el.clientHeight);
        };

        checkClamped();

        const observer = new ResizeObserver(checkClamped);
        observer.observe(el);

        return () => observer.disconnect();
    }, [text, maxLines, isExpanded]);

    return (
        <div>
            <p ref={textRef} style={clampStyle} className={className}>
                {text}
            </p>
            {(isClamped || isExpanded) && (
                <button
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    aria-expanded={isExpanded}
                    className="cursor-pointer text-red-500 hover:underline"
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
}

const Episode = ({ episode: { air_date, episode_number, name, overview, runtime, still_path, vote_average } }) => {
    const imgPath = still_path ? `https://media.themoviedb.org/t/p/original${still_path}` : "/placeholderImg.avif";
    return (
        <div className="w-full rounded-2xl p-2 bg-[#1c1b1b] flex flex-row justify-between items-start">
            <section className="p-4 flex flex-col md:flex-row items-start gap-x-2">
                <img className="w-2/3 md:w-1/5 rounded-xl" src={imgPath} alt="" />
                <div className="text-white space-y-1">
                    <p><span className="text-red-500 font-bold text-xl">{episode_number}</span>. <span className="text-xl font-bold">{name}</span></p>
                    <p className="text-[#837a7a]">{formatDate(air_date)} • {runtime} min</p>
                    {overview && <ShowMoreText text={overview}></ShowMoreText>}
                </div>
            </section>

            <p className="w-1/3 text-end text-yellow-300 font-bold">⭐ {vote_average && Number(vote_average).toFixed(1)}</p>
        </div>
    );
};

const Credits = ({ firstThreeCast, firstThreeCrew }) => {
    if (firstThreeCast.length == 0 && firstThreeCrew.length == 0) {
        return;
    }
    return (
        <div className="w-[93%] mx-auto mt-8 mb-4">
            <div className="mb-4 flex flex-col">
                <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">Faces of the story</span>

                <section className="flex flex-row justify-between items-end">
                    <p className="mt-2 font-serif text-[1.9rem] text-white font-medium">Cast & Crew</p>
                    <Link to="credits" className="text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">View Full Cast and Crew →</Link>
                </section>
            </div>

            <div className="mt-4 space-y-4 md:space-y-0 md:grid md:grid-cols-6 md:gap-4">
                {firstThreeCast?.map(person => person && <ActorCard key={Math.random()} actorID={person.id} imgSrc={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"} actorName={person?.name} actorRole={person?.character} />)}

                {firstThreeCrew?.map(person => person && <ActorCard key={Math.random()} actorID={person.id} imgSrc={person?.profile_path ? `https://media.themoviedb.org/t/p/original${person?.profile_path}` : "/placeholderImg.avif"} actorName={person?.name} actorRole={person?.job} />)}
            </div>
        </div>
    );
};

const VISIBLE_EPISODES = 3;

const Season = () => {
    const { seriesID, seasonDetails, loading, air_date, episodes, overview, poster, vote_average, cast, crew, trailerLink, backdrops, posters, logos, videos } = useSeriesSeasonDetails();
    const { name } = useSeriesDetails();

    const listRef = useRef(null);
    const [listMaxHeight, setListMaxHeight] = useState(null);

    useLayoutEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const update = () => {
            const items = list.children;
            if (items.length <= VISIBLE_EPISODES) {
                setListMaxHeight(undefined);
                return;
            }
            const last = items[VISIBLE_EPISODES - 1];
            setListMaxHeight(last.offsetTop + last.offsetHeight);
        };

        update();

        const observer = new ResizeObserver(update);
        Array.from(list.children).forEach((child) => observer.observe(child));

        return () => observer.disconnect();
    }, [loading, episodes]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Link to={`/series/${seriesID}`} className="inline-block mt-8 ml-8 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">← Back to {name}</Link>
            <div className="w-4/5 md:w-[95%] mx-auto my-8 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-2">
                <section className="flex flex-col items-center gap-y-3">
                    <img src={poster} alt={seasonDetails?.name} className="w-full md:w-[80%]" />
                    <h1 className="text-white text-center text-3xl font-medium">{name} {seasonDetails?.name}</h1>
                    <p className="text-white">Air Date: {formatDate(air_date)}</p>
                    <p className="text-yellow-300 font-bold">⭐{vote_average}</p>
                    {overview && <ShowMoreText className="text-white text-center p-2" text={overview} />}

                    {trailerLink && (
                        <Modal>
                            <Button className="py-4 px-0 w-41.25 bg-[#e50924] text-white text-[12px] font-semibold uppercase rounded-md cursor-pointer flex justify-evenly items-center duration-150 hover:shadow-[0px_0px_17px_2px_#eb3c3c] hover:-translate-y-1 active:shadow-[0px_0px_17px_2px_#eb3c3c] active:-translate-y-1">
                                <PlayIcon fill="white" className="w-6 h-6" /> Watch Trailer
                            </Button>
                            <Modal.Backdrop>
                                <Modal.Container size="cover">
                                    <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                                        <Modal.CloseTrigger />
                                        <IframeWithLoading
                                            src={trailerLink}
                                            className="md:w-full h-62.5 md:h-full"
                                        ></IframeWithLoading>
                                    </Modal.Dialog>
                                </Modal.Container>
                            </Modal.Backdrop>
                        </Modal>
                    )}
                </section>

                <section>
                    <h1 className="text-white text-4xl font-semibold mb-4">Episodes: {episodes?.length}</h1>
                    <div
                        ref={listRef}
                        style={{ maxHeight: listMaxHeight }}
                        className="relative flex flex-col items-start gap-y-2 overflow-y-auto pr-2"
                    >
                        {episodes?.map(episode => <Episode key={episode.id} episode={episode} />)}
                    </div>
                </section>
            </div>

            <Credits firstThreeCast={cast.slice(0, 3)} firstThreeCrew={crew.slice(0, 3)} />

            <Media backdrops={backdrops} posters={posters} logos={logos} videos={videos} />
        </div>
    );
};

export default Season;
import { Skeleton } from "@heroui/react";
import { Modal, Button } from "@heroui/react";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import { useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import MediaLoading from "../../components/MediaLoading";
import { Link } from "react-router-dom";

const ImageLoading = () => {
    const bone = "animate-shine rounded-lg bg-neutral-200/90 dark:bg-neutral-800/90";
    return (
        <div className="w-full space-y-5 rounded-xl bg-gray-300 p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            <Skeleton className={`h-32 ${bone} w-full bg-gray-300`} />
        </div>
    );
};

const ImageWithLoading = ({ src, alt, loading, className }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className={className}>
            {isLoading && <ImageLoading />}
            <img onLoad={() => setIsLoading(false)} src={src} alt={alt} loading={loading} className="w-full" />
        </div>
    );
};

const IframeWithLoading = ({ src, className }) => {
    const [loading, setLoading] = useState(true);
    return (
        <div className={className}>
            {loading && <ImageLoading />}
            <iframe onLoad={() => setLoading(false)} src={src} className="w-full" />
        </div>
    );
};

const BackDrops = ({ backdrops }) => {
    if (backdrops.length == 0) {
        return (
            <MediaLoading />
        );
    }
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {backdrops?.map(backdrop => <div key={backdrop?.file_path} className="max-w-full overflow-hidden relative">
                <ImageWithLoading loading="lazy" src={`https://media.themoviedb.org/t/p/original${backdrop?.file_path}`} className="w-full duration-300 hover:scale-105" alt="The Batman" />
                <Modal>
                    <Button className="absolute bottom-[3%] right-[3%] bg-transparent"><BsArrowsFullscreen className="text-white cursor-pointer" /></Button>
                    <Modal.Backdrop>
                        <Modal.Container size="cover">
                            <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                                <Modal.CloseTrigger />
                                <img loading="lazy" src={`https://media.themoviedb.org/t/p/original${backdrop?.file_path}`} className="w-full md:w-3/4" alt="The Batman" />
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>)}
        </div>
    );
};

const Posters = ({ posters }) => {
    if (posters.length == 0) {
        return (
            <MediaLoading />
        );
    }
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {posters?.map(poster => <div key={poster?.file_path} className="max-w-full overflow-hidden relative">
                <ImageWithLoading loading="lazy" src={`https://media.themoviedb.org/t/p/original${poster?.file_path}`} className="w-full duration-300 hover:scale-105" alt="The Batman" />
                <Modal>
                    <Button className="absolute bottom-[3%] right-[3%] bg-transparent"><BsArrowsFullscreen className="text-white cursor-pointer" /></Button>
                    <Modal.Backdrop>
                        <Modal.Container size="cover">
                            <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                                <Modal.CloseTrigger />
                                <img src={`https://media.themoviedb.org/t/p/original${poster?.file_path}`} className="w-full sm:w-1/2 md:w-1/3" alt="The Batman" />
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>)}
        </div>
    );
};

const Logos = ({ logos }) => {
    if (logos.length == 0) {
        return (
            <MediaLoading />
        );
    }
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {logos?.map(logo => <div key={logo?.file_path} className="max-w-full overflow-hidden relative">
                <ImageWithLoading loading="lazy" src={`https://media.themoviedb.org/t/p/original${logo?.file_path}`} className="w-full duration-300 hover:scale-105" alt="The Batman" />
                <Modal>
                    <Button className="absolute bottom-[3%] right-[3%] bg-transparent"><BsArrowsFullscreen className="text-white cursor-pointer" /></Button>
                    <Modal.Backdrop>
                        <Modal.Container size="cover">
                            <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                                <Modal.CloseTrigger />
                                <img loading="lazy" src={`https://media.themoviedb.org/t/p/original${logo?.file_path}`} className="w-full md:w-3/4" alt="The Batman" />
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>)}
        </div>
    );
};

const Videos = ({ videos }) => {
    if (videos.length == 0) {
        return (
            <MediaLoading />
        );
    }
    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map(video => <IframeWithLoading className="w-full" onLoad={() => console.log("finally")} key={video.key} src={`https://www.youtube.com/embed/${video?.key}`} />)}
        </div>
    );
};

const MovieMedia = () => {
    const { movieID, movieDetails, backdrops, posters, logos, videos: { results: videos = [] } = {} } = useMovieDetails();
    const [activePage, setActivePage] = useState("backdrops");
    return (
        <div className="w-[96%] mx-auto">
            <Link to={`/movies/${movieID}`} className="inline-block mt-8 ml-8 text-[#f7f7f5] uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924]">← Back to {movieDetails?.title}</Link>
            <section className="my-8 bg-gray-700 rounded-2xl p-2 flex flex-row justify-around items-center text-xl text-white">
                <button className={`${activePage == "backdrops" && "activeMedia"} cursor-pointer`} onClick={() => { setActivePage("backdrops"); }}>Backdrops</button>
                <button className={`${activePage == "posters" && "activeMedia"} cursor-pointer`} onClick={() => { setActivePage("posters"); }}>Posters</button>
                <button className={`${activePage == "logos" && "activeMedia"} cursor-pointer`} onClick={() => { setActivePage("logos"); }}>Logos</button>
                <button className={`${activePage == "videos" && "activeMedia"} cursor-pointer`} onClick={() => { setActivePage("videos"); }}>Videos</button>
            </section>

            {activePage == "backdrops" && <BackDrops backdrops={backdrops} />}
            {activePage == "posters" && <Posters posters={posters} />}
            {activePage == "logos" && <Logos logos={logos} />}
            {activePage == "videos" && <Videos videos={videos} />}
        </div>
    );
};

export default MovieMedia;
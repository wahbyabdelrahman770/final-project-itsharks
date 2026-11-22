import { Skeleton } from "@heroui/react";
import { Modal, Button } from "@heroui/react";
import { useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import MediaLoading from "../../components/MediaLoading";

export const ImageLoading = () => {
    const bone = "animate-shine rounded-lg bg-neutral-200/90 dark:bg-neutral-800/90";
    return (
        <div className="w-full h-full space-y-5 rounded-xl bg-gray-300 p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            <Skeleton className={`h-full min-h-32 ${bone} w-full bg-gray-300`} />
        </div>
    );
};

export const ImageWithLoading = ({ src, alt, loading, className }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className={`w-full ${className}`}>
            {isLoading && <ImageLoading />}
            <img onLoad={() => setIsLoading(false)} src={src} alt={alt} loading={loading} className="w-full h-full" />
        </div>
    );
};

export const IframeWithLoading = ({ src, className }) => {
    const [loading, setLoading] = useState(true);
    return (
        <div className={className}>
            {loading && <ImageLoading />}
            <iframe onLoad={() => setLoading(false)} src={src} className="w-full h-full" />
        </div>
    );
};

export const BackDrops = ({ backdrops }) => {
    if (backdrops.length == 0) {
        return (
            <MediaLoading />
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {backdrops?.map(backdrop => <div key={backdrop?.file_path} className="max-w-full overflow-hidden relative">
                <ImageWithLoading loading="lazy" src={`https://media.themoviedb.org/t/p/original${backdrop?.file_path}`} className="w-full duration-300 hover:scale-105" alt="The Batman" />
                <Modal>
                    <Button className="absolute bottom-[3%] right-[3%] bg-red-400"><BsArrowsFullscreen className="text-white cursor-pointer" /></Button>
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

export const Posters = ({ posters }) => {
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
                    <Button className="absolute bottom-[3%] right-[3%] bg-red-400"><BsArrowsFullscreen className="text-white cursor-pointer" /></Button>
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

export const Logos = ({ logos }) => {
    if (logos.length == 0) {
        return (
            <MediaLoading />
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {logos?.map(logo => <div key={logo?.file_path} className="max-w-full overflow-hidden relative">
                <ImageWithLoading loading="lazy" src={`https://media.themoviedb.org/t/p/original${logo?.file_path}`} className="w-full duration-300 hover:scale-105" alt="The Batman" />
                <Modal>
                    <Button className="absolute bottom-[3%] right-[3%] bg-red-400"><BsArrowsFullscreen className="text-white cursor-pointer" /></Button>
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

export const Videos = ({ videos }) => {
    if (videos.length == 0) {
        return (
            <MediaLoading />
        );
    }
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map(video => <IframeWithLoading className="w-full h-62.5" key={video.key} src={`https://www.youtube.com/embed/${video?.key}`} />)}
        </div>
    );
};
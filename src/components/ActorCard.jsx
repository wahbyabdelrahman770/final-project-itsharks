import { Link } from "react-router-dom";
import { ImageWithLoading } from "./Movie-And-Series-Media-Page-Components/MovieAndSeriesMediaComponents";

export default function ActorCard({
    actorID,
    imgSrc,
    actorName,
    actorRole,
    className = "",
}) {
    return (
        <Link
            to={`/actor/${actorID}`}
            className={`group flex w-full cursor-pointer flex-col items-center md:items-start ${className}`}
        >
            <ImageWithLoading
                src={imgSrc}
                alt={actorName || "Cast member"}
                loading="lazy"
                className="aspect-3/4 w-[70%] rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 md:w-full"
            />

            <p className="text-center md:text-start transition-colors group-hover:text-[#e50924]">
                {actorName}
            </p>

            <p className="text-center md:text-start text-[12px] text-mauve-500">
                {actorRole}
            </p>
        </Link>
    );
};
import { Skeleton } from "@heroui/react";

const bone = "animate-shine rounded-lg bg-neutral-200/90 dark:bg-neutral-800/90";

const DetailsLoading = () => {
    return (
        <div className="w-full h-[50vh] space-y-5 rounded-xl border-0 bg-[#292828] p-4">
            <Skeleton className={`h-full ${bone}`} />
            <div className="space-y-3">
                <Skeleton className={`h-3 w-3/5 ${bone}`} />
                <Skeleton className={`h-3 w-4/5 ${bone}`} />
                <Skeleton className={`h-3 w-2/5 ${bone}`} />
            </div>
        </div>
    );
};

export default DetailsLoading;
import { Skeleton } from "@heroui/react";

export default function MediaLoading() {
    return (
        <div className="skeleton--shimmer relative grid w-full grid-cols-3 gap-4 overflow-hidden rounded-xl">
            <Skeleton animationType="none" className="h-24 rounded-xl" />
            <Skeleton animationType="none" className="h-24 rounded-xl" />
            <Skeleton animationType="none" className="h-24 rounded-xl" />
        </div>
    );
}
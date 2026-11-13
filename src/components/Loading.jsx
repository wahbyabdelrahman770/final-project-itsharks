import { Skeleton } from "@heroui/react";

const Loading = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="space-y-3">
          <div className="space-y-3 rounded-lg  p-3 shadow-panel ">
            <Skeleton
              animationType="shimmer"
              className="h-70 w-full rounded-lg bg-gray-700/50"
            />

            <div className="space-y-2 pt-1">
              <Skeleton
                animationType="shimmer"
                className="h-4 w-4/5 rounded-lg bg-gray-700/50"
              />
              <Skeleton
                animationType="shimmer"
                className="h-3 w-2/5 rounded-lg bg-gray-700/50"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;

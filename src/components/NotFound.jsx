import { Card } from "@heroui/react";
import { TbMovieOff } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="min-h-[45vh] w-full flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border border-white/10 bg-[#11131a]/90 backdrop-blur-md text-white shadow-2xl shadow-black/50 rounded-3xl p-6">
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 shadow-inner">
            <TbMovieOff className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              Genre Not Found<span className="text-red-600">.</span>
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
              Sorry, we couldn't find any results for this genre. Please try
              exploring another category.
            </p>
          </div>

          <div className="w-full py-3.5 px-4 bg-red-600/15 border border-red-600/40 text-red-400 text-sm font-semibold rounded-xl tracking-wide">
            Please Try Another Genre
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;

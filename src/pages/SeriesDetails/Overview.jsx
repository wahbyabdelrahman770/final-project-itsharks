import { Link } from "react-router-dom";
import { useSeriesDetails } from "../../contexts/Series/SeriesDetailsProvider";
import { Button, Modal } from "@heroui/react";
import PlayIcon from "../../components/PlayIcon";

const Overview = () => {
  const {
    seriesDetails,
    background,
    poster,
    trailerLink,
    firstAirDate,
    rating,
    rated,
  } = useSeriesDetails();
  return (
    <div
      className="w-full min-h-screen bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${window.innerWidth < 600 ? poster : background})`,
      }}
    >
      <div className="w-full min-h-screen py-8 px-10 pt-32 relative flex items-end gap-x-8 bg-[linear-gradient(90deg,#090b10_8%,#090b10d6_42%,#090b103d_75%),linear-gradient(0deg,#090b10_0%,transparent_32%)]">
        <Link
          to="/series"
          className="absolute top-[5%] left-[5%] text-[#898989] hover:text-white duration-150"
        >
          &lt; Back to series
        </Link>

        <section className="w-[20%] min-w-37.5 hidden lg:block">
          <img src={poster} className="w-full" />
        </section>

        <section className="flex flex-col items-start">
          <div className="flex justify-start items-center gap-x-1">
            <span className="inline-block w-6 h-[2.05px] bg-[#e50924]"></span>
            <p className="text-[#d8d9dc] text-[14px] font-semibold">
              FEATURED SERIES
            </p>
          </div>

          <h1 className="my-3 text-[clamp(50px,5vw,95px)] text-white font-serif">
            {seriesDetails?.name}
          </h1>
          <p className="text-[#7f858f] uppercase text-[14px] mb-2">
            {seriesDetails?.original_name}
          </p>
          {seriesDetails?.tagline && (
            <p className="my-6 font-serif text-[#c0c4cb] text-[17px] italic">{`"${seriesDetails.tagline}"`}</p>
          )}

          <div className="text-[#d4d6db] text-[1rem] font-semibold flex flex-row items-center flex-wrap gap-2">
            ⭐<span className="text-yellow-300 font-bold">{rating}</span>
            <span className="text-xs">/10</span>
            <span className="text-xs text-[#cec9c9]"> • </span>
            <span>{firstAirDate}</span>
            <span className="text-xs text-[#cec9c9]"> • </span>
            <span>{seriesDetails.number_of_seasons} Seasons</span>
            <span className="text-xs text-[#cec9c9]"> • </span>
            <span className="border p-1">{rated}</span>
          </div>

          <div className="w-full my-6 flex flex-row items-center flex-wrap gap-2">
            {seriesDetails?.genres
              ? seriesDetails.genres.map((genre) => (
                  <p
                    key={genre.name}
                    className="uppercase text-[#e1e2e5] border-[0.5px] rounded-[20px] p-[6px_12px] text-[13px]"
                  >
                    {genre.name}
                  </p>
                ))
              : ""}
          </div>

          <p className="text-[#afb3bc] max-w-152.5 text-[14px]">
            {seriesDetails?.overview}
          </p>

          {trailerLink && (
            <Modal>
              <Button className="py-4 px-0 mt-7 w-41.25 bg-[#e50924] text-white text-[12px] font-semibold uppercase rounded-md cursor-pointer flex justify-evenly items-center duration-150 hover:shadow-[0px_0px_17px_2px_#eb3c3c] hover:-translate-y-1 active:shadow-[0px_0px_17px_2px_#eb3c3c] active:-translate-y-1">
                <PlayIcon fill="white" className="w-6 h-6" /> Watch Trailer
              </Button>
              <Modal.Backdrop>
                <Modal.Container size="cover">
                  <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                    <Modal.CloseTrigger />
                    <iframe
                      src={trailerLink}
                      className="md:w-full h-62.5 md:h-full"
                    ></iframe>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          )}
        </section>
      </div>
    </div>
  );
};

export default Overview;

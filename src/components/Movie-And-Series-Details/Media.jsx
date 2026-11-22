import { Link } from "react-router-dom";
import { BsArrowsFullscreen } from "react-icons/bs";
import { Modal, Button } from "@heroui/react";

const Media = ({ backdrops, videos }) => {
  const first3Videos = videos.slice(0, 3);

  return (
    <div className="w-[93%] mx-auto mb-12">
      <div className="mb-4 flex flex-col">
        <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">
          Behind the frame
        </span>
        <section className="flex flex-row justify-between items-end">
          <p className="mt-2 font-serif text-[1.9rem]  font-medium">
            Media Gallery
          </p>
          <Link
            to="media"
            className=" uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924] active:text-[#e50924] active:border-b-[#e50924]"
          >
            View All Media →
          </Link>
        </section>
      </div>

      <div className="w-full mb-8 flex flex-col md:flex-row gap-2">
        <div className="max-w-2/3 mx-auto overflow-hidden relative">
          <img
            src={`https://media.themoviedb.org/t/p/original${backdrops[0]?.file_path}`}
            className="w-full duration-300 hover:scale-105 active:scale-105"
            alt=""
          />
          <Modal>
            <Button className="absolute bottom-[3%] right-[3%] bg-red-400">
              <BsArrowsFullscreen className=" cursor-pointer" />
            </Button>
            <Modal.Backdrop>
              <Modal.Container size="cover">
                <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                  <Modal.CloseTrigger />
                  <img
                    src={`https://media.themoviedb.org/t/p/original${backdrops[0]?.file_path}`}
                    className="w-full md:w-3/4"
                    alt=""
                  />
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-y-2">
          <div className="w-2/3 md:w-full mx-auto overflow-hidden relative">
            <img
              src={`https://media.themoviedb.org/t/p/original${backdrops[1]?.file_path}`}
              className="w-full duration-300 hover:scale-105 active:scale-105"
              alt=""
            />
            <Modal>
              <Button className="absolute bottom-[3%] right-[3%] bg-red-400">
                <BsArrowsFullscreen className=" cursor-pointer" />
              </Button>
              <Modal.Backdrop>
                <Modal.Container size="cover">
                  <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                    <Modal.CloseTrigger />
                    <img
                      src={`https://media.themoviedb.org/t/p/original${backdrops[1]?.file_path}`}
                      className="w-full md:w-3/4"
                      alt=""
                    />
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          </div>

          <div className="w-2/3 md:w-full mx-auto overflow-hidden relative">
            <img
              src={`https://media.themoviedb.org/t/p/original${backdrops[2]?.file_path}`}
              className="w-full duration-300 hover:scale-105 active:scale-105"
              alt=""
            />
            <Modal>
              <Button className="absolute bottom-[3%] right-[3%] bg-red-400">
                <BsArrowsFullscreen className=" cursor-pointer" />
              </Button>
              <Modal.Backdrop>
                <Modal.Container size="cover">
                  <Modal.Dialog className="bg-[#000000e6] flex justify-center items-center rounded-none">
                    <Modal.CloseTrigger />
                    <img
                      src={`https://media.themoviedb.org/t/p/original${backdrops[2]?.file_path}`}
                      className="w-full md:w-3/4"
                      alt=""
                    />
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          </div>
        </div>
      </div>

      {videos.length != 0 && (
        <div className="flex flex-col">
          <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">
            Press Play
          </span>
          <section className="flex flex-row justify-between items-end">
            <p className="mt-2 font-serif text-[1.9rem]  font-medium">
              Videos & Trailers
            </p>
            <Link
              to="media"
              className=" uppercase text-[9px] tracking-[1.2px] border-b border-b-[#ffffff1a] pb-1.5 font-bold duration-75 hover:text-[#e50924] hover:border-b-[#e50924] active:text-[#e50924] active:border-b-[#e50924]"
            >
              View All Media →
            </Link>
          </section>
        </div>
      )}

      <div className="mt-3 flex flex-col md:flex-row items-center gap-3">
        {first3Videos.map((video) => (
          <iframe
            key={video.name}
            src={`https://www.youtube.com/embed/${video.key}`}
            title={video.name}
            className="w-[95%] md:w-1/3 h-62.5"
          ></iframe>
        ))}
      </div>
    </div>
  );
};

export default Media;

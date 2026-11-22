import { useEffect, useState } from "react";
import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";
import Card from "./Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Collection = () => {
  const { collectionID } = useMovieDetails();
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(true);

  const token = import.meta.env.VITE_zero_token;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const api = `https://api.themoviedb.org/3/collection/${collectionID}`;

  async function getCollection() {
    setLoading(true);
    try {
      const request = await fetch(api, options);
      const response = await request.json();
      setCollection(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  const { name, parts } = collection;

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="w-[93%] mx-auto my-8">
      <div className="mb-4 flex flex-col">
        <span className="text-[#e50924] text-[0.8rem] font-bold tracking-[2px] uppercase">
          Collection
        </span>
        <p className="mt-2 font-serif text-[1.9rem] text-white font-medium">
          {name}
        </p>
      </div>

      <div>
        <Swiper
          modules={[FreeMode, Scrollbar]}
          freeMode={{
            enabled: true,
            sticky: true,
          }}
          grabCursor={true}
          slidesPerView={2}
          spaceBetween={10}
          scrollbar={{
            draggable: true,
            hide: false,
            dragSize: "auto",
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1536: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="popular-swiper w-full overflow-hidden! pb-12! [&_.swiper-scrollbar]:h-2! [&_.swiper-scrollbar]:rounded-full! [&_.swiper-scrollbar]:bg-gray-900! [&_.swiper-scrollbar-drag]:rounded-full! [&_.swiper-scrollbar-drag]:bg-gray-700! [&_.swiper-scrollbar-drag]:cursor-grab! [&_.swiper-scrollbar-drag]:active:cursor-grabbing"
        >
          {parts?.map((part) => (
            <SwiperSlide>
              <Card key={Math.random()} movie={part} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Collection;

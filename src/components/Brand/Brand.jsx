import axios from "axios";
import Loading from "../Loading/Loading";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavButton } from "../SwiperNavButton/SwiperNavButton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Brand() {
  async function getBrand() {
    let options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    return await axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["brand"],
    queryFn: getBrand,
    staleTime: 6 * 6 * 60 * 1000,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className=" dark:border-gray-500 py-6 ">
        <h2 className="text-gray-600 dark:text-gray-300 text-xl font-semibold mb-6">
          All brands
        </h2>
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 10,
              spaceBetween: 20,
            },
          }}
          loop={true}
          keyboard={{ enabled: true }}
          className=""
        >
          <SwiperNavButton />
          {data.data.data.map((brand) => (
            <SwiperSlide key={brand._id}>
              <Link to={`/specificBrand/${brand._id}`}>
                <div className="flex flex-col justify-center items-center">
                  <div className=" w-14 overflow-hidden rounded-full">
                    <img
                      className=" object-contain w-full"
                      src={brand.image}
                      alt=""
                    />
                  </div>
                  <h2 className="text-center text-gray-900 dark:text-slate-200 py-2 font-semibold">
                    {brand.name}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

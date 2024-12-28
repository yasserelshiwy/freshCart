import axios from "axios";
import Loading from "../Loading/Loading";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperNavButton } from "../SwiperNavButton/SwiperNavButton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Category() {
  async function getCategory() {
    let options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return await axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
    staleTime: 6 * 6 * 60 * 1000,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="border-y dark:border-gray-500 py-6 ">
        <h2 className="text-gray-600 dark:text-gray-300 text-xl font-semibold mb-6">
          Shop Popular Categories
        </h2>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          loop={true}
          keyboard={{ enabled: true }}
          className=""
        >
          <SwiperNavButton />
          {data.data.data.map((Category) => (
            <SwiperSlide key={Category._id}>
              <div className="border  dark:border-slate-600 dark:hover:border-primay-200 rounded-lg p-2 m-4 md:m-0 md:my-2 hover:scale-105 hover:shadow hover:shadow-primay-200 transition-all duration-75 cursor-pointer  hover:border-primay-200">
                <Link to={`/productCategory/${Category._id}`}>
                  <div className="h-60 ">
                    <img
                      className="w-full h-full object-cover "
                      src={Category.image}
                      alt=""
                    />
                  </div>
                  <h2 className="text-center text-gray-900 dark:text-slate-200 py-2 font-semibold">
                    {Category.name}
                  </h2>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className=""></div>
        </Swiper>
      </div>
    </>
  );
}

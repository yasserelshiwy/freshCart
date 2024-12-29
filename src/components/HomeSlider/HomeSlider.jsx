import slidImgo from "../../assets/images/slider-image-1.jpeg";
import slidImge from "../../assets/images/slider-image-2.jpeg";
import slidImgs from "../../assets/images/slider-image-3.jpeg";
import product1 from "../../assets/images/product1png.png";
import product2 from "../../assets/images/ad-banner-2.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";

import "swiper/css";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 gap-4 mb-11 mt-5 ">
        <div className="col-span-12 lg:col-span-8 ">
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            slidesPerView={"auto"}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-full rounded-xl  "
          >
            <div className="w-full h-full">
              <SwiperSlide className="rounded-xl overflow-hidden relative">
                <img className="w-full h-full " src={slidImgs} alt="" />
                <div className=" absolute text-gray-800 top-4 md:top-16 left-6 md:left-10 space-y-2 sm:space-y-8 ">
                  <p className="text-lg font-medium">
                    <span>Exclusive Offer</span>{" "}
                    <span className="bg-red-700 p-1  text-sm rounded-lg text-white">
                      15%
                    </span>
                  </p>
                  <h2 className=" dark:text-gray-950 text-xl md:text-2xl lg:text-4xl xl:text-5xl text-gray-800 font-semibold">
                    Cokoladni Kolutici Lasta
                  </h2>
                  <p className="">Only on this week... Don’t miss</p>
                  <div className=" mb-4 mt-4 ">
                    <span className="text-gray-800 dark:text-gray-950 text-md sm:text-xl">
                      Start from
                      <span className="text-red-800 ml-1">220 EGP</span>
                    </span>
                  </div>
                  <Link
                    className="  inline-block px-3 py-2 bg-primay-700 hover:bg-primay-800 dark:text-gray-100 text-sm md:text-lg rounded-lg text-white "
                    to={"/Products"}
                  >
                    Shop Deals Now{" "}
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide className="rounded-xl overflow-hidden relative">
                <img className="w-full h-full " src={slidImge} alt="" />
                <div className=" absolute text-gray-800 top-4 md:top-16 left-6 md:left-10 space-y-2 sm:space-y-8 ">
                  <p className="text-lg dark:text-gray-950 font-medium">
                    <span>Exclusive Offer</span>{" "}
                    <span className="bg-red-700 p-1  text-sm rounded-lg text-white">
                      15%
                    </span>
                  </p>
                  <h2 className=" text-gray-800 dark:text-gray-950 font-semibold flex flex-col">
                    <span className="text-lg md:text-2xl lg:text-4xl xl:text-5xl">
                      Chocozay wafer
                    </span>
                    <span className="text-lg md:text-2xl lg:text-4xl xl:text-5xl">
                      -rolls Deals
                    </span>
                  </h2>
                  <p className="">Only on this week... Don’t miss</p>
                  <div className="mb-4 mt-4 ">
                    <span className="text-gray-800 dark:text-gray-950 text-md sm:text-xl">
                      Start from
                      <span className="text-red-800 ml-1">310 EGP</span>
                    </span>
                  </div>
                  <Link
                    className=" dark:text-gray-100 inline-block px-3 py-2 bg-primay-700 hover:bg-primay-800 text-sm md:text-lg rounded-lg text-white "
                    to={"/Products"}
                  >
                    Shop Deals Now
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide className="rounded-xl overflow-hidden relative">
                <img className="w-full h-full " src={slidImgo} alt="" />
                <div className=" absolute text-gray-800 top-4 md:top-16 left-6 md:left-10 space-y-2 sm:space-y-8 ">
                  <p className="text-lg dark:text-gray-950 font-medium">
                    <span>Exclusive Offer</span>{" "}
                    <span className="bg-red-700 p-1  text-sm rounded-lg text-white">
                      15%
                    </span>
                  </p>
                  <h2 className=" text-gray-800 dark:text-gray-950 font-semibold flex flex-col">
                    <span className="text-lg dark:text-gray-950 md:text-2xl lg:text-4xl xl:text-5xl">
                      Best Online Deals,
                    </span>
                    <span className="text-lg dark:text-gray-950 md:text-2xl lg:text-4xl xl:text-5xl">
                      Free Stuff
                    </span>
                  </h2>
                  <p className="">Only on this week... Don’t miss</p>
                  <div className="mb-4 mt-4 ">
                    <span className="text-gray-800 dark:text-gray-950 text-md sm:text-xl">
                      Start from
                      <span className="text-red-800 ml-1">105 EGP</span>
                    </span>
                  </div>
                  <Link
                    className=" dark:text-gray-100 inline-block px-3 py-2 bg-primay-700 hover:bg-primay-800 text-sm md:text-lg rounded-lg text-white "
                    to={"/Products"}
                  >
                    Shop Deals Now{" "}
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
        <div className="col-span-12 flex flex-col sm:flex-row  lg:grid lg:col-span-4 gap-4 ">
          <div className="w-full  rounded-xl overflow-hidden relative">
            <img className="w-full " src={product1} alt="" />
            <div className=" absolute top-8 left-6 space-y-6 sm:space-y-2 md:space-y-6 lg:space-y-4 ">
              <h3 className="flex flex-col text-md md:text-lg dark:text-gray-950 xl:text-xl font-semibold">
                <span>10% cashback on</span> <span>personal care</span>
              </h3>
              <div className="flex flex-col text-md md:text-md xl:text-lg">
                <p className="">Max cashback: $12</p>
                <span>
                  Code:<span className="font-semibold ml-1">CARE12</span>
                </span>
              </div>
              <Link
                className="  inline-block px-2 py-1 bg-gray-800 hover:bg-gray-900 text-sm md:text-md xl:text-xl mt-1 rounded-lg text-white "
                to={"/Products"}
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="w-full  rounded-xl overflow-hidden -mb-4 relative">
            <img className="w-full " src={product2} alt="" />
            <div className=" absolute top-8 left-6 space-y-6 sm:space-y-2 md:space-y-6 lg:space-y-4 ">
              <h3 className="flex dark:text-gray-950 flex-col text-md md:text-lg xl:text-xl font-semibold">
                <span>Say yes to</span> <span>season’s fresh</span>
              </h3>
              <div className=" dark:text-gray-950 flex flex-col text-md md:text-md xl:text-lg">
                <p className="">Refresh your day</p>
                <span>the fruity way</span>
              </div>
              <Link
                className=" inline-block px-2 py-1 bg-gray-800 hover:bg-gray-900 text-sm md:text-md xl:text-xl   mt-1 rounded-lg text-white "
                to={"/Products"}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

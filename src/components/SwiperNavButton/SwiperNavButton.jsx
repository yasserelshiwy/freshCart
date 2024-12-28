import { useSwiper } from "swiper/react";

export const SwiperNavButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-center w-full gap-4 my-3">
      <button
        className=" w-8 h-8 rounded-full border mt-2  bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-primay-700 dark:hover:text-white dark:border-black   text-gray-500 hover:bg-primay-300 hover:text-white hover:scale-105 transition-all "
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <i className="fa-solid fa-angle-left text-xl"></i>
      </button>
      <button
        className=" w-8 h-8 rounded-full border mt-2  bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-primay-700 dark:hover:text-white dark:border-black  text-gray-500 hover:bg-primay-300 hover:text-white hover:scale-105 transition-all "
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <i className="fa-solid fa-angle-right text-xl"></i>
      </button>
    </div>
  );
};

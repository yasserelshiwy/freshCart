import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";
import { wishListContext } from "../../Context/WishList.context";

export default function Card({ productInfo }) {
  let { title, description, price, imageCover, ratingsAverage, category, id } =
    productInfo;
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList, removeProductWishLish } =
    useContext(wishListContext);

  let [colorhart, setColorhart] = useState("text-gray-500");

  let [addOrRemovWishList, setAddOrRemovWishList] = useState(null);

  function cheakFve() {
    if (addOrRemovWishList === true) {
      addProductToWishList({ productId: id });
      setColorhart("text-red-600");
    }

    if (addOrRemovWishList === false) {
      removeProductWishLish({ id });
      setColorhart("text-gray-500");
    }
  }
  function changeStat() {
    if (addOrRemovWishList === null) {
      setAddOrRemovWishList(true);
    } else if (addOrRemovWishList === true) {
      setAddOrRemovWishList(false);
    } else {
      setAddOrRemovWishList(null);
    }
  }

  useEffect(() => {
    cheakFve();
  }, [addOrRemovWishList]);
  return (
    <>
      <div className="card group/card relative  w-full pb-10 rounded-2xl overflow-hidden shadow-sm border hover:scale-105 m-2 transition-all duration-300 border-gray-200 dark:border-gray-700 dark:hover:border-primay-400   hover:border-primay-300   hover:transition-all hover:duration-300">
        <div className="relative">
          <img
            src={imageCover}
            className="w-full object-contain h-full "
            alt=""
          />
          <div
            onClick={() => {
              changeStat();
            }}
            className={`  absolute -left-10 top-[6px] ${colorhart} group-hover/card:left-[14px] transition-all hover:scale-125  duration-300  rounded-full  `}
          >
            <i className="fa-sharp fa-solid fa-heart   text-2xl cursor-pointer ml-[2.5px]"></i>
          </div>
          <Link
            to={`/Details/${id}`}
            className=" absolute -right-10 top-[6px]  group-hover/card:right-[14px] transition-all duration-300 hover:scale-125  rounded-full flex justify-center items-center "
          >
            <i className="fa-sharp fa-solid fa-eye text-primay-600 text-2xl cursor-pointer "></i>
          </Link>
        </div>
        <div className="card-body   p-4 space-y-5">
          <div className="card-header space-y-1">
            <h2 className="text-xl text-gray-700 dark:text-gray-200 line-clamp-1 font-semibold">
              {title}
            </h2>
            <h3 className=" text-xl text-primay-600  font-medium">
              {category.name}
            </h3>
            <p className=" font-medium text-xl text-black dark:text-gray-300  line-clamp-2">
              {description}
            </p>
          </div>
          <div className="footer-card flex justify-between items-center">
            <div className="flex justify-center items-center text-black dark:text-gray-300  text-lg font-medium">
              <p>
                {price}
                <span>EGP</span>
              </p>
            </div>
            <div className="flex justify-center items-center dark:text-gray-300  text-slate-600">
              <i className="fa-solid fa-star text-md text-yellow-300"></i>
              {ratingsAverage}
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            addProductToCart({ productId: id });
          }}
          className="bg-primay-600  hover:bg-primay-700 hover:scale-105 rounded-xl mb-2 absolute -bottom-14  group-hover/card:bottom-0 cursor-pointer transition-all duration-300  left-6  text-white font-semibold py-2 text-sm w-3/4 m-auto text-center"
        >
          <span className="mr-1">Add to cart</span>
          <i className="fa-sharp fa-solid fa-cart-shopping text-white  cursor-pointer"></i>
        </div>
      </div>
    </>
  );
}

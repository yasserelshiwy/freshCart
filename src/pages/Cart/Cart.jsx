import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../components/Loading/Loading";

import cart from "../../assets/images/Empty-cart.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import CartItem from "../../components/CartItem/CartItem";

export default function Cart() {
  let { getCartProduct, cartInfo, removeCart } = useContext(CartContext);

  useEffect(() => {
    getCartProduct();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart page frsh cart wepsite" />
      </Helmet>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="title flex items-center gap-4 text-2xl text-gray-800 dark:text-gray-200 font-semibold">
            <i className="fa-brands fa-opencart text-4xl"></i>

            <h2 className=" relative before:absolute before:h-[75%] before:w-[2px] ml-2 pl-2   before:-left-1 before:top-1/2 before:-translate-y-1/2 dark:before:bg-gray-200 before:bg-gray-800">
              Your Shopping Cart
            </h2>
          </div>
          {cartInfo.numOfCartItems === 0 ? (
            <div className="flex justify-center items-center flex-col gap-4 mt-6 ">
              <div className="flex justify-center items-center w-1/2">
                <img src={cart} alt="" className="w-full" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 ">
                Your cart is empty, Go ahead and add something to the cart
              </h2>
              <Link
                to="/"
                className=" bg-primay-600 hover:bg-primay-800 px-5 py-3 text-white font-lg font-semibold rounded-full"
              >
                Go to order now
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {cartInfo.data.products.map((product) => (
                <CartItem key={product._id} productInfo={product} />
              ))}
              <div className="flex md:flex-row flex-col justify-between items-center">
                <div className="flex items-center  py-4">
                  <p className="text-2xl font-semibold ml-2 text-gray-700 dark:text-gray-300 ">
                    totalCartPrice
                  </p>
                  <span className="text-xl font-semibold ml-2 text-primay-600 dark:text-primay-50">
                    {cartInfo.data.totalCartPrice}
                  </span>
                  <span className="text-md font-semibold ml-1 mt-1 text-gray-700 dark:text-gray-300 ">
                    L.E
                  </span>
                </div>
                <button
                  onClick={removeCart}
                  className="px-4 py-2  text-white text-xl font-semibold rounded-xl bg-red-600 hover:bg-red-800"
                >
                  Delete Cart
                </button>
              </div>
              <div className="w-full">
                <Link
                  to="/cheacout"
                  className="py-1 rounded-xl text-white font-semibold text-lg bg-primay-500 hover:bg-primay-700 w-full text-center my-6 flex items-center justify-center"
                >
                  Next Step{" "}
                  <span className="mt-1 ml-1">
                    <i className="fa-solid fa-right-long "></i>
                  </span>
                </Link>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
1;

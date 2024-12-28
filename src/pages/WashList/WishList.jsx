import { useContext, useEffect } from "react";
import WishListItem from "../../components/WishListItem/WishListItem";
import { wishListContext } from "../../Context/WishList.context";
import Loading from "../../components/Loading/Loading";
import wish from "../../assets/images/wishlist e.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { getProductWishList, wishInfo } = useContext(wishListContext);
  useEffect(() => {
    getProductWishList();
  }, []);
  return (
    <>
      <Helmet>
        <title> wishlist </title>
        <meta name="description" content="wishlist page frsh cart wepsite" />
      </Helmet>
      {wishInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="header-section   flex gap-4 p-2 border-b-[1px] mb-10 border-red-200 rounded-lg w-fit m-auto  items-center text-3xl  font-semibold">
            <h2 className="text-gray-700 dark:text-gray-200 ">My Wishlist</h2>
            <span>
              <i className="fa-solid fa-heart text-red-600"></i>
            </span>
          </div>
          {wishInfo.data.length === 0 ? (
            <div className="flex justify-center items-center flex-col gap-4 mt-6 ">
              <div className="flex justify-center items-center ">
                <img src={wish} alt="" className="w-full rounded-full " />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 ">
                Your wishlist is empty, Go ahead and add something to the
                wishlist
              </h2>
              <Link
                to="/"
                className=" bg-red-600 hover:bg-red-700 px-5 py-3  text-white font-lg font-semibold rounded-full"
              >
                Go to products
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {wishInfo.data.map((product) => (
                <WishListItem key={product._id} productinfo={product} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}

import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  let { product, count, price } = productInfo;
  let { imageCover, title, category, id } = product;
  let { name } = category;
  const { removeProductCart, updateCartProduct } = useContext(CartContext);
  return (
    <>
      <table className="w-full  bg-white bg-opacity-40 dark:bg-black dark:bg-opacity-40   dark:shadow-gray-600 shadow-md shadow-primay-50  rounded-2xl     ">
        <tr className="  flex flex-col md:flex-row md:justify-between justify-center items-center border rounded-2xl  dark:border-gray-600 border-primay-50 content-center">
          <td className="p-4">
            <div className="flex gap-8 items-center">
              <img
                src={imageCover}
                alt=""
                className="w-24 h-24 object-cover rounded-full"
              />
              <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-200  max-w-48  line-clamp-2 ">
                <Link to={`/Details/${id}`}>{title}55</Link>
              </h2>
            </div>
          </td>
          <td className="p-4">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-300  ">
              {name}{" "}
            </h3>
          </td>
          <td className="p-4">
            <div className="flex items-center gap-3 ">
              <div className="flex flex-row-reverse gap-4 items-center justify-center">
                <div
                  onClick={() => {
                    updateCartProduct({ productId: id, count: count + 1 });
                  }}
                  className="hover:scale-105 transition-all bg-gray-700 rounded-full flex justify-center items-center w-6 h-6 "
                >
                  <i className="fa-solid fa-plus d text-white cursor-pointer"></i>
                </div>
                <span className="text-lg font-semibold  text-gray-600 dark:text-gray-200 ">
                  {count}
                </span>
                <div
                  onClick={() => {
                    updateCartProduct({ productId: id, count: count - 1 });
                  }}
                  className="hover:scale-105 transition-all bg-gray-700 rounded-full flex justify-center items-center w-6 h-6 "
                >
                  <i className="fa-solid fa-minus text-white cursor-pointer"></i>
                </div>
              </div>
            </div>
          </td>
          <td className="p-4 ">
            <div>
              <span className="text-lg text-gray-700 dark:text-gray-200  font-semibold">
                {price}
              </span>
              <span className="text-sm ml-2 font-semibold text-gray-600 dark:text-gray-300 ">
                L.E
              </span>
            </div>
          </td>
          <td className="p-4 mr-3 md:border-l md:border-gray-400  ">
            <button
              onClick={() => {
                removeProductCart({ id });
              }}
              className="  rounded-md text-gray-800 dark:text-gray-300 dark:hover:text-red-600  hover:scale-110 hover:text-red-600  transition-all"
            >
              <i className="fa-regular fa-trash-can text-xl"></i>
            </button>
          </td>
        </tr>
      </table>
    </>
  );
}

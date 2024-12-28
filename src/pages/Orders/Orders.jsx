import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import order from "../../assets/images/order.png";
import { Link } from "react-router-dom";
export default function Orders() {
  let { token } = useContext(userContext);
  let { id } = jwtDecode(token);
  let [orders, setOrders] = useState(null);

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      <Helmet>
        <title>Orders page</title>
        <meta name="description" content="Orders page frsh cart wepsite" />
      </Helmet>
      {orders == "" ? (
        <div>
          <div className="w-full text-center gap-4 flex flex-col justify-center items-center">
            <img src={order} className="w-[35%]" alt="" />
            <h2 className="text-gray-700 dark:text-gray-200  text-2xl font-semibold">
              There are no ordes yet
            </h2>
            <Link
              to={"/"}
              className=" bg-primay-600 hover:bg-primay-700 px-5 py-3 text-white font-lg font-semibold rounded-full"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <>
          {orders ? (
            <section>
              {orders.map((order) => (
                <>
                  <div
                    key={order.id}
                    className="p-5 rounded-xl border mb-3 border-gray-400 border-opacity-25"
                  >
                    <header className="flex justify-between items-center">
                      <div>
                        <h2 className=" mb-1  text-gray-400 dark:text-gray-100 ">
                          order ID
                        </h2>
                        <span className="text-xl font-bold dark:text-gray-300  text-gray-800">
                          #{order.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        {order.isPaid ? (
                          <span className="py-1 px-5 rounded-2xl text-white text-xl font-semibold bg-lime-500">
                            تم الدفع
                          </span>
                        ) : (
                          <span className="py-1 px-5 rounded-2xl text-white text-sm md:text-md lg:text-xl font-semibold bg-red-600">
                            غير مدفوع
                          </span>
                        )}
                        {order.isDelivered ? (
                          <span className="py-1 px-5 rounded-2xl text-white text-sm md:text-md lg:text-xl font-semibold bg-blue-600">
                            تم الاستلام
                          </span>
                        ) : (
                          <span className="py-1 px-5 rounded-2xl text-white text-sm md:text-md lg:text-xl font-semibold bg-blue-600">
                            قيد التوصيل
                          </span>
                        )}
                      </div>
                    </header>

                    <div className=" grid gap-3 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
                      {order.cartItems.map((product) => (
                        <>
                          <div
                            key={product._id}
                            className="border rounded-xl dark:text-gray-200   p-3 my-6 border-gray-400 border-opacity-25 "
                          >
                            <img
                              src={product.product.imageCover}
                              alt=""
                              className="w-full"
                            />

                            <h2 className="text-lg  dark:text-gray-200 font-semibold text-gray-800  line-clamp-2 my-2">
                              {product.product.title}
                            </h2>
                            <span className="text-gray-700 dark:text-gray-200  text-lg  ">
                              <span className="font-medium dark:text-gray-200  text-gray-800">
                                {product.price}
                              </span>
                              L.E
                            </span>
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="total-price my-3 ">
                      <p className=" text-gray-600 dark:text-gray-200  text-lg font-semibold ">
                        total Order Price:
                        <span className="text-primay-600 mx-2">
                          {order.totalOrderPrice}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-200 ">
                          L.E
                        </span>
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </section>
          ) : (
            <>
              <Loading />
            </>
          )}
        </>
      )}
    </>
  );
}

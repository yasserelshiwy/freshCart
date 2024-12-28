import { useFormik } from "formik";
import { memo, useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function CheackOut() {
  let [payment, setPayment] = useState(null);
  let { cartInfo } = useContext(CartContext);
  let navigate = useNavigate();

  let { token } = useContext(userContext);
  async function handlCashOrder(values) {
    let tostId = toast.loading("making an order....");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("The product has been deleted from cart");
        setTimeout(navigate("/allorders"), 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(tostId);
    }
  }
  async function handelOnlinePayment(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("redirecting you to stripe");
        setTimeout((location.href = data.session.url), 2000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (payment === "cash") handlCashOrder();
      else handelOnlinePayment();
    },
  });
  return (
    <>
      <Helmet>
        <title>CheackOut</title>
        <meta name="description" content="CheackOut page frsh cart wepsite" />
      </Helmet>
      <h2 className="mb-5 text-2xl font-semibold dark:text-gray-200  text-gray-800">
        Shipping Address{" "}
      </h2>
      <form action="" className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control w-full dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200 "
            placeholder="City"
            name="shippingAddress.city"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <input
            type="tel"
            className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200"
            placeholder="phone"
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <textarea
            placeholder="details"
            className="form-control w-full min-h-20  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200"
            id=""
            name="shippingAddress.details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
          ></textarea>
        </div>
        <div>
          <button
            onClick={() => {
              setPayment("cash");
            }}
            className="py-2 px-5 text-white font-semibold  bg-blue-500 hover:bg-blue-700 text-lg rounded-xl ml-3 "
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setPayment("online");
            }}
            className="py-2 px-5 text-white font-semibold text-lg bg-primay-600 hover:bg-primay-800  rounded-xl ml-3"
          >
            Online Paymant
          </button>
        </div>
      </form>
    </>
  );
}

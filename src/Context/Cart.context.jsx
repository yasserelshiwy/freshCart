import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  let [cartInfo, setCartInfo] = useState(null);
  const { token } = useContext(userContext);

  async function addProductToCart({ productId }) {
    let tostId = toast.loading("wait product add to cart....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        getCartProduct();
        toast.success("The product has been added to cart");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(tostId);
    }
  }
  async function getCartProduct() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProductCart({ id }) {
    let tostId = toast.loading("wait product delete from cart....");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);

      if (cartInfo.status === "success") {
        setCartInfo(data);

        toast.success("The product has been deleted from cart");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(tostId);
    }
  }
  async function removeCart() {
    let tostId = toast.loading("wait product delete from cart....");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setCartInfo(null);
        getCartProduct();

        toast.success("All products have been deleted. ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(tostId);
    }
  }
  async function updateCartProduct({ productId, count }) {
    let tostId = toast.loading("wait ....");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(tostId);
    }
  }
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProduct,
        cartInfo,
        removeProductCart,
        removeCart,
        updateCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

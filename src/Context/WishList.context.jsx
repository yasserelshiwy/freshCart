import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const wishListContext = createContext(null);

export default function WishListProveder({ children }) {
  let [wishInfo, setWishInfo] = useState(null);
  const { token } = useContext(userContext);
  async function addProductToWishList({ productId }) {
    let tostId = toast.loading("wait product add to wishlist ❤...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
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
        getProductWishList();
        toast.success("Product added successfully to your wishlist ❤");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(tostId);
    }
  }
  async function getProductWishList() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);

      if (data.status === "success") {
        setWishInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProductWishLish({ id }) {
    let tostId = toast.loading("wait product delete from wishlist ❤....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        getProductWishList();
        toast.success("The product has been deleted from wishlist ❤");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(tostId);
    }
  }
  return (
    <wishListContext.Provider
      value={{
        addProductToWishList,
        getProductWishList,
        wishInfo,
        removeProductWishLish,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}

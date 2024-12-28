import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import ProductedRoute from "./components/ProductedRoute/ProductedRoute";
import NotFound from "./pages/NotFound/NotFound";
import UserPeovider from "./Context/User.context";
import GuestProdectedRoute from "./components/GuestProdectedRoute/GuestProdectedRoute";
import CartProvider from "./Context/Cart.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CheackOut from "./pages/CheackOut/CheackOut";
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import WashList from "./pages/WashList/WishList";
import WishListProveder from "./Context/WishList.context";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NewPassword from "./pages/NewPassword/NewPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Offline, Online } from "react-detect-offline";
import OffLine from "./components/OffLine/OffLine";
import ProductCategory from "./pages/ProductCategory/ProductCategory";
import SpecificBrand from "./pages/SpecificBrand/SpecificBrand";
// import DarkModePeovider from "./Context/DarkMode.context";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProductedRoute>
          <Layout />
        </ProductedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "Cart", element: <Cart /> },
        { path: "Products", element: <Products /> },
        { path: "Details/:id", element: <ProductDetails /> },
        { path: "productCategory/:id", element: <ProductCategory /> },
        { path: "specificBrand/:id", element: <SpecificBrand /> },
        { path: "cheacout", element: <CheackOut /> },
        { path: "allorders", element: <Orders /> },
        { path: "WishList", element: <WashList /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestProdectedRoute>
          <Layout />
        </GuestProdectedRoute>
      ),
      children: [
        { path: "Sinup", element: <Signup /> },
        { path: "Login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "newPassword", element: <NewPassword /> },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "*", element: <NotFound /> }],
    },
  ]);
  const myClient = new QueryClient();
  return (
    <>
      <Online>
        <QueryClientProvider client={myClient}>
          <UserPeovider>
            <CartProvider>
              <WishListProveder>
                <RouterProvider router={router}></RouterProvider>
              </WishListProveder>
            </CartProvider>
          </UserPeovider>

          <Toaster position="top-center" />
        </QueryClientProvider>
      </Online>
      <Offline>
        <OffLine />
      </Offline>
    </>
  );
}

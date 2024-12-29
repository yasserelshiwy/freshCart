import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/Frsh Cart Icon.svg";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";
import { wishListContext } from "../../Context/WishList.context";
export default function Navbar() {
  const { token, Logout } = useContext(userContext);
  let { wishInfo } = useContext(wishListContext);
  const { cartInfo } = useContext(CartContext);
  const [navStat, setNavStat] = useState("hidden");
  const navToggle = () => {
    navStat === "hidden" ? setNavStat("absolute ") : setNavStat("hidden");
  };
  // *============>

  let [dark, setDark] = useState(JSON.parse(localStorage.getItem("dark")));

  function handelDarkMode() {
    if (dark) {
      localStorage.setItem("dark", "false");
      setDark(false);
      document.documentElement.classList.remove("dark");
      setIconMood("fa-moon");
      setIconMoodColoer("text-black ");
    } else {
      localStorage.setItem("dark", "true");
      setDark(true);
      document.documentElement.classList.add("dark");
      setIconMoodColoer("text-gray-100 ");
      setIconMood("fa-sun");
    }
  }

  let [iconMood, setIconMood] = useState("fa-moon");
  let [iconMoodColor, setIconMoodColoer] = useState("text-black");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      setIconMoodColoer("text-gray-100 ");
      setIconMood("fa-sun");
    } else {
      document.documentElement.classList.remove("dark");
      setIconMood("fa-moon");
      setIconMoodColoer("text-black ");
    }
  }, []);
  // *============>

  return (
    <>
      <nav className="bg-slate-100 dark:bg-gray-950 py-5 fixed  !left-0 !right-0 !z-50 px-6 md:px-2 ">
        <div className="container flex items-start justify-between gap-4 ">
          <div className="logo-page">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 mr-2"
            >
              <img src={logo} alt="logo freshcart" className="w-8" />
              <h1 className="font-bold text-black text-lg sm:text-xl  md:text-2xl dark:text-white">
                Fresh Cart
              </h1>
            </Link>
          </div>
          <div className="nav-list flex grow  md:gap-0 xl:gap-8 items-center">
            {token && (
              <>
                <div
                  className={` ${navStat}  md:block rounded-b-xl -bottom-[283px] bg-slate-100 dark:bg-gray-950 w-full left-0 `}
                >
                  <div className="flex justify-between bg-slate-100 dark:bg-gray-950 items-center  ">
                    <ul className="flex ml-10 md:ml-0  md:items-start md:mr-4 gap-5 flex-col md:flex-row ">
                      <li className="text-lg text-gray-600 dark:text-gray-200 font-medium">
                        <NavLink
                          className={({ isActive }) => {
                            return `relative  before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${
                              isActive ? "before:!w-full font-bold" : ""
                            }`;
                          }}
                          to="/"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li className="text-lg text-gray-600  dark:text-gray-200 font-medium">
                        <NavLink
                          className={({ isActive }) => {
                            return `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${
                              isActive ? "before:!w-full font-bold" : ""
                            }`;
                          }}
                          to="/Cart"
                        >
                          Cart
                        </NavLink>
                      </li>
                      <li className="text-lg text-gray-600 dark:text-gray-200 font-medium">
                        <NavLink
                          to="/Products"
                          className={({ isActive }) => {
                            return `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${
                              isActive ? "before:!w-full font-bold" : ""
                            }`;
                          }}
                        >
                          Products
                        </NavLink>
                      </li>
                      <li className="text-lg text-gray-600 dark:text-gray-200 font-medium">
                        <NavLink
                          className={({ isActive }) => {
                            return `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${
                              isActive ? "before:!w-full font-bold" : ""
                            }`;
                          }}
                          to="/WishList"
                        >
                          wishlist
                        </NavLink>
                      </li>
                      <li className="pb-16 md:pb-0 text-lg text-gray-600 dark:text-gray-200 font-medium">
                        <NavLink
                          className={({ isActive }) => {
                            return `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${
                              isActive ? "before:!w-full font-bold" : ""
                            }`;
                          }}
                          to="/allorders"
                        >
                          Orders
                        </NavLink>
                      </li>
                    </ul>
                    <div className="absolute left-[36px] bottom-[18px] md:static ">
                      <div className="flex justify-center items-center gap-6 md:gap-4 ">
                        <Link to="/WishList" className="icon-cart  relative">
                          <i className="fa-solid fa-heart cursor-pointer text-red-600 text-2xl"></i>
                          <div className="card-length">
                            {wishInfo === null ? (
                              ""
                            ) : (
                              <>
                                {wishInfo.count === 0 ? (
                                  ""
                                ) : (
                                  <div className=" flex justify-center items-center w-5 h-5 absolute rounded-full text-white font-semibold bg-primay-600 -top-0 left-1 -translate-y-1/2 translate-x-1/2">
                                    <span className="text-sm dark:ml-[2px]">
                                      {wishInfo.count}
                                    </span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </Link>
                        <Link to="/Cart" className="icon-cart  relative">
                          <i className="fa-solid fa-cart-shopping cursor-pointer text-black dark:text-gray-200 text-2xl"></i>
                          <div className="card-length">
                            {cartInfo === null ? (
                              ""
                            ) : (
                              <>
                                {cartInfo.numOfCartItems === 0 ? (
                                  ""
                                ) : (
                                  <div className=" flex justify-center items-center w-5 h-5 absolute rounded-full text-white font-semibold bg-primay-600 -top-0 left-1 -translate-y-1/2 translate-x-1/2">
                                    <span className="text-sm ml-[2px]">
                                      {cartInfo.numOfCartItems}
                                    </span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </Link>
                        <button onClick={handelDarkMode}>
                          <i
                            className={`fa-solid  text-[22px]  ${iconMoodColor}  mode ${iconMood}`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <div className="button flex  items-center gap-6">
              {!token && (
                <>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative text-black dark:text-gray-200 before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${
                        isActive ? "before:!w-full font-bold" : ""
                      }`;
                    }}
                    to="/Sinup"
                    c
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative  text-black dark:text-gray-200  before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${
                        isActive ? "before:!w-full font-bold" : ""
                      }`;
                    }}
                    to="/Login"
                  >
                    Login
                  </NavLink>
                  <button className=" " onClick={handelDarkMode}>
                    <i
                      className={`fa-solid text-[22px]  ${iconMoodColor}  mode ${iconMood} `}
                    ></i>
                  </button>
                </>
              )}

              {token && (
                <>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={navToggle}
                      className="md:hidden block bg-gray-200 dark:bg-gray-700 dark:text-gray-300 text-gray-600 rounded-lg border-2 border-transparent focus:text-gray-800  focus:border-gray-300 py-1 px-2"
                    >
                      <i className="fa-solid fa-bars  text-xl"></i>
                    </button>
                    <button
                      onClick={Logout}
                      to="Home"
                      className="logout text-lg hover:scale-105 text-gray-700 hover:text-gray-800 dark:text-slate-200 dark:hover:text-slate-300 transition-all"
                    >
                      <i className="fa-solid fa-right-from-bracket  text-2xl"></i>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

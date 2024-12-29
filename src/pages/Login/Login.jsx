import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {
  const { setToken } = useContext(userContext);
  const navigeate = useNavigate();
  const [emailOrPaswordError, setEmailOrPaswordError] = useState(null);
  let passwerdRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  //   ^==========>

  let [showPass, setShowPass] = useState("password");
  function showPassword() {
    if (showPass === "password") {
      setShowPass("text");
    } else {
      setShowPass("password");
    }
  }
  //   ^==========>
  const validationSchema = object({
    email: string()
      .required("Email address is required")
      .email("Email is invailed"),
    password: string()
      .required("Password is required")
      .matches(
        passwerdRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  //   ^==========>
  async function sendData(values) {
    let tostLoadingId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("User login Successfully ");
        setTimeout(() => {
          navigeate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setEmailOrPaswordError(error.response.data.message);
    } finally {
      toast.dismiss(tostLoadingId);
    }
  }
  //   ^==========>
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendData,
  });
  return (
    <>
      <Helmet>
        <title>login</title>
        <meta name="description" content="login page frsh cart wepsite" />
      </Helmet>
      <section className="px-4 py-10">
        <div className="inear">
          <h2 className="text-2xl font-semibold text-gray-950 dark:text-gray-200 ">
            <i className="fa-regular fa-circle-user"></i> Login Now
          </h2>
          <form
            action=""
            className="py-8 space-y-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="email">
              <label
                htmlFor="email"
                className="text-lg mb-1 text-gray-950 dark:text-gray-200"
              >
                email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="form-control w-full dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200 "
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{formik.errors.email}
                </p>
              )}
            </div>
            <div className="password">
              <label
                htmlFor="password"
                className="text-lg mb-1 text-gray-950 dark:text-gray-200"
              >
                password:
              </label>
              <div className="relative">
                <input
                  type={showPass}
                  id="password"
                  placeholder="password"
                  className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200 "
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                />
                <div
                  onClick={showPassword}
                  className=" absolute right-[10px] top-[8px]"
                >
                  <i className="fa-regular fa-eye text-gray-500 text-lg"></i>
                </div>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{formik.errors.password}
                </p>
              )}
              {emailOrPaswordError && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{emailOrPaswordError}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className=" bg-primay-600 rounded-lg py-2 px-8 text-white text-xl my-3"
              >
                Login
              </button>
              <Link
                to={"/forgetPassword"}
                className="text-blue-600 underline text-sm"
              >
                ForgetPassword ?
              </Link>
            </div>
            <div className="w-full text-center underline">
              <Link to={"/Sinup"} className="text-blue-600  underline text-md">
                If you do not have an email, go to create an email
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

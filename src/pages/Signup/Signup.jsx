import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigeate = useNavigate();
  const [accontExist, setAccontExist] = useState(null);
  let passwerdRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  let phoneRegex = /^(02)?01[0125][0-9]{8}$/;
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
    name: string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name can not be more than 25 characters"),
    email: string()
      .required("Email address is required")
      .email("Email is invailed"),
    password: string()
      .required("Password is required")
      .matches(
        passwerdRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf([ref("password")], "Password and confirm should be the same"),
    phone: string()
      .required("Phone number is required")
      .matches(phoneRegex, "Sorry,we accept egyption numbers only"),
  });
  //   ^==========>
  async function sendData(values) {
    let tostLoadingId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("User Create Successfully ");
        setTimeout(() => {
          navigeate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setAccontExist(error.response.data.message);
    } finally {
      toast.dismiss(tostLoadingId);
    }
  }
  //   ^==========>
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendData,
  });
  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta name="description" content="Signup page frsh cart wepsite" />
      </Helmet>
      <section className="px-4 py-10">
        <div className="inear">
          <h2 className="text-2xl font-semibold text-gray-950 dark:text-gray-200 ">
            <i className="fa-regular fa-circle-user"></i> Register Now
          </h2>
          <form
            action=""
            className="py-8 space-y-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="name">
              <label
                htmlFor="text"
                className="text-lg mb-1 text-gray-950 dark:text-gray-200"
              >
                name:
              </label>
              <input
                type="text"
                id="text"
                placeholder="Type your name"
                className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
              />
              {formik.errors.name && formik.touched.name && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{formik.errors.name}
                </p>
              )}
            </div>
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
                className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200 "
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
              {accontExist && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{accontExist}
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
                <button
                  onClick={showPassword}
                  className=" absolute right-[10px] top-[8px]"
                >
                  <i className="fa-regular fa-eye text-gray-500 text-lg"></i>
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{formik.errors.password}
                </p>
              )}
            </div>
            <div className="re-password">
              <label
                htmlFor="password"
                className="text-lg mb-1 text-gray-950 dark:text-gray-200"
              >
                re-password:
              </label>
              <div className="relative">
                <input
                  type={showPass}
                  id="password"
                  placeholder="Confirm password"
                  className="form-control w-full   dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="rePassword"
                />
                <button
                  onClick={showPassword}
                  className=" absolute right-[10px] top-[8px]"
                >
                  <i className="fa-regular fa-eye text-gray-500 text-lg"></i>
                </button>
              </div>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{formik.errors.rePassword}
                </p>
              )}
            </div>
            <div className="phone">
              <label
                htmlFor="phone"
                className="text-lg mb-1 text-gray-950 dark:text-gray-200"
              >
                phone:
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="phone Number"
                className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phone"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                  *{formik.errors.phone}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-primay-600 rounded-lg py-2 px-4 text-white text-xl my-3"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

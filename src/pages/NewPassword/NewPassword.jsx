import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function NewPassword() {
  const navigate = useNavigate();
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
    newPassword: string()
      .required("Password is required")
      .matches(
        passwerdRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  //   ^==========>

  async function newPass(values) {
    let tostLoadingId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.token !== null) {
        toast.success("The password has been changed successfully.");
        setTimeout(() => {
          navigate("/Login");
        }, 1200);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong");
    } finally {
      toast.dismiss(tostLoadingId);
    }
  }
  //   ^==========>

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: newPass,
  });

  return (
    <>
      <section>
        <div className="my-4">
          <h2 className="text-2xl text-gray-700 font-semibold  dark:text-gray-200">
            Reset Password
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="email">
            <label
              htmlFor="email"
              className="text-lg mb-1 text-gray-950 dark:text-gray-200"
            >
              email:
            </label>
            <input
              className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200"
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              placeholder="Email Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              New password:
            </label>
            <div className=" relative">
              <input
                type={showPass}
                id="password"
                placeholder="NewPassword"
                className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200 "
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="newPassword"
              />
              <button
                onClick={showPassword}
                className=" absolute right-[10px] top-[8px]"
              >
                <i className="fa-regular fa-eye text-gray-500 text-lg"></i>
              </button>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                *{formik.errors.newPassword}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className=" bg-primay-600 rounded-lg py-2 px-8 text-white text-xl my-3"
            >
              Send{" "}
              <span>
                <i className=" text-xm fa-solid fa-paper-plane"></i>
              </span>
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

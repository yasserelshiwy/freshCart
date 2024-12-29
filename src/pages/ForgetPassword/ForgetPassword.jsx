import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {
  const navigate = useNavigate();

  //   ^==========>

  const validationSchema = object({
    email: string()
      .required("Email address is required")
      .email("Email is invailed"),
  });
  //   ^==========>

  async function forgetPass(values) {
    let tostLoadingId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.statusMsg === "success") {
        toast.success(
          "The process is complete and you will receive a code on your email."
        );
        setTimeout(() => {
          navigate("/resetPassword");
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
    },
    validationSchema,
    onSubmit: forgetPass,
  });

  return (
    <>
      <section>
        <div className="my-4">
          <h2 className="text-2xl text-gray-700 font-semibold  dark:text-gray-200">
            Forget password
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
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

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className=" bg-primay-600 rounded-lg py-2 px-8 text-white text-xl my-3"
            >
              Send{" "}
              <span>
                <i className=" text-xm fa-solid fa-paper-plane"></i>
              </span>
            </button>
            <Link to={"/Login"} className="text-blue-600  underline text-md">
              go to login
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

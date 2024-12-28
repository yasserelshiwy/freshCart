import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ResetPassword() {
  const navigate = useNavigate();
  //   ^==========>
  const validationSchema = object({
    resetCode: string().required("Verify Reset Code is required"),
  });

  //   ^==========>
  async function resetPass(values) {
    let tostLoadingId = toast.loading("waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "Success") {
        toast.success(
          "The process is complete and you will receive a code on your email."
        );
        setTimeout(() => {
          navigate("/newPassword");
        }, 2000);
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
      resetCode: "",
    },
    validationSchema,
    onSubmit: resetPass,
  });

  return (
    <>
      <section>
        <div className="my-4">
          <h2 className="text-2xl text-gray-700 0 dark:text-gray-200 font-semibold">
            Verify Reset Code
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="code"
              className="text-lg mb-1 text-gray-950 dark:text-gray-200 "
            >
              code:
            </label>
            <input
              className="form-control w-full  dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primay-700 dark:text-gray-200 "
              type="tel"
              id="code"
              name="resetCode"
              value={formik.values.resetCode}
              placeholder="Reset Code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className=" text-sm text-red-600 bg-red-100 py-2 px-2 mt-1  rounded-xl border border-red-300">
                *{formik.errors.resetCode}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className=" bg-primay-600 rounded-lg py-2 px-8 text-white text-xl my-3"
            >
              Send
              <span>
                <i className=" text-xm fa-solid fa-paper-plane"></i>
              </span>
            </button>
            <Link
              className="text-blue-600  text-[12px] "
              to={"/forgetPassword"}
            >
              To re-receive the code, enter the email again.
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

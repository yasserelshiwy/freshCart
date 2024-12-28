import { Helmet } from "react-helmet";
import error from "../../assets/images/error.svg";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not found</title>
        <meta name="description" content=" Not found page frsh cart wepsite" />
      </Helmet>
      <div className="w-full my-10 py-9 flex flex-col gap-2 justify-center items-center h-[60vh]">
        <img className="w-full h-full" src={error} alt="" />
        <h2 className="text-2xl text-primay-600 font-bold">
          This page does not exist. Please check the path.
        </h2>
        <Link to={"/"} className="text-xl text-primay-600 font-bold underline">
          go to home page
        </Link>
      </div>
    </>
  );
}

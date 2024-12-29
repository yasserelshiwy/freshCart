import Card from "../../components/Card/Card";
import axios from "axios";
import Loding from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import Category from "../../components/Category/Category";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import Brand from "../../components/Brand/Brand";

export default function Home() {
  async function getAllProduct() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return await axios.request(option);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
    staleTime: 6 * 6 * 60 * 1000,
    refetchOnMount: true,
  });
  if (isLoading) return <Loding />;
  return (
    <>
      <Helmet>
        <title>Fresh cart</title>
        <meta name="description" content="home page frsh cart wepsite" />
      </Helmet>
      <HomeSlider />
      <Category />
      <div className=" mt-4">
        <h2 className="text-gray-700 text-xl font-semibold dark:text-gray-300">
          All products
        </h2>
      </div>
      <div className="inear w-[90%] ml-[11px]  md:w-full grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-4">
        {data.data.data.map((product) => (
          <Card key={product.id} productInfo={product} />
        ))}
      </div>
      <Brand />
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import productfound from "../../assets/images/pp.webp";

export default function ProductCategory() {
  const { id } = useParams();
  let [categoryProduct, setCategoryProduct] = useState(null);
  let [relatCategoryProduct, setRelatCategoryProduct] = useState(null);
  async function getProudectsCategory() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);

    setCategoryProduct(data.data);
  }
  async function relatCategoryProducts() {
    const option = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryProduct._id}`,
      method: "GET",
    };
    let { data } = await axios.request(option);

    setRelatCategoryProduct(data.data);
  }
  useEffect(() => {
    getProudectsCategory();
  }, []);
  useEffect(() => {
    relatCategoryProducts();
  }, [categoryProduct]);

  return (
    <>
      <section className="flex  flex-col justify-center items-center gap-16">
        <>
          {categoryProduct === null ? (
            <Loading />
          ) : (
            <>
              <div className="border flex flex-col  w-[250px]  dark:border-slate-600 dark:hover:border-primay-200 rounded-lg p-2 m-4 md:m-0 md:my-2 hover:scale-105 hover:shadow hover:shadow-primay-200 transition-all duration-75 cursor-pointer  hover:border-primay-200">
                <div className="h-72  ">
                  <img
                    className="w-full h-full object-cover "
                    src={categoryProduct.image}
                    alt=""
                  />
                </div>
                <h2 className="text-center text-gray-900 dark:text-slate-200 py-2 font-semibold">
                  {categoryProduct.name}
                </h2>
              </div>
              <h2 className="text-2xl font-semibold text-primay-600">
                <span className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                  This Product For :{" "}
                </span>
                {categoryProduct.name}
              </h2>
            </>
          )}
          <div>
            <>
              {relatCategoryProduct === null ? (
                <Loading />
              ) : (
                <>
                  {relatCategoryProduct == "" ? (
                    <div className="notfound-product flex flex-col gap-3 justify-center items-center text-center">
                      <div className="w-[80%] flex justify-center items-center ">
                        <img src={productfound} alt="" className="w-[35%] " />
                      </div>
                      <p className="text-3xl text-gray-950 font-bold dark:text-white">
                        sorry,no product found!
                      </p>
                      <p className="text-xl text-gray-600 dark:text-gray-100 font-semibold ">
                        This category does not contain any products. Choose
                        another category.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-full border-t border-gray-400 dark:border-gray-600">
                        <div className="inear w-[90%] ml-[15px]  md:w-full grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 py-4">
                          {relatCategoryProduct.map((product) => (
                            <Card key={product.id} productInfo={product} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          </div>
        </>
      </section>
    </>
  );
}

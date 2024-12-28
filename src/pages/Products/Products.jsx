import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import productfound from "../../assets/images/pp.webp";
import { Helmet } from "react-helmet";

export default function Products() {
  let [allProuduct, setAllProduct] = useState(null);
  let [allCategory, setAllCategory] = useState([]);
  let [showMoro, setShowMoro] = useState(10);
  let [productCateg, setproductCateg] = useState("");

  async function getCategory() {
    let options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);

    setAllCategory(data.data);
  }

  async function getCategoryProduct() {
    const option = {
      url: `https://ecommerce.routemisr.com/api/v1/products?limit=${showMoro}&category[in]=${productCateg}`,
      method: "GET",
    };
    let { data } = await axios.request(option);
    setAllProduct(data.data);
  }
  async function getAllProduct() {
    const option = {
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      method: "GET",
    };
    let { data } = await axios.request(option);
    setAllProduct(data.data);
  }
  function moroProduct() {
    if (showMoro <= 10) {
      setShowMoro((showMoro += 10));
    }
  }
  function handelChanegeCatog(e) {
    setproductCateg(e.target.value);
  }
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    if (productCateg == "") {
      getAllProduct();
    } else {
      getCategoryProduct();
    }
  }, [showMoro, productCateg]);

  return (
    <>
      <Helmet>
        <title>All products</title>
        <meta
          name="description"
          content="All products page frsh cart wepsite"
        />
      </Helmet>
      <div className="container">
        <div className="text-center w-full  dark:border-gray-600  rounded-2xl shadow-md backdrop-blur-2xl  mb-5  p-3 px-5 border  flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-gray-800  dark:text-gray-200  text-2xl font-semibold my-3">
            All products
          </h2>
          <div className="drowp-down-product ">
            <h3 className="text-sn font-semibold text-gray-600 dark:text-gray-200 ">
              {" "}
              Categories
            </h3>
            <select
              name="product"
              id=""
              onChange={handelChanegeCatog}
              className=" bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-[1.5px] py-1 font-semibold px-2 rounded-md border-gray-500 outline-none mt-2"
            >
              <option value="">all product</option>
              {allCategory.map((Categorys) => (
                <option key={Categorys._id} value={Categorys._id}>
                  {Categorys.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="m-auto">
          {allProuduct == "" ? (
            <div className="notfound-product flex flex-col gap-3 justify-center items-center text-center">
              <div className="w-[80%] flex justify-center items-center ">
                <img src={productfound} alt="" className="w-[35%] " />
              </div>
              <p className="text-3xl text-gray-950 font-bold dark:text-white">
                sorry,no product found!
              </p>
              <p className="text-xl text-gray-600 dark:text-gray-100 font-semibold ">
                This category does not contain any products. Choose another
                category.
              </p>
            </div>
          ) : (
            <>
              <div className="inear grid w-[90%] ml-[15px]  md:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-8">
                {allProuduct === null ? (
                  <div className="iner col-span-6">
                    <Loading />
                  </div>
                ) : (
                  allProuduct.map((product) => (
                    <Card key={product.id} productInfo={product} />
                  ))
                )}
              </div>
              <div className="flex justify-center w-full">
                <button
                  className=" border border-gray-500 rounded-3xl dark:text-gray-200 dark:hover:text-primay-600   hover:border-primay-600  text-gray-600 hover:text-primay-600 text-lg font-semibold px-3 py-1"
                  onClick={moroProduct}
                >
                  see more products...
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

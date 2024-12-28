import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import ImageGallery from "react-image-gallery";
import Card from "../../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Helmet } from "react-helmet";
import { SwiperNavButton } from "../../components/SwiperNavButton/SwiperNavButton";
export default function ProductDetails() {
  let [productDetails, setProductDetails] = useState(null);
  let [relatProduct, setRelatProduct] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const { id } = useParams();

  async function getProudectDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);

    setProductDetails(data.data);
  }

  console.log(productDetails);
  async function getRelatedProdects() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);

    setRelatProduct(data.data);
  }
  useEffect(() => {
    getProudectDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails === null) return;
    getRelatedProdects();
  }, [productDetails]);

  return (
    <>
      <Helmet>
        <title>product details</title>
        <meta
          name="description"
          content="roduct detailspage frsh cart wepsite"
        />
      </Helmet>
      {productDetails && relatProduct ? (
        <>
          <Helmet>
            <title>{productDetails.title}</title>
          </Helmet>
          <section className="grid grid-cols-4 md:grid-cols-12 gap-16 py-4  ">
            <div className="col-span-4  md:col-span-5 overflow-hidden w-full">
              <ImageGallery
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={false}
                items={productDetails.images.map((image) => {
                  return { original: image, thumbnail: image };
                })}
              />
            </div>
            <div className="col-span-4  md:col-span-7 space-y-7  md:mt-10 w-full ">
              <div className="">
                <h2 className="text-2xl text-gray-700  dark:text-gray-300 font-semibold mb-1 ">
                  {productDetails.title}
                </h2>
                <h3 className=" text-xl font-semibold text-primay-600">
                  {productDetails.category.name}
                </h3>
              </div>
              <p className=" text-lg text-gray-500 dark:text-gray-200 font-medium">
                {productDetails.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-800 dark:text-gray-300  font-semibold">
                  <span className=" text-lg text-gray-600 dark:text-gray-200  font-semibold mr-1">
                    {productDetails.price}
                  </span>
                  EGP
                </div>
                <div className="">
                  <i className="fa-solid fa-star text-lg text-yellow-400"></i>{" "}
                  <span className="text-gray-700 font-semibold">
                    {productDetails.ratingsAverage}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ productId: id });
                }}
                className="bg-primay-600 hover:bg-primay-800 transition-colors py-2 w-full rounded-xl text-white font-semibold "
              >
                Add To Card
              </button>
            </div>
          </section>
          <section className="py-10">
            <h2 className="text-2xl border-t pt-4 dark:border-gray-600 dark:text-gray-200  font-semibold text-gray-800 mb-8 ml-6">
              Related Products
            </h2>
            <div className="">
              <Swiper
                className=""
                loop={true}
                slidesPerView={5}
                spaceBetween={15}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  420: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
                keyboard={{ enabled: true }}
              >
                <SwiperNavButton />
                {relatProduct.map((product) => (
                  <SwiperSlide key={1} className="md:py-2 py-5 px-6 md:px-1">
                    <Card productInfo={product} key={product.id} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

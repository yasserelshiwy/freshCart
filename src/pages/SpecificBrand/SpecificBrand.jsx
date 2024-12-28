import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import axios from "axios";

export default function SpecificBrand() {
  const { id } = useParams();
  let [specificBrand, setSpecificBrand] = useState(null);

  async function getspecificBrand() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data.data);
    setSpecificBrand(data.data);
  }

  useEffect(() => {
    getspecificBrand();
  }, []);

  return (
    <>
      {specificBrand === null ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          <div className=" w-20 overflow-hidden rounded-full">
            <img
              className=" object-contain w-full"
              src={specificBrand.image}
              alt=""
            />
          </div>
          <h2 className="text-center text-gray-900 dark:text-slate-200 py-2 font-semibold">
            {specificBrand.name}
          </h2>
        </div>
      )}
    </>
  );
}

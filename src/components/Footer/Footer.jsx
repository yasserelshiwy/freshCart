import amazon from "../../assets/images/amazon-pay.png";
import amercin from "../../assets/images/American-Express-Color.png";
import mastere from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import appstor from "../../assets/images/get-apple-store.png";
import googlplay from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="py-12 bg-slate-100 dark:bg-gray-950">
        <div className="container">
          <div className="inear px-5 ">
            <section className="space-y-5 mb-6">
              <h2 className="text-3xl text-gray-800 dark:text-gray-300 ">
                Get the Freshcart app
              </h2>
              <p className="tex-3xl text-gray-500 dark:text-gray-200">
                We will send you a link, open it on your pone to download the
                app.
              </p>
              <form
                action=""
                className="flex flex-col gap-3 md:gap-0 md:flex-row "
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                />
                <button
                  type="button"
                  className="py-1 px-4 rounded-lg text-white font-semibold bg-primay-600 hover:bg-primay-700 md:ml-3"
                >
                  Share App Link
                </button>
              </form>
            </section>
            <section className="flex justify-between items-center gap-10 flex-col md:flex-row border-y dark:border-gray-600 py-5">
              <div className="flex justify-center flex-col md:flex-row items-center gap-4">
                <h3 className="text-xl text-gray-800 dark:text-gray-300">
                  payment partners
                </h3>

                <div className="flex ">
                  <img src={amazon} className="w-14" alt="amazon logo" />
                  <img
                    src={amercin}
                    className="w-14"
                    alt="american express logo"
                  />
                  <img src={mastere} className="w-12" alt="maser card logo" />
                  <img src={paypal} className="w-14" alt="paypal logo" />
                </div>
              </div>
              <div className="flex justify-center flex-col md:flex-row items-center gap-4">
                <p className="text-lg text-gray-800 dark:text-gray-300">
                  Get deliveries with freshcart
                </p>
                <div className="flex">
                  <img src={appstor} className="w-28" alt="app stor logo" />
                  <img
                    src={googlplay}
                    className="w-[120px]"
                    alt="googl play logo"
                  />
                </div>
              </div>
            </section>
            <div className="w-full text-center py-3">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                All rights reserved © frontend developer / yasser elshiwy 2024
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

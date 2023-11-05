import { BsFacebook, BsInstagram, BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#333] text-gray-200">
      <div className="container py-10 max-w-1200 flex justify-between flex-col md:flex-row flex-wrap text-start">
        <div>
          <h1 className="text-lg font-semibold mt-8 md:mt-0 mb-4 md:mb-8">
            Aloqa
          </h1>
          <ul>
            <li className="flex"></li>
            <li className="flex items-start mt-4">
              <p className="text-sm ps-[10px] flex flex-col">
                <Link
                  className="mb-2 hover:text-sky-500 transition-colors"
                  to="tel:+998905556494"
                >
                  +998(90)555-64-94
                </Link>
                <Link
                  to="tel:+998933869229"
                  className="hover:text-sky-500 transition-colors mb-2"
                >
                  +998(93)386-92-29
                </Link>
                <Link
                  to="tel:+998940137300"
                  className="hover:text-sky-500 transition-colors mb-2"
                >
                  +998(94)013-73-00
                </Link>
              </p>
            </li>
            <li className="flex">
              <Link to="/" className="flex items-start mt-4">
                <p className="text-sm ps-[10px] hover:text-sky-500 transition-colors mb-2">
                  www.osiyoplus.uz
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg font-semibold mt-8 md:mt-0 mb-4 md:mb-8">
            Ijtimoiy tarmoqlar
          </h1>
          <ul>
            <li className="flex">
              <Link className="flex items-start mt-4" to="/">
                <BsInstagram size={18} />
                <p className="text-sm ps-[10px]">Instagram</p>
              </Link>
            </li>
            <li className="flex">
              <Link to="/" className="flex items-start mt-4">
                <BsFacebook size={18} />
                <p className="text-sm ps-[10px]">Facebook</p>
              </Link>
            </li>
            <li className="flex">
              <Link
                to="https://t.me/hamkorpolymercenter"
                className="flex items-start mt-4"
              >
                <BsTelegram size={18} />
                <p className="text-sm ps-[10px]">Telegram</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container max-w-1200 pb-5">
        <hr className="h-px mt-8 bg-gray-400 border-0" />
        <p className="text-gray-400 text-xs text-center mt-5 ">
          © 2023 Barcha huquqlar himoyalangan
        </p>
      </div>
    </footer>
  );
};

export default Footer;

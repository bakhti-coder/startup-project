import { useState } from "react";
import { Link } from "react-router-dom";

import Hamburger from "hamburger-react";
import Cookies from "js-cookie";

import { TOKEN } from "../../constants";
import useAuth from "../../zustand/auth";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const { isAuthenticated, logOut, role } = useAuth();

  const handleButtonClick = () => {
    setUserOpen(!userOpen);
  };

  const handleLogOut = () => {
    Cookies.remove(TOKEN);
    logOut();
  };

  return (
    <header className="shadow-md ">
      <nav className="container max-w-1200 py-2">
        <div
          onClick={() => setOpen(!open)}
          className={`text-3xl absolute ${
            isAuthenticated ? "left-0" : "right-0"
          } top-2 cursor-pointer md:hidden z-30 `}
        >
          <Hamburger toggled={open} toggle={setOpen} />
        </div>
        <div className={`flex justify-between items-center`}>
          <div
            className={`${
              isAuthenticated ? "md:block hidden" : "md:block"
            } z-50`}
          >
            <Link to={"/"}>
              <img src="/images/logo.svg" width={120} height={24} alt="logos" />
            </Link>
          </div>
          <ul
            className={`ml-0 md:ml-10 md:flex md:items-center md:pb-0  pb-12 absolute md:static md:bg-white bg-white z-10 md:z-auto left-0 w-full h-full md:h-[0] md:w-auto pl-0 transition-all duration-500 ease-in ${
              open ? "top-10 " : "top-[-1000px]"
            }`}
          >
            <hr className="h-px mt-5 bg-gray border-0 " />
            <li
              onClick={() => setOpen(false)}
              className={`md:ps-0 ps-5 md:ml-0 ml-0 md:my-0 my-7`}
            ></li>
            <li
              onClick={() => setOpen(false)}
              className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
            >
              <Link
                to={"/"}
                className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
              >
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              ""
            ) : (
              <li
                onClick={() => setOpen(false)}
                className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
              >
                <Link
                  to={"/login"}
                  className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                >
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated ? (
              ""
            ) : (
              <li
                onClick={() => setOpen(false)}
                className={`ps-5 text-sm  md:ml-8 md:my-0 my-7`}
              >
                <Link
                  to={"/register"}
                  className={`text-gray-800 hover:text-[#688AF2] duration-500 `}
                >
                  {`Register`}
                </Link>
              </li>
            )}
          </ul>
          {isAuthenticated && <div></div>}
          {isAuthenticated && (
            <div>
              {isAuthenticated ? (
                <div
                  onClick={handleButtonClick}
                  className=" -mt-1 z-50 cursor-pointer relative"
                >
                  <div className="bg-[#DB4444] rounded-full">
                    <img
                      src={"/images/user.jpg"}
                      width={50}
                      height={100}
                      alt="user"
                    />
                  </div>
                  {userOpen && (
                    <div className="user_modal z-50 absolute p-5 w w-[200px] right-0">
                      <ul>
                        <li className="flex justify-start mb-3 items-center text-white">
                          <img
                            src={"/images/accounticon.png"}
                            width={24}
                            height={24}
                            alt="order"
                          />
                          <Link to={"/account"} className="ml-2 text-black">
                            Account
                          </Link>
                        </li>
                        <li
                          onClick={handleLogOut}
                          className="flex justify-start items-center text-white"
                        >
                          <img
                            src={"/images/logouticon.png"}
                            width={24}
                            height={24}
                            alt="log-out"
                          />
                          <span className="ml-2 text-black">Log out</span>
                        </li>
                        {role === "admin" && (
                          <li className="flex justify-start mt-3 items-center text-white">
                            <img
                              src={"/images/dashboard.jpg"}
                              width={24}
                              height={24}
                              alt="order"
                            />
                            <Link to={"/dashboard"} className="ml-2 text-black">
                              Dashboard
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

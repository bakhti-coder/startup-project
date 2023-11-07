import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { ROLE, TOKEN, USER } from "../../constants";
import request from "../../server";
import { UserType } from "../../types";
import useAuth from "../../state/auth";

export type Inputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Inputs>();

  const { isAuthenticated, user, role } = useAuth();
  console.log(isAuthenticated, user, role);

  const onSubmit = async (data: Inputs) => {
    const values = data;
    try {
      setLoading(true);
      const {
        data: { token, user },
      } = await request.post<{ token: string; user: UserType }>(
        "auth/login",
        values
      );
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, user.role);
      localStorage.setItem(USER, JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "client") {
        navigate("/education/client");
      } else {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-200 h-screen flex items-center justify-center bg-login-bg">
      <div className="container max-w-1200 py-20">
        <form
          className="rounded-2xl max-w-800 m-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-4xl font-bold text-white">Login</h2>
          <p className="text-sm mt-4 text-gray-200">
            If you have an account, please login
          </p>
          <div className="mt-6">
            <label className="block text-white">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border-2 focus:border-blue-800
                  focus:bg-white focus:outline-none"
              required
              {...register("username")}
            />

            <div className="mt-4">
              <label className="block text-white">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                required
                {...register("password")}
              />
            </div>
            <div className="mt-3 text-right">
              <Link
                to="/register"
                className="text-md text-sky-600 font-semibold underline"
              >
                Don't have an account?
              </Link>
            </div>
            {loading ? (
              <button
                disabled
                type="button"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6 cursor-not-allowed"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Log In
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

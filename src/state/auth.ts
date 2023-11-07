import { NavigateFunction } from "react-router-dom";

import { message } from "antd";

import Cookies from "js-cookie";
import { create } from "zustand";

import { ROLE, TOKEN, USER } from "../constants";
import { Inputs } from "../pages/public/LoginPage";
import { InputsRegister } from "../pages/public/RegisterPage";
import request from "../server";
import { UserType } from "../types";

interface AuthTypes {
  isAuthenticated: boolean;
  user: UserType | null;
  role: string | null;
  loading: boolean;
  login: (values: Inputs, navigate: NavigateFunction) => void;
  signUp: (values: InputsRegister, navigate: NavigateFunction) => void;
  logOut: (navigate: NavigateFunction) => void;
}

const userJson = localStorage.getItem(USER);
const userStorage = userJson ? JSON.parse(userJson) : null;

const role = Cookies.get(ROLE);
const roleReult = role ? role : null;

const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  user: userStorage,
  role: roleReult,
  loading: false,
  login: async (values, navigate) => {
    try {
      set({ loading: true });
      const {
        data: { token, user },
      } = await request.post<{ token: string; user: UserType }>(
        "auth/login",
        values
      );

      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, user.role);
      localStorage.setItem(USER, JSON.stringify(user));

      message.success("Successfully logged in!");

      request.defaults.headers.Authorization = `Bearer ${token}`;
      set({ isAuthenticated: true, role: user?.role });

      if (user?.role === "client") {
        navigate("/education/client");
      } else if (user?.role === "user") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (values, navigate) => {
    try {
      set({ loading: true });
      const {
        data: { token, user },
      } = await request.post<{ token: string; user: UserType }>(
        "auth/register",
        values
      );

      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, user.role);
      localStorage.setItem(USER, JSON.stringify(user));

      message.success("Success regiter!");

      request.defaults.headers.Authorization = `Bearer ${token}`;
      set({ isAuthenticated: true, role: user?.role });

      if (user?.role === "client") {
        navigate("/education/client");
      } else if (user?.role === "user") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    } finally {
      set({ loading: false });
    }
  },
  logOut: (navigate) => {
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    localStorage.removeItem(USER);
    set({ isAuthenticated: false, role: null, user: null });
    navigate("/");
  },
}));

export default useAuth;

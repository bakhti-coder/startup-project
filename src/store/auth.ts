import Cookies from "js-cookie";
import { create } from "zustand";

import { ROLE, TOKEN, USER } from "../constants";
import { UserType } from "../types";

interface AuthTypes {
  isAuthenticated: boolean;
  user: UserType | null;
  role: string | null;
  logOut: () => void;
}

const userJson = localStorage.getItem(USER);
const userStorage = userJson ? JSON.parse(userJson) : null;

const role = Cookies.get(ROLE);
const roleReult = role ? role : null;

const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  user: userStorage,
  role: roleReult,
  logOut: () => {
    set((state) => ({ ...state, isAuthenticated: false }));
    set((state) => ({ ...state, user: null }));
  },
}));

export default useAuth;

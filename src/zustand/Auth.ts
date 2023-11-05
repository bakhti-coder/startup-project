import Cookies from "js-cookie";
import { create } from "zustand";

import { TOKEN, USER } from "../constants";
import { UserType } from "../types";

interface AuthTypes {
  isAuthenticated: boolean;
  user: UserType | null;
  role: string | null;
  logOut: () => void;
}

const userJson = localStorage.getItem(USER);
const userStorage = userJson ? JSON.parse(userJson) : null;

const role = Cookies.get(TOKEN);
const roleReult = role ? role : null;

const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  user: userStorage,
  logOut: () => {
    set((state) => ({ ...state, isAuthenticated: false }));
    set((state) => ({ ...state, user: null }));
  },
  role: roleReult,
}));

export default useAuth;

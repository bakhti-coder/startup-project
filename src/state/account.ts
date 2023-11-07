import { create } from "zustand";

import request from "../server";
import { UserType } from "../types";

interface AuthTypes {
  userData: UserType;
  isFetching: boolean;
  photoLoading: boolean;
  editLoading: boolean;
  passwordEditLoading: boolean;
  photo: null | string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getUserData: () => void;
  editUserData: () => void;
}

const useAccount = create<AuthTypes>((set, get) => ({
  userData: {} as UserType,
  isFetching: false,
  photoLoading: false,
  editLoading: false,
  passwordEditLoading: false,
  photo: null,
  handleFileChange: async (e) => {
    set({ photo: null });
    if (e.target.files) {
      const files = e.target.files[0];
      set({ photo: null });
      try {
        set({ photoLoading: true });
        const formData = new FormData();
        formData.append("file", files);
        const { data } = await request.post("auth/upload", formData);
        set({ photo: data });
        get().getUserData();
      } finally {
        set({ photoLoading: false });
      }
    }
  },
  getUserData: async () => {
    try {
      set({ isFetching: true });
      const { data } = await request.get("auth/me");
      set({
        userData: data,
        photo: data?.photo,
      });
    } finally {
      set({ isFetching: false });
    }
  },
  editUserData: () => {
    // const fields = e.target.fields.value.split(" ");
    // const values = {
    //   firstName: e.target.firstName.value,
    //   lastName: e.target.lastName.value,
    //   username: e.target.username.value,
    //   fields: fields,
    //   info: e.target.info.value,
    //   phoneNumber: e.target.phoneNumber.value,
    //   birthday: "2007-10-21",
    //   address: e.target.address.value,
    //   email: e.target.email.value,
    //   github: e.target.github.value,
    //   linkedin: e.target.linkedin.value,
    //   telegram: e.target.telegram.value,
    //   instagram: e.target.instagram.value,
    //   youtube: e.target.youtube.value,
    // };
    // console.log(values);
  },
}));

export default useAccount;

import { FormInstance, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

import { create } from "zustand";

import request from "../server";
import { PaginationType, Photo } from "../types";

const crud = <T>(url: string) => {
  interface DataState {
    data: T[];
    dataUser: T[];
    loading: boolean;
    total: number;
    search: string;
    page: number;
    selected: null | string;
    isModalLoading: boolean;
    isModalOpen: boolean;
    btnLoading: boolean;
    btnId: string | null;
    photoLoading: boolean;
    photo: Photo | null;
    loadingRole: boolean;
    userId: string;
    closeModal: () => void;
    showModal: (form: FormInstance) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePage: (page: number) => void;
    handleUser: (id: string | undefined) => void;
    getData: () => void;
    getDataUser: () => void;
    changeRole: (id: string, checked: boolean) => void;
    uploadPhoto: (photo: UploadChangeParam<UploadFile>) => void;
    handleOk: (form: FormInstance) => void;
    handleOkDate: (form: FormInstance) => void;
    handleEdit: (id: string, form: FormInstance) => void;
    handleDelete: (id: string) => void;
  }

  return create<DataState>((set, get) => ({
    data: [],
    dataUser: [],
    loading: false,
    total: 0,
    search: "",
    page: 1,
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    btnLoading: false,
    photoLoading: false,
    photo: null,
    btnId: null,
    loadingRole: false,
    userId: "",
    closeModal: () => {
      set((state) => ({ ...state, isModalOpen: false }));
    },
    showModal: (form) => {
      set((state) => ({ ...state, isModalOpen: true }));
      set((state) => ({ ...state, selected: null }));
      set({ photo: null });
      form.resetFields();
    },
    handlePage: (page) => {
      set((state) => ({ ...state, page: page }));
      get().getData();
    },
    handleSearch: (e) => {
      set((state) => ({ ...state, search: e.target.value }));
      get().getData();
    },
    handleUser: (id) => {
      set({ userId: id });
    },
    getData: async () => {
      const { search } = get();
      const { page } = get();
      try {
        set((state) => ({ ...state, loading: true }));
        const {
          data: { pagination, data },
        } = await request.get<{
          pagination: PaginationType;
          data: T[];
        }>(url, {
          params: { search, page },
        });
        set((state) => ({ ...state, total: pagination.total }));
        set((state) => ({
          ...state,
          data: data.map((el: T, i: number) => ({ ...el, key: i })),
        }));
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    getDataUser: async () => {
      const { search } = get();
      const { page } = get();
      const { userId } = get();
      console.log(userId);

      try {
        set((state) => ({ ...state, loading: true }));
        const {
          data: { pagination, data },
        } = await request.get<{
          pagination: PaginationType;
          data: T[];
        }>(url, {
          params: { search, page },
        });
        set((state) => ({ ...state, total: pagination.total }));
        set((state) => ({
          ...state,
          dataUser: data.map((el: T, i: number) => ({ ...el, key: i })),
        }));
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    changeRole: async (id, e) => {
      try {
        set({ loadingRole: true });
        if (e) {
          const client = "client";
          await request.put(`users/${id}`, { role: client });
          get().getData();
          message.success("Client role changed successfully");
        } else {
          const user = "user";
          await request.put(`users/${id}`, { role: user });
          get().getData();
          message.success("User role changed successfully");
        }
      } finally {
        set({ loadingRole: false });
      }
    },
    uploadPhoto: async (e) => {
      set({ photo: null });
      try {
        set({ photoLoading: true });
        const formData = new FormData();
        if (e.file && e.file.originFileObj) {
          formData.append("file", e.file.originFileObj);
        }
        const { data } = await request.post("upload", formData);

        set({ photo: data });
      } finally {
        set({ photoLoading: false });
      }
    },
    handleOk: async (form) => {
      const values = await form.validateFields();
      const { selected } = get();
      try {
        if (selected === null) {
          set((state) => ({ ...state, isModalLoading: true }));
          await request.post(url, values);
        } else {
          set((state) => ({ ...state, isModalLoading: true }));
          await request.put(`${url}/${selected}`, values);
        }
        form.resetFields();
        get().getData();
        get().closeModal();
      } finally {
        set((state) => ({ ...state, isModalLoading: false }));
      }
    },
    handleOkDate: async (form) => {
      const values = await form.validateFields();
      values.startDate = "2020-05-05";
      values.endDate = "2023-10-21";
      const { selected } = get();
      try {
        if (selected === null) {
          set((state) => ({ ...state, isModalLoading: true }));
          await request.post(url, values);
        } else {
          set((state) => ({ ...state, isModalLoading: true }));
          await request.put(`${url}/${selected}`, values);
        }
        form.resetFields();
        get().getData();
        get().closeModal();
      } finally {
        set((state) => ({ ...state, isModalLoading: false }));
      }
    },
    handleEdit: async (id, form) => {
      try {
        set((state) => ({ ...state, selected: id }));
        set((state) => ({ ...state, loading: true }));
        const { data } = await request.get(`${url}/${id}`);
        set((state) => ({ ...state, isModalOpen: true }));
        form.setFieldsValue(data);
        set({ photo: data.photo });
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    handleDelete: async (id) => {
      try {
        set((state) => ({ ...state, btnLoading: true }));
        set((state) => ({ ...state, btnId: id }));
        await request.delete(`${url}/${id}`);
        get().getData();
      } finally {
        set((state) => ({ ...state, btnLoading: false }));
      }
    },
  }));
};

export default crud;

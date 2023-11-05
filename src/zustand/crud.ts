import { FormInstance } from "antd";

import { create } from "zustand";

import request from "../server";
import { PaginationType } from "../types";

const crud = <T>(url: string) => {
  interface DataState {
    data: T[];
    loading: boolean;
    total: number;
    search: string;
    page: number;
    selected: null | string;
    isModalLoading: boolean;
    isModalOpen: boolean;
    btnLoading: boolean;
    btnId: string | null;
    closeModal: () => void;
    showModal: (form: FormInstance) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePage: (page: number) => void;
    getData: () => void;
    handleOk: (form: FormInstance) => void;
    handleOkDate: (form: FormInstance) => void;
    handleEdit: (id: string, form: FormInstance) => void;
    handleDelete: (id: string) => void;
  }

  return create<DataState>((set, get) => ({
    data: [],
    loading: false,
    total: 0,
    search: "",
    page: 1,
    selected: null,
    isModalLoading: false,
    isModalOpen: false,
    btnLoading: false,
    btnId: null,
    closeModal: () => {
      set((state) => ({ ...state, isModalOpen: false }));
    },
    showModal: (form) => {
      set((state) => ({ ...state, isModalOpen: true }));
      set((state) => ({ ...state, selected: null }));
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
        const { data } = await request.get<{
          pagination: PaginationType;
          data: T;
        }>(`${url}/${id}`);
        set((state) => ({ ...state, isModalOpen: true }));
        form.setFieldsValue(data);
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

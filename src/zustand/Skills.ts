import { Skills } from "../types";
import crud from "./crud";

// import { FormInstance } from "antd";

// import { create } from "zustand";

// import request from "../server";
// import { PaginationType, SkillsType } from "../types";

// interface SkillsTypes {
//   skills: SkillsType[];
//   loading: boolean;
//   total: number;
//   search: string;
//   page: number;
//   selected: null | string;
//   isModalLoading: boolean;
//   isModalOpen: boolean;
//   btnLoading: boolean;
//   btnId: string | null;
//   closeModal: () => void;
//   showModal: (form: FormInstance) => void;
//   handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handlePage: (page: number) => void;
//   getSkills: () => void;
//   handleOk: (form: FormInstance) => void;
//   handleEdit: (id: string, form: FormInstance) => void;
//   handleDelete: (id: string) => void;
// }

// const useSkills = create<SkillsTypes>((set, get) => ({
//   skills: [],
//   loading: false,
//   total: 0,
//   search: "",
//   page: 1,
//   selected: null,
//   isModalLoading: false,
//   isModalOpen: false,
//   btnLoading: false,
//   btnId: null,
//   closeModal: () => {
//     set((state) => ({ ...state, isModalOpen: false }));
//   },
//   showModal: (form) => {
//     set((state) => ({ ...state, isModalOpen: true }));
//     set((state) => ({ ...state, selected: null }));
//     form.resetFields();
//   },
//   handlePage: (page) => {
//     set((state) => ({ ...state, page: page }));
//     get().getSkills();
//   },
//   handleSearch: (e) => {
//     set((state) => ({ ...state, search: e.target.value }));
//     get().getSkills();
//   },
//   getSkills: async () => {
//     const { search } = get();
//     const { page } = get();
//     try {
//       set((state) => ({ ...state, loading: true }));
//       const {
//         data: { pagination, data },
//       } = await request.get<{ pagination: PaginationType; data: SkillsType[] }>(
//         "skills",
//         {
//           params: { search, page },
//         }
//       );
//       set((state) => ({ ...state, total: pagination.total }));
//       set((state) => ({
//         ...state,
//         skills: data.map((el: SkillsType) => ({ ...el, key: el._id })),
//       }));
//     } finally {
//       set((state) => ({ ...state, loading: false }));
//     }
//   },
//   handleOk: async (form) => {
//     const values = await form.validateFields();
//     const { selected } = get();
//     try {
//       if (selected === null) {
//         set((state) => ({ ...state, isModalLoading: true }));
//         await request.post("skills", values);
//       } else {
//         set((state) => ({ ...state, isModalLoading: true }));
//         await request.put(`skills/${selected}`, values);
//       }
//       form.resetFields();
//       get().getSkills();
//       get().closeModal();
//     } finally {
//       set((state) => ({ ...state, isModalLoading: false }));
//     }
//   },
//   handleEdit: async (id, form) => {
//     try {
//       set((state) => ({ ...state, selected: id }));
//       set((state) => ({ ...state, loading: true }));
//       const { data } = await request.get<{
//         pagination: PaginationType;
//         data: SkillsType;
//       }>(`skills/${id}`);
//       set((state) => ({ ...state, isModalOpen: true }));
//       form.setFieldsValue(data);
//     } finally {
//       set((state) => ({ ...state, loading: false }));
//     }
//   },
//   handleDelete: async (id) => {
//     try {
//       set((state) => ({ ...state, btnLoading: true }));
//       set((state) => ({ ...state, btnId: id }));
//       await request.delete(`skills/${id}`);
//       get().getSkills();
//     } finally {
//       set((state) => ({ ...state, btnLoading: false }));
//     }
//   },
// }));

const useSkills = crud<Skills>("skills");

export default useSkills;

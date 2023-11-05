export interface UserType {
  role: string;
  fields: string[];
  client: false;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  createdAt: string;
  __v: number;
  address: string;
  birthday: string;
  email: string;
  facebook: string;
  instagram: string;
  phoneNumber: string;
  telegram: string;
  youtube: string;
  photo: string;
}

export interface Skills {
  _id: string;
  name: string;
  __v: number;
  user: null | UserType;
  percent: number;
}
export interface PaginationType {
  next: number;
  page: number;
  total: number;
  limit: number;
}

export interface Experience {
  _id: string;
  workName: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
  user: null | UserType;
  __v: number;
}

export interface Education {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  user: null | UserType;
  __v: number;
}

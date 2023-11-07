export interface UserType {
  role: string;
  fields: string[];
  client: false;
  _id: string;
  info: string;
  firstName: string;
  photo: string;
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
  github: string;
  phoneNumber: string;
  linkedin: string;
  telegram: string;
  youtube: string;
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

export interface Photo {
  _id: string;
  name: string;
  user: string;
  __v: number;
}

export interface Portfolios {
  _id: string;
  name: string;
  description: string;
  photo: Photo;
  __v: number;
  user: null | UserType;
  percent: number;
}

export interface getOnePortfolios {
  _id: string;
  name: string;
  description: string;
  photo?: Photo;
  url: string;
  user: string;
  __v: 0;
}

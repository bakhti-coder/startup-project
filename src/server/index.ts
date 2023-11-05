import { message } from "antd";

import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import { ENDPOINT, TOKEN } from "../constants";

const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err) => {
    message.error(err.response.data.message);

    return Promise.reject(err);
  }
);

export default request;

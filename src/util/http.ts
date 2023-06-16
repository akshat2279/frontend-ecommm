import axios, { AxiosResponse } from "axios";
import config from "../config/config";
import { withData, withError } from "./api";

export const http = axios.create({
  baseURL: config.baseUrl,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((req) => {
  const items = (localStorage.getItem('userdata'));
  const t = JSON.parse(items || '');
  
  const token = t && t.token;
  if (token && req.headers)
    req.headers.authorization = `Bearer ${token}`;

  return req;
});

http.interceptors.response.use(
  (res) => withData(res.data) as AxiosResponse<any>,
  (err) => withError(err?.response?.data?.error)
);

export function get<P>(url: string, params?: P): Promise<any> {
  return http({
    method: "get",
    url,
    params,
  });
}

export function post<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "post",
    url,
    data,
    params,
  });
}

export function postFile<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    url,
    data,
    params,
  });
}

export function put<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "put",
    url,
    data,
    params,
  });
}

export function patch<D, P>(url: string, data: D, params?: P): any {
  return http({
    method: "patch",
    url,
    data,
    params,
  });
}

export function remove<P>(url: string, params?: P): any {
  return http({
    method: "delete",
    url,
    params,
  });
}

import * as http from "../util/http";
import ApiResponse from "../resources/domain/entity/IApiResponse";
import { Icart } from "../Interfaces/user/cartInterface";

export const getProduct = (data?:string): Promise<ApiResponse> => {
    return http.get(`http://localhost:4000/api/v1/getproduct`, data);
  };

export const addCustomProduct = (category?:string, name?:string, page?:any): Promise<ApiResponse> => { 
    return http.get(`http://localhost:4000/api/v1/getcproduct?category=${category}&name=${name}`,page);
  };

export const addToCart = (data?:Icart): Promise<ApiResponse> => {
    return http.post(`http://localhost:4000/api/v1/addtocart`, data);
  };

export const deleteProduct = (params?:string): Promise<ApiResponse> => {   
    return http.remove(`http://localhost:4000/api/v1/deletproduct/${params}`);
  };

export const deletCart = (user?:string,product?:string): Promise<ApiResponse> => {
      return http.remove(`http://localhost:4000/api/v1//deletecart?user=${user}&product=${product}`);
  };

export const cart = (data?:any ): Promise<ApiResponse> => {
    return http.post(`http://localhost:4000/api/v1/getcart`, data);
  };

export const updateUser = (data?: any): Promise<ApiResponse> => {
    return http.post(`http://localhost:4000/api/v1/updateuser`, data);
  };

 
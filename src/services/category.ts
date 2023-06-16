import * as http from "../util/http";

import ApiResponse from "../resources/domain/entity/IApiResponse";


export const getCat = (data?:string): Promise<ApiResponse> => {
    return http.get(`http://localhost:4000/api/v1/getcategory`, data);
  };


  export const category = (data?:any): Promise<ApiResponse> => {
    return http.post(`http://localhost:4000/api/v1/category`, data);
  };
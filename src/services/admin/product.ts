import * as http from "../../util/http";

import ApiResponse from "../../resources/domain/entity/IApiResponse";



export const addProduct = (data?:any): Promise<ApiResponse> => {
    return http.post(`http://localhost:4000/api/v1/addproduct`, data);
  };
import * as http from "../../util/http";
import ApiResponse from "../../resources/domain/entity/IApiResponse";
//import { IAddress } from "../../Interfaces/user/AddressInterface";



  export const addresss = (data?: any): Promise<ApiResponse> => {
    return http.post(`http://localhost:4000/api/v1/address`, data);
  };

  export const getAddress = (data?: any): Promise<ApiResponse> => {
    return http.get(`http://localhost:4000/api/v1/getaddress`,data);
  };

  export const deleteAddress = (user?: number,index?:number): Promise<ApiResponse> => {
    return http.remove(`http://localhost:4000/api/v1/deladdress?user=${user}&index=${index}`);
  };

 

  
  

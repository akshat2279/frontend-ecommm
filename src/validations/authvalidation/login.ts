import * as yup from "yup";
export const schema = yup.object({
    Email: yup.string().email().required("enter email"),
    Password: yup.string().min(4).required("enter password"),
  });
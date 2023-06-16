import * as yup from "yup";
export const productSchema = yup.object({
    name: yup.string().required("enter name"),
    category: yup.string().required("select category"),
    image: yup.string(),
    price: yup.number().required("enter a price"),
    description: yup.string().required("enter description"),
  });
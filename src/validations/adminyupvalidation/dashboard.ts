import * as yup from "yup";
export const dashboardSchema = yup.object({
    name: yup.string().required("enter email"),
    category: yup.string().required("enter password")
});
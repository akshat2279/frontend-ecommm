import * as yup from "yup";
 export const signupSchema = yup.object({
    FirstName: yup.string().required('enter Firstname'),
    LastName: yup.string().required('enter Lastname'),
    Email: yup.string().email().required('enter email'),
    Phone: yup.number()
    .min(10)
    .required('Please Enter Your Phone Number')
    .typeError('Enter a valid Phone Number'),
   
    Password: yup.string().min(4).required('enter password'),
    image: yup.string(),
  });
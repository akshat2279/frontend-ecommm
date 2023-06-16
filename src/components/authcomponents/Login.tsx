import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {  toast } from 'react-toastify';

import axios from 'axios';
import Navbar from "../navbar/Navbar";

import { useNavigate } from "react-router-dom"
import { ILogin } from '../../Interfaces/auth/AuthInterface'
import { useDispatch } from "react-redux";
import { loginuser } from "../../state/actions/AuthAction";

import "../admincomponents/style/InputStyle.css";
import 'react-toastify/dist/ReactToastify.css';

import { schema } from "../../validations/authvalidation/login";
//login form

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [disable ,setdisable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(schema) });

 
  const onSubmit: SubmitHandler<ILogin> = async (data: ILogin) => {
    setdisable(true);
    const res = await axios.post('http://localhost:4000/api/v1/login', data);
    const userData = res?.data?.user;
    setdisable(false);
   
    if (userData !== undefined) {
      dispatch(loginuser(userData));
      localStorage.setItem('userdata', JSON.stringify(userData));
      if (userData?.isAdmin) {
        toast.success("loged in");
        navigate("/dashboard");
      }
      else{
        toast.success("loged in");
        navigate("/home");
      }}
    else{
      toast.warn('inncorrect password or email');
      
    }}


  return (
    
    <div>
      <Navbar />
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <label>Email</label>
          <br />
          <input className="input" type="email" {...register("Email")}></input>
          <br />
          <p style={{ color: 'red' }}> {errors.Email?.message}</p>
        </>
        <>
          <label>Password</label>
          <br />
          <input className="input" type="Password" {...register("Password")}></input>
          <br />
          <p style={{ color: 'red' }}>{errors.Password?.message}</p>
        </>
        <button disabled={disable}>submit</button>
      </form>
      </div>
    
  );
}
export default Login;

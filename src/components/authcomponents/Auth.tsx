import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';
import Navbar from '../navbar/Navbar';

import { Link, useNavigate } from 'react-router-dom';
import { IData } from '../../Interfaces/auth/AuthInterface'

import "../admincomponents/style/InputStyle.css";
import { signupSchema } from '../../validations/authvalidation/sigup';


//sigup form

const Auth = () => {
  const navigate = useNavigate();

  const [base, setbase] = useState<string>();
  const [disable, setdisable] = useState(false);

  //convert image to base64
  const handleImageUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base = event.target?.result;
        setbase(String(base));
      };
      reader.readAsDataURL(file);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm<IData>({ resolver: yupResolver(signupSchema) });

  const onSubmit: SubmitHandler<IData> = async data => {
    setdisable(true);
    data.image = base;
    const result = await axios.post('http://localhost:4000/api/v1/signUp', data);
    if (result?.data?.status === true) {
      setdisable(false);
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar />
      <h1>SignUP</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <label>FirstName</label><br />
          <input className='input'
            type="text"
            {...register('FirstName')}></input>
          <br />
          <p style={{ color: 'red' }}> {errors.FirstName?.message}<br /></p>
        </>

        <>
          <label>LastName</label><br />
          <input className='input'
            type="text"
            {...register('LastName')}></input>
          <br />
          <p style={{ color: 'red' }}> {errors.LastName?.message}<br /></p>
        </>

        <>
          <label>Email</label><br />
          <input className='input'
            type="email"
            {...register('Email')}></input>
          <br />
          <p style={{ color: 'red' }}> {errors.Email?.message}<br /></p>
        </>

        <>
          <label>Phone</label><br />
          <input className='input'
            type="number"
            {...register('Phone')}></input>
          <br />
          <p style={{ color: 'red' }}>{errors.Phone?.message}</p>
          <br />
        </>

        <>
          <label>Password</label><br />
          <input className='input'
            type="Password"
            {...register('Password')}></input>
          <br />
          <p style={{ color: 'red' }}>{errors.Password?.message}</p>
        </>

        <br />
        <label>Image</label>
        <br />
        <input className="input"
          type="file"
          accept="image/*"
          onChangeCapture={handleImageUpload}
          {...register("image")} ></input>
        <br />


        <button disabled={disable}>submit</button>
        <br />
        <Link to="/login">LogIn Here</Link>
      </form>
    </>
  )
}
export default Auth
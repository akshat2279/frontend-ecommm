import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import { category } from '../../../services/category';

import { IData } from '../../../Interfaces/admin/AdminInterface'

import "../style/InputStyle.css";
import 'react-toastify/dist/ReactToastify.css';
import { dashboardSchema } from '../../../validations/adminyupvalidation/dashboard';

// admin panel to add category

const Dashboard = () => {

    const [disable, setdisable] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IData>({ resolver: yupResolver(dashboardSchema) });
    const onSubmit: SubmitHandler<IData> = async (data) => {
        setdisable(true);
        await category(data);
        reset();
        setdisable(false);
    }

    // logout admin
    const handleLogout = () => {
        toast('bye 😊😊');
        localStorage.clear();
    };

    return (
        <>
            <ul>
                <li>
                    <NavLink to="/products">All Products</NavLink>
                </li>
                <li>
                    <NavLink to="/product">ADD Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login" onClick={handleLogout} >logout</NavLink>
                </li>
            </ul>

            <h1>add category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <br />
                <>
                    <label>name</label>
                    <br />
                    <input className='input'
                        type="string"
                        {...register("name")}></input>
                    <br />
                    {errors.name?.message}
                </>

                <>
                    <label>slug</label>
                    <br />
                    <input className='input'
                        type="string"
                        {...register("category")}></input>
                    <br />
                    {errors.category?.message}
                </>
                <button disabled={disable}>submit</button>
            </form>
        </>
    )
}
export default Dashboard
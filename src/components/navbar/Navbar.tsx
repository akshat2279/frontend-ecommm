import React from 'react'
import { NavLink } from "react-router-dom"
const Navbar = () => {
    return (
        <>
            <ul>
                

                <li>
                    <NavLink to="/signup">SignUP</NavLink>
                </li>
                
                <li>
                    <NavLink to="/login">LogIn</NavLink>
                </li>


            </ul>

        </>
    )
}

export default Navbar
import React from 'react'
import { Navbar } from '../../containers'
import RegisterUser from '../../containers/register-user'
import "./styles.css"
export default function Register() {
    return (
        <div className="register">
            <Navbar/>
            <RegisterUser/>
        </div>
    )
}

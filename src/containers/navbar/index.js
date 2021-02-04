import React from 'react'
import { SignInBtn } from '../../components'
import "./styles.css";
export default function Navbar() {
    return (
        <div className="navbar">
            <p>React Social</p>
            <SignInBtn />
        </div>
    )
}

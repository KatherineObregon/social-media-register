import React, { useContext, useState } from 'react'
import { SignInBtn } from '../../components'
import "./styles.css";
import {UserContext} from "../../contexts/user"
import LogoutBtn from '../../components/logout-btn';
export default function Navbar() {
    const [user, setUser]= useContext(UserContext).user;
    return (
        <div className="navbar" style={{alignItems:"center"}}>
            <p >React Social</p>
            {user?
            <div className="header_left" style={{alignItems:"center"}}>
                <LogoutBtn />
                <img className="navbar_img" src={user.photoURL} />
            </div>
            
             :<SignInBtn />}
            
        </div>
    )
}

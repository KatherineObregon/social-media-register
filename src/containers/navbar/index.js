import React, { useContext, useState } from 'react'
import { SignInBtn } from '../../components'
import "./styles.css";
import {UserContext} from "../../contexts/user"
import LogoutBtn from '../../components/logout-btn';
import {SetUsuario} from "../../components/get-user"
import { UserInfoContext } from '../../contexts/userInfo';
export default function Navbar() {
    const [user, setUser]= useContext(UserContext).user;
    const[userInfo, setUserInfo]=useContext(UserInfoContext).userInfo;
    
    console.log("user info desde navbar",userInfo);
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

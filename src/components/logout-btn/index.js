import React, { useContext} from 'react'
import { UserContext } from '../../contexts/user.js';
import {logout} from "../../sevices/auth.js";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./styles.css"

export default function LogoutBtn() {
     
    const [user, setUser]= useContext(UserContext).user;
    const logoutBtnClick=async ()=>{
        let logout_success = await logout();
        if(logout_success){
            setUser(null);
            console.log("Se cerró sesión");
        }
        
    }
    return (
        <div onClick={logoutBtnClick} style={{cursor:"pointer"}}>
            <i className="logoutBtn material-icons">exit_to_app</i>
        </div>
    )
}
        
    

    

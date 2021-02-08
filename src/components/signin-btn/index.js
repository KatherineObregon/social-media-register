import React, { useContext} from 'react'
import { UserContext } from '../../contexts/user.js';
import {signInWithGoogle} from "../../sevices/auth.js";
import "./styles.css"

export default function SignInBtn() {
     
    const [user, setUser]= useContext(UserContext).user;
    const signInBtnClick=async ()=>{
        let userBySignIn = await signInWithGoogle();
        if(userBySignIn){
            setUser(userBySignIn);
        }
        
    }
    return (
        <div className="signInBtn" onClick={signInBtnClick} style={{cursor:"pointer"}}>
            <p>Sign with Google</p>
        </div>
    )
}
        
    

    

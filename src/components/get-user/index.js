import React,{useContext} from 'react'
import {db} from "../../firebase"
import { UserContext } from '../../contexts/user'
import { UserInfoContext } from '../../contexts/userInfo';

export const SetUsuario = async ()=>{
    
    const [user, setUser] = useContext(UserContext).user;
    const [userInfo, setUserInfo] = useContext(UserInfoContext).userInfo;
           
            if(user !== null){
                console.log("user uid",user.uid);
                
                    const userRef = db.collection('users').doc(`${user.uid}`);
                     const doc = await userRef.get();
                     if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        
                        //console.log('Document data:', doc.data().nombres);
                        const datosUsuario = doc.data();
                        console.log("datos usuario:",datosUsuario);
                        setUserInfo(datosUsuario);
                       
                         console.log("El usuario es ", userInfo);
                        }
                 
                
               
                }
            
}
        
        
 
    

// export default function LoginBtn() {
    
    
//     return (
//         <div>
            
//         </div>
//     )
// }

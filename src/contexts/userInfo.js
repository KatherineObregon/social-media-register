import React, {createContext, useState} from "react";

export const UserInfoContext = createContext();
export const UserInfoContextProvider =(props) =>{
    const [userInfo, setUserInfo] = useState(null);
    return (
        <UserInfoContext.Provider value={{userInfo:[userInfo,setUserInfo]}}>
            {props.children}
        </UserInfoContext.Provider>
    );
}
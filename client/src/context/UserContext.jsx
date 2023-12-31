import React, { useState, useContext } from "react";
import { useCookies } from 'react-cookie'

const UserContext = React.createContext();

/*
  Provides information to any component that needs it. 
  Sets user based on token in headers.
*/
export const UserProvider = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [currentUser, setCurrentUser] = useState(cookies.user ? cookies.user : {});

    const handleUpdateUser = (user) => {
        if (user.token) setCookie('user', JSON.stringify(user), { path: '/', maxAge: 60 * 60});
        else removeCookie('user')
        setCurrentUser(user);
    };

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
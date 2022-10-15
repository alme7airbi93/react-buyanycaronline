import { createContext, useContext } from "react";
import  User from '../common/models/User'

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    console.log('childer in context')

    const setUserData = (data)=>{
        console.log(data, 'in setUSer')
        const {username, phone, role, surename,id} = data;
        localStorage.setItem('username',username);
        localStorage.setItem('surename',surename);
        localStorage.setItem('phone',phone);
        localStorage.setItem('id',id);
        localStorage.setItem('role',role);
    }

    const getUserData = ()=>{
        const username = localStorage.getItem('username');
        const surename =  localStorage.getItem('surename');
        const phone =  localStorage.getItem('phone');
        const id =  localStorage.getItem('id');
        const role =  localStorage.getItem('role');
        const data = {
            username:username,
            surename:surename,
            phone:phone,
            id:id,
            role:role
        }
        return data;

    }

    return (
        <UserContext.Provider value={{
            setUserData:(data)=>setUserData(data),
            getUserData:()=>getUserData()
        }}>
            {children}
        </UserContext.Provider>
    )
}


export const NewAdvertisement = createContext();

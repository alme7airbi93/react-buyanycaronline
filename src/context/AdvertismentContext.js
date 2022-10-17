import { useState } from "react";
import { createContext } from "react";

export const AdvertismentCtx =  createContext();

function AdvertismentProvider ({children}){
    const [ads, setAds] = useState({})
    return(
        <AdvertismentCtx.Provider
        value={{ads,setAds}}
        >{children}</AdvertismentCtx.Provider>
    )
}

export default AdvertismentProvider
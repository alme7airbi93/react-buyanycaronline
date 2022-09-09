import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";
import { createContext, useState } from "react";

export const UserContext = createContext({
	setUser:()=>{}
});

export const NewAdvertisement = createContext({
	// setAdvertisement:()=>{
	// }
});

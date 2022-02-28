import { createContext } from 'react';

export const UserContext = createContext({
	setUser:()=>{}
});


export const NewAdvertisement = createContext({
	title: '', 
	description: '',
	price: 0, 
	location: [], 
	owner: [], 
	views: [], 
	state: [], 
	owner_phone: '', 
	photos: [], 
	setAdvertisement:()=>{}	
});

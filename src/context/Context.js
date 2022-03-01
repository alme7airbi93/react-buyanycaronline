import { createContext } from 'react';

export const UserContext = createContext({
	setUser:()=>{}
});


export const NewAdvertisement = createContext({
	title: '', 
	description: '',
	price: 0, 
	vehicles: {
		value: '', 
		label: ''
	}, 
	makes: {
		value: '', 
		label: '', 
		parent_id: ''
	}, 
	models: {
		value: '', 
		label: '', 
		parent_id: ''
	},
	setAdvertisement:()=>{}	
});

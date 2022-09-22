

export const preSaveOrUpdate = (val)=> {
	try {
		delete val["id"];
		delete val["_id"];
		return JSON.parse(JSON.stringify(val));
	} catch (e){
		console.log(e);
	}
};

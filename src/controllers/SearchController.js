import { getSearchAdvertisement } from "../common/repository/AdvertisementDB"

export const SearchAdvertisement = async(data) => {
	return await getSearchAdvertisement(data).then(res => {
       return res;
    }).catch(err => {
        alert("No data found")
        return {msg:"No data found",success:false}
    })
}
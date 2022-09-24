import {Advertisement_Types} from "./Advertisement_Types";


export const AdvertisementOptions = ()=>{
    let options = [];
    for (const [key, val] of Object.entries(Advertisement_Types)) {
        options.push({value: key, label: val})
    }
    return options;
}
import { FormDataValidation } from "../common/validations/FormDataValidation";
import { checkAdvertisemntType
 } from "../common/validations/ClassesTypeOfValidations";

import { createAdvertisement,updateArrayField } from "../common/repository/AdvertisementDB";

import {
    getDownloadURL,
    uploadString,
    uploadBytes,
    getStorage,
    listAll,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
 
export const AdsStepVerfication = (adSelected,data) => {
    console.log(data,'data')
    console.log(FormDataValidation(data))
    if (FormDataValidation(data)) {

    const classInstance = checkAdvertisemntType(adSelected)
    const dataObj = Object.assign(classInstance,
        {
            ...adSelected,
            ...data
        });

    return {success:true,data:dataObj}
}
else{
    alert('Please fill up required feild')

}

}


export const createAd = async (advertisement) => {
   await createAdvertisement(advertisement).then(async(res) => {
        if (res.success) {
          await savePhotos(res.data)
          return {success:true,msg:'Advertisment posted successfully'}

        }
        else{
            return {success:false,msg:'Something went wrong'}
        }
      });

}

const savePhotos = async (id) => {
    const url = [];
    for (let i = 0; i < photos.length; i++) {
      await uploadImageToStorage(photos[i], id).then((res) => url.push(res));
    }
    await updateArrayField(id, url).then((res) =>
      console.log(res, "res image url saved")
    );
  };


  const uploadImageToStorage = async (file, id) => {
    const imagePath = "advertisement/" + id;
    const date = new Date();
    const filename = Math.floor(date.getTime() / 1000);
    const storage = getStorage();
    const storageRef = ref(storage, imagePath + `/${filename}`);
    await uploadString(storageRef, file[0], "data_url").then((res) =>
      console.log(res.ref)
    );
    const url = await getDownloadURL(storageRef);
    return url;

  };

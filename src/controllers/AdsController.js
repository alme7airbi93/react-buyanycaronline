import { useContext } from "react";
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
  const isFormValid = FormDataValidation(data)




  console.log(adSelected,'advertise selected')
  const newAdvertise = {...adSelected,...data};
  console.log(newAdvertise,'New Advertisement')

    if (!isFormValid.error) {

    const classInstance = checkAdvertisemntType(adSelected)
    const dataObj = Object.assign(classInstance,
        {
            ...adSelected,
            ...data
        });

    return {success:true,data:dataObj}
}
else{
    return {success:false,...isFormValid};

}

}


export const createAd = async (advertisement,photos) => {
   await createAdvertisement(advertisement).then(async(res) => {
        if (res.success) {
          console.log('Lorem Ipsum',res)
          await savePhotosNew(res.data,photos).then(()=>{           
              return {success:true,msg:'Advertisment posted successfully'}
           

          })

        }
        else{
            return {success:false,msg:'Something went wrong'}
        }
      });

}

const savePhotosNew = async (id,photos) => {
    const url = [];
    for (let i = 0; i < photos.length; i++) {
      await uploadImageToStorage(photos[i], id).then((res) => url.push(res));
    }
    await updateArrayField(id, url).then((res) =>res);
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

import { FormDataValidation } from "../common/validations/FormDataValidation";
import { checkAdvertisemntType } from "../common/validations/ClassesTypeOfValidations";

import {
  createAdvertisement,
  updateArrayField,
} from "../common/repository/AdvertisementDB";

import {
  getDownloadURL,
  uploadString,
  uploadBytes,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateAdsById } from "../common/repository/AdvertisementDB";
import { getSearchAdvertisement } from "../common/repository/AdvertisementDB";

export const AdsStepVerfication = (adSelected, data) => {
  const isFormValid = FormDataValidation(data);
  console.log(isFormValid, "isFormValid");
  if (!isFormValid.error) {
    const classInstance = checkAdvertisemntType(adSelected);
    const dataObj = Object.assign(classInstance, {
      ...adSelected,
      ...data,
    });

    return { success: true, data: dataObj };
  } else {
    return { success: false, ...isFormValid };
  }
};

export const createAd = async (advertisement, photos) => {
  console.log(photos);
  await createAdvertisement(advertisement).then(async (res) => {
    if (res.success) {
      console.log("Lorem Ipsum", res);
      await savePhotosNew(res.data, photos).then(() => {
        return { success: true, msg: "Advertisment posted successfully" };
      });
    } else {
      return { success: false, msg: "Something went wrong" };
    }
  });
};
export const saveAdsPhotos = async (adsId, photos) => {
  console.log(adsId, photos, "photoss");
  return await savePhotosNew(adsId, photos).then(() => {
    return { success: true, msg: "Photo uploaded successfully" };
  });
};

const savePhotosNew = async (id, photos) => {
  const url = [];

  for (let i = 0; i < photos.length; i++) {
    await uploadImageToStorage(photos[i], id).then((res) => url.push(res));
  }
  await updateArrayField(id, url).then((res) => res);
};

const uploadImageToStorage = async (file, id) => {
  const stringArray = file.split(";");
  const base64String = stringArray[stringArray.length - 1];
  const base64Image = base64String.split(",")[1];
  const imagePath = "advertisement/" + id;
  const date = new Date();
  const filename = Math.floor(date.getTime() / 1000);
  const storage = getStorage();
  const storageRef = ref(storage, imagePath + `/${filename}`);
  await uploadString(storageRef, base64Image, "base64").then((res) =>
    console.log(res.ref)
  );
  const url = await getDownloadURL(storageRef);
  return url;
};

export const updateAds = async (adsId, ads) => {
  console.log(adsId, ads, "adsId,ads");
  return await updateAdsById(adsId, ads)
    .then((res) => {
      console.log(res, "resss");
      return res;
    })
    .catch((err) => {
      return { success: false, msg: "Something went wrong" };
    });
};

export const SearchAdvertisement = async (data) => {
  return await getSearchAdvertisement(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      alert("No data found");
      return { msg: "No data found", success: false };
    });
};

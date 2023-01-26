import { auth } from "../common/repository/main.js";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getAuth,
  updateEmail,
} from "firebase/auth";

import {
  getUserByUsername,
  saveUser,
  updateUser,
} from "../common/repository/UserDB.js";
import User from "../common/models/User";
import { User_Roles } from "../common/data/User_Roles";
import { Store } from "react-notifications-component";

const googleProvider = new GoogleAuthProvider();

export const signUpWithEmailAndPassword = (user, password) => {
  return createUserWithEmailAndPassword(auth, user.username, password)
    .then((data) => {
      console.log(data, "data returned");
      return data.user.getIdToken();
    })
    .then((idtoken) => {
      const token = idtoken;
      console.log(user);
      saveUser(user);
      return { token: token };
    })
    .catch((err) => {
      let error = "";
      if (err.code === "auth/email-already-in-use") {
        error = "Email already in use";
      } else {
        error = "The password needs to be at least 6 characters";
      }
      return { error: error };
    });
};

export const logInWithEmailAndPassword = (email, password) => {
  let token = "";
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user.getIdToken();
    })
    .then((idtoken) => {
      token = idtoken;
      return getUserByUsername(email);
    })
    .then((userData) => {
      return userData.data;
    })
    .then((data) => {
      return { profile: data, error: "", token: token };
    })
    .catch((err) => {
      let error = "";
      if (err.code !== "") {
        error = "Email and Password incorrect";
      }
      return { profile: "", error: error, token: "" };
    });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const getGoogleCred = async() => {
// 	return await signInWithPopup(auth, googleProvider)
// 	.then(async (result) => {
// 		// This gives you a Google Access Token. You can use it to access the Google API.
// 		console.log(result)
// 		return result;
// 	})
// }

export const GoogleSignin = async () => {
  return await signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const googleUser = result.user;
      return await getUserByUsername(googleUser.email)
        .then((data) => {
          return { profile: data.data, token: token };
        })
        .catch(async () => {
          console.log("Saving user !");
          let user = new User(
            googleUser.email,
            User_Roles.CUSTOMER,
            "",
            googleUser.displayName,
            credential.providerId
          );
          return await saveUser(user).then((res) => {
            const usernew = Object.assign(new User(), {
              ...user,
              _id: res.data,
            });
            console.log(usernew, "user instance");
            return { profile: usernew, token: token };
          });
        });
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
      return { profile: "", error: error.message, token: credential };
    });
};

export const updateEmailAddress = (email, uid) => {
  console.log(email, uid, "email");
  const auth = getAuth();
  console.log(auth, "auth");
  return updateEmail(auth.currentUser, email)
    .then((res) => {
      console.log(res);
      return updateUser({ _username: email }, uid);

      // Email updated!
      // ...
    })
    .catch((error) => {
      Store.addNotification({
        title: "Eror",
        message: error,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
        },
      });
      // alert(error);
      // An error occurred
      // ...
    });
};

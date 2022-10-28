import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { getUserByUsername, updateUserProfile } from "../../../common/repository/UserDB";
import Addmobile from "../../../components/Modal/Addmobile/Addmobile";
import { UserContext } from "../../../context/Context";
import { updateUserPassword } from "../../../common/repository/UserDB";
import { BsPencilSquare } from "react-icons/bs";
import "./AccountSetting.css";
import User from "../../../common/models/User";
import UpdatePasswordModal from "../../../components/Modal/UpdatePasswordModal/UpdatePasswordModal";

const AccountSettings = () => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  const [dbUser, setDbUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState({
	phone:false,
	password:false

  });


  const handleOpen = (type) => {
    setOpen({...open,[type]:true});
  };

  const handleclose = (type) => {
    setOpen({...open,[type]:false});
  };	


  //Fetching Live user from databse

	useEffect(() => {
		setLoading(true)
		getUserByUsername(user.username)
			.then((res) => {
				if (res.success) {
					setDbUser(res.data)
					setLoading(false)
				}
			})
			.catch((e) => {
				console.log(e)
				setLoading(false)

			})
	}, [])


	const updatePhone = (phoneNumber)=>{
		const updatedData =  Object.assign(new User(),{...dbUser,_phone:phoneNumber})
		updateUserProfile(updatedData._id,updatedData)
		.then((res)=>{
			if(res.success){
				alert('Data updated Successfully')
				handleclose('phone')
			}
			
		})


	}

  const UserAccountDisplay = () => {
    if (dbUser._signInMethod[0] == "email") {
		console.log(dbUser,'dbUser')
      return (
        <>
          <p>Linked Account Type: Email</p>
          <p>
            Username : <span>{dbUser.username}</span>
          </p>
          <p>
            Update Password{" "}
            <BsPencilSquare
              onClick={()=>handleOpen('password')}
              className="cs_pointer text-light"
            />
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>Linked Account Type: Google</p>
          <p>Change Email/Update Sign method</p>
        </>
      );
    }
  };

  return (
    <React.Fragment>
      {!loading && (
        <>
          <h5>Account Settings</h5>
          <hr />
          {UserAccountDisplay()}
		  <p>Phone:<span>{dbUser._phone}</span>
		  <BsPencilSquare
                className="cs_pointer text-light"
                onClick={()=>handleOpen('phone')}
              />
		  
		  </p>
        </>
      )}

      <Addmobile 
	  open={open.phone} 
	  updatePhone = {updatePhone}
	  handleclose={handleclose} />

      <UpdatePasswordModal 
	  open={open.password} 
	  handleclose={handleclose} />
    </React.Fragment>
  );
};

export default AccountSettings;

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
import EditProfile from "../../../components/Modal/Editprofile/EditProfile";
import { updateEmailAddress,logOut} from "../../../controllers/AuthController";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();
	const navigate = useNavigate();

  const [dbUser, setDbUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState({
	phone:false,
	password:false,
  email:false,

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
  const deleteCookie = (name) => {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	};

  const updateDetail = (email,password)=>{
    const updatedData =  Object.assign(new User(),{...dbUser})
    setLoading(true)
		updateEmailAddress(email,updatedData._id)
		.then((res)=>{
      console.log(res,'res1')
			if(res.success){
        logOut();
        deleteCookie("userToken");
        ctx.clearUserData();
        alert('Data updated Successfully please login again.')
        setLoading(false)
        navigate("/");
				handleclose('email')
			}
			
		}).catch(error => {
      alert('Somthing went wrong')
      setLoading(false)
    })
	}

  const UserAccountDisplay = () => {
    console.log(dbUser,'dbUser')
    if (dbUser._signInMethod[0] == "email") {
		
      return (
        <>
          <p><span>Linked Account Type: Email</span></p>
          <p>
            Username : <span>{dbUser.username}</span>
          </p>
          <p>
            Update Password{" "}
            {/* <BsPencilSquare
              onClick={()=>handleOpen('password')}
              className="cs_pointer text-light"
            /> */}
            <a onClick={()=>handleOpen('password')}>
            <img src="./assets/img/edit.png"/>
            </a>
          </p>
        </>
      );
    } else {
      return (
        <>
          <p><span>Linked Account Type: Google</span></p>
          <p className="d-flex justify-content-between"><span>Email: {dbUser._username}</span>
            {/* <BsPencilSquare
              className="cs_pointer text-light"
              onClick={()=>handleOpen('email')}
            /> */}
            <a onClick={()=>handleOpen('email')}>
            <img src="./assets/img/edit.png"/>
            </a>
          </p>
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
          <div className="d-flex justify-content-between">
		      <div>Phone:<span> {dbUser._phone}</span> </div>
		  {/* <BsPencilSquare
                className="cs_pointer text-light"
                onClick={()=>handleOpen('phone')}
              /> */}
              <a onClick={()=>handleOpen('phone')}>
            <img src="./assets/img/edit.png"/>
            </a>
		  </div>
		 
        </>
      )}

      <Addmobile 
	  open={open.phone} 
	  updatePhone = {updatePhone}
	  handleclose={handleclose} />

      <UpdatePasswordModal 
	  open={open.password} 
	  handleclose={handleclose} />

    <EditProfile
    open={open.email}
    updateDetail = {updateDetail}
    handleclose={handleclose} />

    </React.Fragment>
  );
};

export default AccountSettings;

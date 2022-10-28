import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../common/repository/UserDB";
import { UserContext } from "../../../context/Context";
import { updateUserPassword } from "../../../common/repository/UserDB";


const AccountSettings = () => {
	const ctx = useContext(UserContext);
	const user = ctx.getUserData()

	const [dbUser, setDbUser] = useState({})
	const [loading, setLoading] = useState(true)
	const [password,setPassword] = useState(null);
	const [confirmPass, setConfirmPass] = useState(null);

	//Fetching Live user from databse 

	useEffect(() => {
		updatePassword('87654321')
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

	const updatePassword = ()=>{
		if(password != confirmPass  ){
			alert("Password and Confirm password do not match")
			return
		}
		else if(password == ''){
			alert("Cannot be blank")
			return
		}
		else{
			updateUserPassword(password)
			.then((res)=>{
				console.log(res)
				if(res.success){
					alert('Password updated successfully')
				}
				else{
					alert('Something went wrong')
				}
			})
			.catch((err)=>{
				console.log(err)
				// alert('Something went wrong')
				
			})
			
		}

	}

	const UserAccountDisplay = () => {
		if (dbUser._signInMethod[0] == 'email') {
			return (
				<>
					<p>Linked Account Type: Email</p>
					<p>Username : <span>{dbUser.username}</span></p>
					<p>Update Password</p>
				</>
			)
		}
		else {
			return (
				<>
					<p>Linked Account Type: Google</p>
					<p>Change Email/Update Sign method</p>
				</>
			)
		}

	}


	return (
		<React.Fragment>
			{
				!loading &&(
					<>
					<h5>Account Settings</h5>
					<hr />
					{UserAccountDisplay()}
					{dbUser._phone == '' ?
						(
							<p>Add phone number</p>
						) :
						(
							<p>{dbUser._phone}</p>
		
						)
		
		
					}
					</>

				)
				
			}



		</React.Fragment>
	);
};

export default AccountSettings;

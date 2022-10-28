import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../common/repository/UserDB";
import { UserContext } from "../../../context/Context";


const AccountSettings = () => {
	const ctx = useContext(UserContext);
	const user = ctx.getUserData()

	const [dbUser, setDbUser] = useState({})
	const [loading, setLoading] = useState(true)

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

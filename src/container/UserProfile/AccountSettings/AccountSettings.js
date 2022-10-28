import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../common/repository/UserDB";
import Addmobile from "../../../components/Modal/Addmobile/Addmobile";
import { UserContext } from "../../../context/Context";
import { BsPencilSquare } from "react-icons/bs";
import "./AccountSetting.css";
import Updatepassword from "../../../components/Modal/Updatepassword/Updatepassword";

const AccountSettings = () => {
  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  const [dbUser, setDbUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const handleOpen = (val) => {
    setOpen(val);
    // console.log(val);
  };

  const handleclose = () => {
    setOpen(false);
  };
  const handlePasswordopen = (val2) => {
    setPassword(val2);
  };
  const handlePasswordclose = () => {
    setPassword(false);
  };
  //Fetching Live user from databse

  useEffect(() => {
    setLoading(true);
    getUserByUsername(user.username)
      .then((res) => {
        if (res.success) {
          setDbUser(res.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const UserAccountDisplay = () => {
    if (dbUser._signInMethod[0] == "email") {
      return (
        <>
          <p>Linked Account Type: Email</p>
          <p>
            Username : <span>{dbUser.username}</span>
          </p>
          <p>
            Update Password{" "}
            <BsPencilSquare
              onClick={handlePasswordopen}
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
          {dbUser._phone == "" ? (
            <p>
              Add phone number
              <BsPencilSquare
                className="cs_pointer text-light"
                onClick={handleOpen}
              />
            </p>
          ) : (
            <p>{dbUser._phone}</p>
          )}
        </>
      )}

      <Addmobile open={open} handleclose={handleclose} />
      <Updatepassword open={password} handleclose={handlePasswordclose} />
    </React.Fragment>
  );
};

export default AccountSettings;

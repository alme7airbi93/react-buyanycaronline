import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { UserContext } from "../../context/Context";
import AccountSettings from "./AccountSettings/AccountSettings";
import EditProfile from "../../components/Modal/Editprofile/EditProfile";
import { getUserByUsername } from "../../common/repository/UserDB";

const UserProfile = () => {
  const navigate = useNavigate();

  const ctx = useContext(UserContext);
  const user = ctx.getUserData()

  //State
  const [adsData, setAdsData] = useState([])


  useEffect(() => {

  },[])

  const profileHandler = () => {
    navigate("/new-ads");
  };


  const [open, setOpen] = useState(false);
  const handleOpen = (val) => {
    setOpen(val);
    console.log(val);
  };
  const handleclose = () => {
    setOpen(false);
  };

  return (
    <div className={"user_info_main"}>
      <Container>
        <Row>
          <Col md={5} className="user_info">
            <AccountSettings />
            <button className="search_btn" onClick={() => handleOpen(true)}>
              Edit
            </button>
          </Col>
          <Col md={6} className="user_info">
            <h5>Manage Ads</h5>
            <hr />
            {
              adsData && adsData.length ? (

                <div className="d-flex justify-content-between">
                  <div>
                    <p>
                      Title: <span>ad.title</span>
                    </p>
                    <p>
                      Price: <span>ad.price</span>
                    </p>
                    <p>
                      Description: <span>ad.description</span>
                    </p>
                  </div>
                  <div>
                    <button className="search_btn mb-3">Modify</button>
                    <button className="search_btn">Mark as Sold</button>
                  </div>
                </div>
              )
                : (
                  <>
                    <h5>You have not published any advertisement yet</h5>
                    <br />
                  </>

                )
            }
          </Col>
          <Col md={2} className="user_info">
            <h5>New Ad?</h5>
            <button className="search_btn" onClick={profileHandler}>
              Click Here
            </button>
          </Col>
        </Row>
        <EditProfile open={open} handleclose={handleclose} />
      </Container>
    </div>
  );
};
export default UserProfile;

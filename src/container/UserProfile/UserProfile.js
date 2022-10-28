import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { UserContext } from "../../context/Context";
import AccountSettings from "./AccountSettings/AccountSettings";
import EditProfile from "../../components/Modal/Editprofile/EditProfile";
import { getUserByUsername } from "../../common/repository/UserDB";
import { getUsersAdvertisement } from "../../common/repository/AdvertisementDB";
import Modify from "../../components/Modal/Modify/Modify";
import Loder from "../../common/loder/Loder";

const UserProfile = () => {
  const navigate = useNavigate();

  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  //State
  const [adsData, setAdsData] = useState([]);
  const [ads,setAds] = useState({})
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsersAdvertisement(user._id).then((res) => {
      setLoading(false);
      if (res.success) {
        // console.log(res.data);
        setAdsData(res.data);
      }
    });
  }, []);

  const profileHandler = () => {
    navigate("/new-ads");
  };

  const [open, setOpen] = useState(false);
  const [openmodification, setOpenmodification] = useState(false);
  const handleOpen = (val) => {
    setOpen(val);
    // console.log(val);
  };
  const handleclose = () => {
    setOpen(false);
  };
  const Modifyication = (val,ad) => {
       console.log(ad,'ad');
       setAds(ad)
    setOpenmodification(val);
  
  };
  const closemodification = () => {
    setOpenmodification(false);
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
            <div className=" ad_list">
              {adsData && adsData.length ? (
                adsData.map((ad) => (
                  <div className="ad_data d-flex justify-content-between">
                    <div>
                      <p>
                        Title: <span>{ad._title}</span>
                      </p>
                      <p>
                        Price: <span>{ad._price}</span>
                      </p>
                      <p>
                        Description: <span>{ad._description}</span>
                      </p>
                    </div>
                    <div>
                      <button
                        className="search_btn mb-3"
                        onClick={() => Modifyication(true,ad)}
                      >
                        Modify
                      </button>
                      <button className="search_btn">Mark as Sold</button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <h5>You have not published any advertisement yet</h5>
                  <br />
                </>
              )}
            </div>
          </Col>
          <Col md={2} className="user_info">
            <h5>New Ad?</h5>
            <button className="search_btn" onClick={profileHandler}>
              Click Here
            </button>
          </Col>
        </Row>
        <EditProfile open={open} handleclose={handleclose} />
        <Modify open={openmodification} ads={ads} handleclose={closemodification} />
      </Container>
      {loading && <Loder />}
    </div>
  );
};
export default UserProfile;

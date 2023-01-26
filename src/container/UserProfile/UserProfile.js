import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { UserContext } from "../../context/Context";
import AccountSettings from "./AccountSettings/AccountSettings";
import EditProfile from "../../components/Modal/Editprofile/EditProfile";
import { getUserByUsername } from "../../common/repository/UserDB";
import {Advertisement_states} from "../../common/data/Advertisement_states.js";
import { advertisementStatusChange, getUsersAdvertisement } from "../../common/repository/AdvertisementDB";
import Modify from "../../components/Modal/Modify/Modify";
import Loder from "../../common/loder/Loder";

const UserProfile = () => {
  const navigate = useNavigate();

  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  //State
  const [adsData, setAdsData] = useState([]);
  const [ads, setAds] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsersAdvertisement(user._id).then((res) => {
      setLoading(false);
      if (res.success) {
        console.log(res.data);
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

  useEffect(() => {
    console.log(ads, openmodification, "adsss");
  }, [ads, openmodification, Modify]);

  const Modifyication = (val, ad) => {
    console.log(ad, ad._id, "ad");
    setAds(ad);
    // navigate("/ads-edit/"+ad._id);
    navigate("/car-detail/" + ad._id);
    // setOpenmodification(val);
  };
  const closemodification = () => {
    setOpenmodification(false);
  };

  const changeAsSold = async ( id ) => {
    // console.log(id, Advertisement_states.Sold);
    await advertisementStatusChange(id, Advertisement_states.Sold);
    getUsersAdvertisement(user._id).then((res) => {
      if (res.success) {
        setAdsData(res.data);
      }
    });
  };

  return (
    <div className={"user_info_main"}>
      <Container>
        <Row>
          <Col md={6}>
            <div className="left-side">
              <Col md={12} className="user_info">
                <AccountSettings />
                {/* <button className="search_btn" onClick={() => handleOpen(true)}>
                Edit
              </button> */}
              </Col>

              <Col md={12} className="user_info">
                <h5>New Ad?</h5>
                <button className="search_btn" onClick={profileHandler}>
                  Click Here
                </button>
              </Col>
            </div>
          </Col>
          <Col md={6}>
            <Col md={12} className="user_info">
              <h5>Manage Ads</h5>
              <hr />
              <div className="ad_list">
                {adsData && adsData.length ? (
                  adsData.map((ad, idx) => (
                    <div key={idx} className="ad_data d-flex flex-wrap">
                      <div className="col-md-3 pb-3 col-sm-12">
                        <div className="item_photos">
                          <img
                            src={
                              ad._photos.length
                                ? ad._photos[0]
                                : "https://cdn-icons-png.flaticon.com/512/16/16096.png"
                            }
                            width="100%"
                          />
                        </div>
                      </div>
                      <div className="col-md-9 col-sm-12 d-flex justify-content-between">
                        <div className="description">
                          <p>
                            Title: <span>{ad._title}</span>
                          </p>
                          <p>
                            Price: <span>{ad._price} AED</span>
                          </p>
                          <p>
                            Description: <span>{ad._description}</span>
                          </p>
                        </div>
                        <div className="button-wrapper">
                          <button
                            className="search_btn mb-3"
                            onClick={() => Modifyication(true, ad)}
                            disabled = {ad._status == Advertisement_states.Sold ? true : false}
                          >
                            Modify
                          </button>
                          <button className="search_btn" onClick={() => changeAsSold(ad._id)}>Mark as Sold</button>
                        </div>
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
          </Col>
        </Row>
        <EditProfile open={open} handleclose={handleclose} />
        {/* {ads ? (
        <Modify open={openmodification} ads={ads} handleclose={closemodification} />
        )
        :
        (
         <></>
        )} */}
      </Container>
      {loading && <Loder />}
    </div>
  );
};
export default UserProfile;

import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./UserProfile.css";


const UserProfile = () => {

    const navigate = useNavigate();

    const profileHandler = () => {
        navigate('/new-ads')
    }


    return (
        <div className={'user_info_main'}>
            <Container>
                <Row>
                    <Col md={3} className='user_info'>
                        <h5>Account Settings</h5>
                        <hr />
                        <p>Name: <span>currentUser.username</span></p>
                        <p>Password: <span> ********** </span></p>

                        <p>Address</p>
                        <hr />
                        <p>Country: <span>currentUser.country</span></p>
                        <p>City: <span>currentUser.city</span></p>

                        <p>Contact Details</p>
                        <hr />
                        <p>Mobile: <span>currentUser.mobile</span></p>
                    </Col>
                    <Col md={6} className='user_info'>
                        <h5>Manage Ads</h5>
                        <hr />
                        <h5>You have not published any advertisement yet</h5>
                        <br />

                        <div className='d-flex justify-content-between'>
                            <div>
                                <p>Title: <span>ad.title</span></p>
                                <p>Price: <span>ad.price</span></p>
                                <p>Description: <span>ad.description</span></p>
                            </div>
                            <div>
                                <button className="search_btn mb-3">Modify</button>
                                <button className="search_btn">Mark as Sold</button>
                            </div>
                        </div>
                    </Col>
                    <Col md={2} className='user_info'>
                        <h5>New Ad?</h5>
                        <button className="search_btn" onClick={profileHandler}>Click Here</button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default UserProfile;
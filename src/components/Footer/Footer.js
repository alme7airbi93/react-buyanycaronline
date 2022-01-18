import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
            <div className='footer-main'>
               <div className="container">
                <div className="row">
                <div className="col-md-6 d-flex justify-content-center footer-button">
                    <button > Home </button>
                    <span> | </span>
                    <button > Cars </button>
                    <span> | </span>
                    <button > Boats </button>
                    <span> | </span>
                    <button > About </button>
                    <span> | </span>
                    <button > Contact </button>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <p style={{color: '#fff', fontSize: "12px"}}>Â© 2019 BUYANYCARONLINE</p>
                </div>
                </div>
                </div>
            </div>
    );
};

export default Footer;

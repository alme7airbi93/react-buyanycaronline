import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<div className='footer-main'>
			<div className="container">
				<div className="row">
					<div className="col-md-6 d-flex justify-content-center align-items-center footer-button">
						<a href="#" className="footer-link"> Home </a>
						<span> | </span>
						<a href="#" className="footer-link"> Cars </a>
						<span> | </span>
						<a href="#" className="footer-link"> Boats </a>
						<span> | </span>
						<a href="#" className="footer-link"> About </a>
						<span> | </span>
						<a href="#" className="footer-link"> Contact </a>
					</div>
					<div className="col-md-6 d-flex justify-content-center align-items-center">
						<span className="copyright">Â© 2019 BUYANYCARONLINE</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;

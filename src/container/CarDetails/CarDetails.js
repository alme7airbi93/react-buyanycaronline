import React, {useEffect,useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import "./CarDetails.css";
import { useParams } from "react-router-dom";
import { getAdvertisementById } from "../../common/repository/AdvertisementDB";
import { checkAdvertisemntType } from "../../common/validations/ClassesTypeOfValidations";
import Modify from "../../components/Modal/Modify/Modify";

const CarDetails = () => {

	const params = useParams();
	const [data, setData] = useState({});
	const [allData, setAllData] = useState({});
	const [openmodification, setOpenmodification] = useState(false);
	const [close, setClose] = useState(false);

	const id = params.Id

	useEffect(() => {
		
		getAdvertisementById(id).then(res => {
			setAllData(res.data)
			let ads = res.data;
			let instance = checkAdvertisemntType(ads)
			const newdata = Object.assign(instance,{...ads})
			const modifyData = newdata.getAlldata()
			setData(modifyData)
		})

	}, [id,setData,close,setAllData]);


	const Modifyication = () => {
	 setOpenmodification(true);
   };
   const closemodification = () => {
	 setOpenmodification(false);
	 setClose(!close)
   };


	return (
		<div className='car_details_main'>
			<Container>
				<Row className={"justify-content-center"}>
					<Col md={3} className={"car_title"}>
						<h5>{data.title}</h5>
						<hr />
						<p> Price: <span> {data.price} </span> </p>
						<p> Type: <span> {data.advertisement_type} </span> </p>
						{/* <p> Created Date: <span> car.create_at</span></p> */}
					</Col>
					<Col md={6} className={"car_title"}>
						<div className={"d-flex justify-content-around flex-wrap"}>
							{Object.keys(data).map((key) => (
                              <div key={key} style={{flex:'50%',display:(key === 'title' || key === 'Price' || key === 'views' || key === 'advertisement_type') ? 'none' : 'flex'}}>
							  <p>{key.toUpperCase()}: <span>  &nbsp;{data[key]} </span></p>
							  </div>
							))}
						</div>
						<button
                        className="search_btn mb-3"
                        onClick={() => Modifyication(true)}
                      >
                        Modify
                      </button>

					</Col>
					<Col md={2} className={"car_title"}>
						<p>Viewed This: <span>{allData._views}</span></p>
					</Col>
				</Row>
			</Container>
			{allData && allData._title ? (
			<Modify open={openmodification} ads={allData} handleclose={closemodification} />
			):
			(<></>)
			}
		</div>
	);
};
export default CarDetails;

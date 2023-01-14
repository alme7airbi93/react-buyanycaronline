import { Col, Row } from "react-bootstrap";
// import Select from "react-select";
import React, { useContext } from "react";
import Carsform from "./forms/cars";
import Motorcycleform from "./forms/motorcycle";
import Plate_Numberform from "./forms/Plate_Number";
import Accessory_nameform from "./forms/accessory_name ";
import Boatform from "./forms/boat";
import HeavyVehicleform from "./forms/heavyVehicleform";
import { useEffect } from "react";
import { AdvertismentCtx } from "../../../context/AdvertismentContext.js";
import { Advertisement_Types } from "../../../common/data/Advertisement_Types";

const CategorySelection = (props) => {
  const adsCtx = useContext(AdvertismentCtx);
  const advertisement = adsCtx.ads;

  useEffect(() => {
    console.log(advertisement, "adasdasd, in advertisement");
  }, []);

  const handler = () => {
    if (advertisement.type === undefined) {
      adsCtx.setAds({ ...advertisement, type: { kind: " " } });
    }
  };
  return (
    <React.Fragment>
      <Col md={5} className="find_details">
 
        <Row className="">
          <Col md="12">
            {advertisement._advertisement_type === Advertisement_Types.Cars ? (
              <Carsform nextStep={props.nextStep} />
            ) : advertisement._advertisement_type === Advertisement_Types.HeavyVehicles ? (
              <HeavyVehicleform nextStep={props.nextStep} />
            ) : advertisement._advertisement_type === Advertisement_Types.Motorcycles ? (
              <Motorcycleform nextStep={props.nextStep} />
            ) : advertisement._advertisement_type === Advertisement_Types.PlateNumber ? (
              <Plate_Numberform nextStep={props.nextStep} />
            ) : advertisement._advertisement_type === Advertisement_Types.Accessories ? (
              <Accessory_nameform nextStep={props.nextStep} />
            ) : advertisement._advertisement_type === Advertisement_Types.Boats ? (
              <Boatform nextStep={props.nextStep} />
            ) : null}
          </Col>

        </Row>
      </Col>
    </React.Fragment>
  );
};

export default CategorySelection;

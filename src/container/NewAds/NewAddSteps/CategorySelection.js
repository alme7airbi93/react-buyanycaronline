import { Button, Col, Row } from "react-bootstrap";
// import Select from "react-select";
import React, { useState, useContext } from "react";
// import {AdvertisementOptions} from "../../../common/data/SelectOptions.js";
import { StepsStateInSummary, StepsStateInDetail } from "../stepsState";
// import { makes, models ,models_second} from "../../../common/data";
import { NewAdvertisement } from "../../../context/Context";
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

          {/* <Col md={10} className="btn-group" >
						<Button right className="back_btn" onClick={() => props.nextStep(StepsStateInSummary)} >Back</Button>
						<Button className="next_btn" onClick={() => { handler();props.nextStep(StepsStateInDetail);}} >Next</Button>
					</Col> */}
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default CategorySelection;

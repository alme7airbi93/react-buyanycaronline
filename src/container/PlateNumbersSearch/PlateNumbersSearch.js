import React, { useState, useEffect } from "react";
import "./PlateNumbersSearch.css";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import { ManufacturingYearsOptions } from "../../common/data/SelectOptions";
import { getSearchAdvertisement } from "../../common/repository/AdvertisementDB";
import CardBlock from "../../components/CardBlock/CardBlock";
import {
  AdvertisementOptions,
  BodyCondition,
  ColorTypes,
  FuelTypes,
  TransmitionTypes,
} from "../../common/data/SelectOptions";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const height = window.innerHeight;
const PlateNumbersSearch = () => {
  // 	const [searchParams, setSearchParams] = useSearchParams();
  //    const query = JSON.parse(searchParams.get("result"))

  const [vehicleValue, setVehicle] = useState("");
  const [year, setYear] = useState("");
  const [colorType, setColorType] = useState("");
  const [condition, setConditions] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { state } = useLocation();

  const options = [
    { value: "corolla", label: "corolla" },
    { value: "civic", label: "civic" },
  ];

  useEffect(() => {
    console.log(state, "state");
    getSearchAdvertisement(state)
      .then((res) => {
        console.log(res, "res");
        setResultData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  }, []);

  const setVehicleHandle = (value) => {
    setVehicle(value);
  };

  const getSearch = async () => {
    setLoading(true);
    var searchArr = [];
    if (vehicleValue) {
      vehicleValue.key = "_advertisement_type";
      searchArr.push(vehicleValue);
    }
    if (year) {
      year.key = "_year";
      searchArr.push(year);
    }
    if (colorType) {
      colorType.key = "_color";
      searchArr.push(colorType);
    }
    if (fuelType) {
      fuelType.key = "_fuel_type";
      searchArr.push(fuelType);
    }
    if (transmissionType) {
      transmissionType.key = "_transmission";
      searchArr.push(transmissionType);
    }
    if (condition) {
      condition.key = "_condition";
      searchArr.push(condition);
    }
    console.log("searchArr", searchArr);
    getSearchAdvertisement(searchArr)
      .then((res) => {
        console.log(res, "res");
        setResultData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };
  const clearFilter = async () => {
    setLoading(true);
    setVehicle("");
    setTypeDropdown(false);
    setYear("");
    setColorType("");
    setConditions("");
    setFuelType("");
    setTransmissionType("");

    var searchArr = [];
    getSearchAdvertisement(searchArr)
      .then((res) => {
        console.log(res, "res");
        setResultData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <div className="main-carSearch-div">
      <div className="container">
        <div className="row">
          <div className="col-md-2 carSearch-find-div"></div>
          <div
            className="col-md-7 carSearch-result-div"
            style={{
              height: height - 180,
              overflow: "auto",
              minHeight: "510px",
            }}
          >
            <h3 className="d-flex justify-content-between">
              <span>Search Result</span>
              <span>({resultData.length})</span>
            </h3>
            <hr />

            {resultData.map((item) => (
              <div className="col-md-12 mb-3" key={item._id}>
                <CardBlock item={item} />
              </div>
            ))}
          </div>
          <div className="col-md-2 carSearch-block-div">
            <p>Empty block for ads</p>
            <hr />
          </div>
        </div>
      </div>
      {loading === true ? (
        <div className="loader">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default PlateNumbersSearch;

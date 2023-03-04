import React, { useState, useContext, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { makes, models } from "../../common/data";
import {
  AdvertisementOptions,
  BodyCondition,
  ColorTypes,
  FuelTypes,
  TransmitionTypes,
} from "../../common/data/SelectOptions";
import CategorySelection from "../NewAds/NewAddSteps/CategorySelection";
import {
  ManufacturingYearsOptions,
  PriceTypes,
} from "../../common/data/SelectOptions";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "../../context/Context";

const Home = () => {
  const [advSearch, setAdvSearch] = useState(false);

  const [vehicle, setVehicle] = useState("");
  const [make, setMake] = useState("");
  const [modelFirst, setModelFirst] = useState("");
  const [typeDropdown, setTypeDropdown] = useState(false);

  const [year, setYear] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [colorType, setColorType] = useState("");
  const [priceType, setPriceType] = useState(0);
  const [condition, setConditions] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [resultData, setResultData] = useState([]);
  const [vehicalMakeValue, setVehicalMakeValue] = useState("");
  const [filterMakes, setFilterMakes] = useState([]);
  const [loading, setLoading] = useState(false);

  const ctx = useContext(UserContext);
  const user = ctx.getUserData();

  const navigation = useNavigate();

  const changePageHandler = () => {
    if (user && user._id) {
      navigation("/new-ads");
    } else {
      navigation("/login");
    }
  };

  const yearList = () =>{
    let arr = [];
    for(let i = (new Date()).getFullYear(); i >= 1920; i--) {
      arr.push({value: i, label: i});
    }
    return arr;
  };

  const rowClass = "col-md-4";

  // if (advSearch) {
  //   rowClass = "col-md-4";
  //   toggleClass = "show_search";
  // } else {
  //   rowClass = "col-md-4";
  //   toggleClass = "hide_search";
  // }

  let makes_options = makes();
  let models_options = models();

  // console.log("vehicles ", models_options);

  const setVehicleHandle = (value) => {
    setLoading(true);
    setVehicle(value || "");
    let makesArray = [];
    if(value) {
      if (value.key === "Cars") {
        makesArray = makes_options.filter((item) => item.parent_id === "1");
      } else if (value.key === "Motorcycles") {
        makesArray = makes_options.filter((item) => item.parent_id === "2");
      } else if (value.key === "HeavyVehicles") {
        makesArray = makes_options.filter((item) => item.parent_id === "4");
      } else if (value.key === "Boats") {
        makesArray = makes_options.filter((item) => item.parent_id === "5");
      } else if (value.key === "Accessories") {
        makesArray = makes_options.filter((item) => item.parent_id === "3");
      } else if (value.key === "PlateNumber") {
        makesArray = makes_options.filter((item) => item.parent_id === "6");
      }
    }
    else {
      setTypeDropdown(false);
    }
    setFilterMakes(makesArray);

    setMake("");
    setLoading(false);
    // setModelFirst("");
    // setTypeDropdown(false);
  };

  const getSearch = async () => {
    var searchArr = [];
    if (vehicle) {
      vehicle.key = "_advertisement_type";
      searchArr.push(vehicle);
    }
    if (make) {
      make.key = "_make";
      searchArr.push(make);
    }
    if (modelFirst) {
      modelFirst.key = "_modal";
      searchArr.push(modelFirst);
    }
    if (year) {
      year.key = "_year";
      searchArr.push(year);
    }
    if(fromYear) {
      fromYear.key = "_fromYear";
    }
    if(toYear) {
      toYear.key = "_toYear";
    }
    if (colorType) {
      colorType.key = "_color";
      searchArr.push(colorType);
    }
    if (priceType) {
      priceType.key = "_price";
      searchArr.push(priceType);
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
    if (vehicle.value == "Plate Numbers") {
      navigation("/plate-numbers-search", { state: searchArr });
    } else {
      navigation("/car-search", { state: searchArr });
    }
    console.log("searchArr", vehicle);
    // navigation('/car-search', { state: searchArr })
  };

  const setMakeHandle = (value) => {
    if(value) {
      const modelFirstLevelArrays = models_options.filter(
        (item) => item.parent_id === value.value
      );
  
      if (modelFirstLevelArrays.length !== 0) {
        setTypeDropdown(true);
      } else {
        setTypeDropdown(false);
      }
    }
    else {
      setTypeDropdown(false);
    }
    setMake(value || "");
    setModelFirst("");
  };

  const setFirstModelHandle = (value) => {
    setModelFirst(value);
  };

  const options = [
    { value: "corolla", label: "corolla" },
    { value: "civic", label: "civic" },
  ];

  return (
    <React.Fragment>
      <div className={"home-main-div"}>
        <div className="container">
          <div className="row home-row-div">
            <div className="col-md-11 d-flex justify-content-end ">
              <Button className="first-section-btn" onClick={changePageHandler}>
                PLACE AD
              </Button>
            </div>
            <div className="col-md-12 " style={{ marginTop: "30px" }}>
              <div className="row d-flex justify-content-center">
                <div className="find-vehicle-div col-md-10">
                  <div>
                    <h4>FIND VEHICLE</h4>
                  </div>
                  <form>
                    <div className="container">
                      <div className="row home-select-div pb-0">
                        {/* where to use "rowClass" props */}
                        <div className={rowClass}>
                          <Select
                            placeholder={"Select Motors"}
                            options={AdvertisementOptions()}
                            // set "vehicle" as e
                            onChange={(e) => setVehicleHandle(e)}
                            isSearchable={false}
                            isClearable
                            value={vehicle}
                          />
                        </div>

                        <div className={rowClass}>
                          {vehicle ? (
                            <Select
                              placeholder={
                                vehicle.value === undefined
                                  ? "Select...."
                                  : vehicle.value === "1"
                                  ? "Select Makes"
                                  : "Select Types"
                              }
                              options={filterMakes}
                              onChange={(e) => setMakeHandle(e)}
                              value={make}
                              isSearchable={false}
                              isClearable
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className={rowClass}>
                          {typeDropdown ? (
                            <Select
                              placeholder={
                                make.value === undefined
                                  ? "Select...."
                                  : vehicle.value === "1"
                                  ? "Select Models"
                                  : "Select Types"
                              }
                              onChange={(e) => setFirstModelHandle(e)}
                              options={models_options.filter(
                                (item) =>
                                  item.value === "0" ||
                                  item.parent_id === make.value
                              )}
                              isClearable
                              value={modelFirst}
                              isSearchable={false}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        {!advSearch && (
                          <div className={rowClass}>
                            <Select
                              placeholder={"Select Year"}
                              options={yearList()}
                              // set "vehicle" as e
                              onChange={(e) => setYear(e)}
                              isClearable
                              value={year}
                            />
                          </div>
                        )}
                        {/* meand of $ ????? */}
                      </div>

                      {vehicle.key === "PlateNumber" || vehicle.key === "Accessories" || !advSearch ? (
                        <></>
                      ) : (
                        <div className="row home-select-div1">
                          <div className={`${rowClass}`}>
                            <Select
                              placeholder={"Select Price"}
                              options={PriceTypes()}
                              isClearable
                              onChange={(e) => setPriceType(e)}
                            />
                          </div>
                          <div className={`${rowClass} year-between`}>
                            <Select
                              placeholder={"Year from"}
                              options={ManufacturingYearsOptions()}
                              value={fromYear}
                              isClearable
                              onChange={(e) => setFromYear(e)}
                            />
                            <Select
                              placeholder={"Year to"}
                              options={ManufacturingYearsOptions()}
                              value={toYear}
                              isClearable
                              onChange={(e) => setToYear(e)}
                            />
                          </div>
                          <div className={`${rowClass}`}>
                            <Select
                              placeholder={"Select Color"}
                              options={ColorTypes()}
                              value={colorType}
                              isClearable
                              onChange={(e) => setColorType(e)}
                            />
                          </div>
                          <div className={`${rowClass}`}>
                            <Select
                              placeholder={"Select Transmission"}
                              options={TransmitionTypes()}
                              value={transmissionType}
                              isClearable
                              onChange={(e) => setTransmissionType(e)}
                            />
                          </div>
                          <div className={`${rowClass}`}>
                            <Select
                              placeholder={"Select FuelType"}
                              options={FuelTypes()}
                              value={fuelType}
                              isClearable
                              onChange={(e) => setFuelType(e)}
                            />
                          </div>
                          <div className={`${rowClass}`}>
                            <Select
                              placeholder={"Select Condition"}
                              options={BodyCondition()}
                              isClearable
                              onChange={(e) => setConditions(e)}
                            />
                          </div>
                        </div>
                      )}
                      <div className="row  home-select-div1 pb-5">
                        <div className="col-md-3">
                          <Button
                            className="first-section-btn"
                            onClick={() => getSearch()}
                          >
                            SEARCH
                          </Button>
                        </div>
                        {/* <div className="col-md-3">
														<Button className="first-section-btn" onClick={() => clearFilter()}>CLEAR</Button>
													</div> */}
                      </div>
                      <a
                        className="adv_search_btn"
                        onClick={() => setAdvSearch(!advSearch)}
                      >
                        {" "}
                        ADVANCED SEARCH
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-3" />
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
    </React.Fragment>
  );
};

export default Home;

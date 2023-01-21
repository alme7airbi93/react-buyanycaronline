import React, { useState, useEffect } from "react";
import { Store } from "react-notifications-component";
import "./CarSearch.css";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import {
  ManufacturingYearsOptions,
  PriceTypes,
} from "../../common/data/SelectOptions";
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
import { makes, models } from "../../common/data";
import { SearchAdvertisement } from "../../controllers/AdsController";
const height = window.innerHeight;
const CarSearch = () => {
  // 	const [searchParams, setSearchParams] = useSearchParams();
  //    const query = JSON.parse(searchParams.get("result"))

  const [advSearch, setAdvSearch] = useState(false);
  const [vehicleValue, setVehicle] = useState("");
  const [makeValue, setMake] = useState("");
  const [modelFirstValue, setModelFirst] = useState("");
  let [isTypeDropdown, setTypeDropdown] = useState(false);

  const [year, setYear] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [colorType, setColorType] = useState("");

  const [priceType, setPriceType] = useState(0);
  const [condition, setConditions] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMakes, setFilterMakes] = useState([]);
  const [sortData, setSort] = useState(false);

  const { state } = useLocation();

  const options = [
    { value: "corolla", label: "corolla" },
    { value: "civic", label: "civic" },
  ];
  let rowClass, toggleClass;

  let makes_options = makes();
  let models_options = models();

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

  useEffect(() => {
    //console.log(resultData)
  }, [resultData, setResultData]);

  const setVehicleHandle = (value) => {
    // setLoading(true)
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
  };

  const getSearch = async () => {
    // setLoading(true)
    var searchArr = [];
    if (vehicleValue) {
      vehicleValue.key = "_advertisement_type";
      searchArr.push(vehicleValue);
    }
    if (makeValue) {
      searchArr.push({
        value: makeValue.label,
        label: makeValue.label,
        key: "_make",
      });
    }
    if (modelFirstValue) {
      modelFirstValue.key = "_modal";
      searchArr.push({
        value: modelFirstValue.label,
        label: modelFirstValue.label,
        key: "_modal",
      });
    }
    if (priceType) {
      priceType.key = "_price";
      searchArr.push(priceType);
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

    let result = await SearchAdvertisement(searchArr);
    if (result.data) {
      setResultData(result.data);
      setLoading(false);
    } else {
      alert(result.msg);
      setLoading(false);
    }
  };
  // const clearFilter = async () => {
  //   setLoading(true);
  //   setVehicle("");
  //   setPriceType("");
  //   setTypeDropdown(false);
  //   setMake("");
  //   setFirstModelHandle("");
  //   setYear("");
  //   setColorType("");
  //   setConditions("");
  //   setFuelType("");
  //   setTransmissionType("");

  //   var searchArr = [];

  //   let result = await SearchAdvertisement(searchArr);
  //   if (result.data) {
  //     setResultData(result.data);
  //     setLoading(false);
  //   } else {
  //     alert(result.msg);
  //     setLoading(false);
  //   }
  // };

  const setMakeHandle = (value) => {
    value = value || "";
    const modelFirstLevelArrays = models_options.filter(
      (item) => item.parent_id === value.value
    );

    if (modelFirstLevelArrays.length !== 0) {
      setTypeDropdown(true);
    } else {
      setTypeDropdown(false);
    }
    setMake(value);
    setModelFirst("");
  };

  const setFirstModelHandle = (value) => {
    setModelFirst(value);
  };
  const sortBy = () => {
    setLoading(true);
    if (sortData === false) {
      const Asending = [...resultData].sort((a, b) =>
        a._title > b._title ? 1 : -1
      );
      setResultData(Asending);
      console.log(Asending, "Asending");
      setSort(!sortData);
      setLoading(false);
    } else {
      const Desending = [...resultData].sort((a, b) =>
        a._title > b._title ? -1 : 1
      );
      setResultData(Desending);
      console.log(Desending, "Desending");
      setSort(false);
      setLoading(false);
    }
    Store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        // onScreen: true
      },
    });
  };

  return (
    <div className="main-carSearch-div pt-5">
      <div className="main-wrapper">
        <div className="row">
          <div className="search-side">
            <div className="carSearch-find-div">
              <h5>SEARCH</h5>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <div className={"mb-3"}>
                    <Select
                      placeholder={"Select Motors"}
                      options={AdvertisementOptions()}
                      // set "vehicleValue" as e
                      onChange={(e) => setVehicleHandle(e)}
                      isSearchable={true}
                      isClearable
                      value={vehicleValue}
                    />
                  </div>
                </div>
                {vehicleValue && (
                  <div className="col-md-12">
                    <div className={"mb-3"}>
                      <Select
                        placeholder={
                          vehicleValue.value === undefined
                            ? "Select...."
                            : vehicleValue.value === "1"
                            ? "Select Makes"
                            : "Select Types"
                        }
                        options={filterMakes}
                        onChange={(e) => setMakeHandle(e)}
                        isClearable
                        value={makeValue}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                )}
                {isTypeDropdown && (
                  <div className="col-md-12">
                    <div className={"mb-3"}>
                      <Select
                        placeholder={
                          makeValue.value === undefined
                            ? "Select...."
                            : vehicleValue.value === "1"
                            ? "Select Models"
                            : "Select Types"
                        }
                        onChange={(e) => setFirstModelHandle(e)}
                        options={models_options.filter(
                          (item) =>
                            item.value === "0" ||
                            item.parent_id === makeValue.value
                        )}
                        value={modelFirstValue}
                        isSearchable={true}
                        isClearable
                      />
                    </div>
                  </div>
                )}
                {!advSearch && (
                  <div className="col-md-12">
                    <div className={"mb-3"}>
                      <Select
                        placeholder={"Select Year"}
                        options={ManufacturingYearsOptions()}
                        value={year}
                        isSearchable={true}
                        isClearable
                        onChange={(e) => setYear(e)}
                      />
                    </div>
                  </div>
                )}
                {advSearch && (
                  <>
                    <div className="col-md-12">
                      <div className={"mb-3"}>
                        <Select
                          placeholder={"Select Price"}
                          options={PriceTypes()}
                          value={priceType}
                          isSearchable={true}
                          isClearable
                          onChange={(e) => setPriceType(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 year-between">
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
                    <div className="col-md-12">
                      <div className={"mb-3"}>
                        <Select
                          placeholder={"Select Color"}
                          options={ColorTypes()}
                          value={colorType}
                          isSearchable={true}
                          isClearable
                          onChange={(e) => setColorType(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className={"mb-3"}>
                        <Select
                          placeholder={"Select Transmission"}
                          options={TransmitionTypes()}
                          value={transmissionType}
                          isSearchable={true}
                          isClearable
                          onChange={(e) => setTransmissionType(e)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className={"mb-3"}>
                        <Select
                          placeholder={"Select FuelType"}
                          options={FuelTypes()}
                          value={fuelType}
                          isSearchable={true}
                          isClearable
                          onChange={(e) => setFuelType(e)}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="col-md-12 button-center">
                  <div className={"mb-3"}>
                    <Button
                      type="button"
                      onClick={() => getSearch()}
                      className="first-section-btn"
                    >
                      SEARCH
                    </Button>
                  </div>
                </div>
                <div className="col-md-12 button-center">
                  <div className={"mb-3"}>
                    <Button
                      type="button"
                      onClick={() => setAdvSearch(!advSearch)}
                      className="first-section-btn"
                    >
                      Advanced
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-section">
            <div className="carSearch-result-div">
              <h3 className="d-flex justify-content-between">
                <span>Search Result({resultData.length})</span>
                <span style={{ cursor: "pointer" }} onClick={() => sortBy()}>
                  <img src="./assets/img/sort.png" style={{ width: 24 }} />
                </span>
              </h3>
              <hr />

              <div className="search-wrapper">
                {resultData.map((item, key) => (
                  <a key={key} className="card-linker">
                    <CardBlock item={item} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="position-relative detail-side">
            <div className="carSearch-block-div">
              <p>Empty block for ads</p>
              <hr />
            </div>
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
export default CarSearch;

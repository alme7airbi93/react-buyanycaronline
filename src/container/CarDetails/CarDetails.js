import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import "./CarDetails.css";
import { useParams } from "react-router-dom";
import { getAdvertisementById } from "../../common/repository/AdvertisementDB";
import { checkAdvertisemntType } from "../../common/validations/ClassesTypeOfValidations";
import Modify from "../../components/Modal/Modify/Modify";
import { BsFillTrashFill } from "react-icons/bs";
import { updateAds } from "../../controllers/AdsController";
import PhotoModal from "../../components/Modal/PhotoModal/PhotoModal";
import { saveAdsPhotos } from "../../controllers/AdsController";
import Spinner from "react-bootstrap/Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Store } from "react-notifications-component";
import {
  FuelTypes,
  RegionalOption,
  ColorTypes,
  BodyCondition,
  WarrantyTypes,
  ManufacturingYearsOptions
} from "../../common/data/SelectOptions.js";


const CarDetails = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [allData, setAllData] = useState({});
  const [openmodification, setOpenmodification] = useState(false);
  const [close, setClose] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("");
  const [madeYear, setMadeYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [region, setRegion] = useState("");
  const [condition, setCondition] = useState("");
  const [warranty, setWarranty] = useState("");


  const id = params.Id;

  useEffect(() => {
    getAdvertisementById(id).then((res) => {
      console.log(res);
      setAllData(res.data);
      let ads = res.data;
      let instance = checkAdvertisemntType(ads);
      const newdata = Object.assign(instance, { ...ads });

      const modifyData = newdata.getAlldata();
      console.log(modifyData, "modifyData");
      setData(modifyData);
      setTitle(modifyData.title);
      setPrice(modifyData.price);
      setDesc(modifyData.description);
      setType(modifyData.advertisement_type);
      setColor(modifyData.color);
      setMadeYear(modifyData.year);
      setFuel(modifyData.fuel_type);
      setRegion(modifyData.region);
      setWarranty(modifyData.warranty);
      setCondition(modifyData.condition);
      setLoading(false);
    });
  }, [id, setData, close, setAllData]);

  const Modifyication = () => {
    setOpenmodification(true);
  };

  const modifyData = async () => {
    const data = {
      _title: title,
      _price: price,
      _description: desc,
      _location: region,
      _advertisement_type: type,
      _color: color,
      _fuel_type: fuel,
      _warranty: warranty,
      _condition: condition,
      _year: madeYear,
    };
    await updateAds(id, data).then((res) => {
      if (res.success === true) {
        Store.addNotification({
          title: "Success",
          message: "Advertisement modify successfully.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            showIcon: true,
          },
        });
      } else {
        setLoading(false);
      }

    });
  };

  const closemodification = () => {
    setOpenmodification(false);
    setClose(!close);
  };
  const closeImageModal = () => {
    setImageModal(false);
  };

  const savePhotos = async (allPhotos, propSetLoading) => {
    await saveAdsPhotos(id, allPhotos).then((res) => {
      console.log(res, "res");
      if (res.success === true) {
        // alert(res.msg);
        Store.addNotification({
          title: "Success",
          message: res.msg,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
          },
        });
        setImageModal();
        setClose(!close);
        propSetLoading(false);
      }
    });
  };

  const handleDelete = async (key) => {
    setLoading(true);
    if (confirm("Are you sure ? you want to delete this image.") == true) {
      let NewPhotos = allData._photos.filter((item, index) => index !== key);
      console.log(NewPhotos);
      let data = {
        _photos: NewPhotos,
      };
      await updateAds(id, data).then((res) => {
        console.log(res, "res");
        if (res.success === true) {
          Store.addNotification({
            title: "Success",
            message: "Image Deleted successfully",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
            },
          });
          // alert("Image Deleted successfully");
          setClose(!close);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }
    setLoading(false);
  };

  return (
    <div className="car_details_main">
      <Container>
        {allData && allData._photos ? (
          <Row className={"all-images"}>
            <div className="col-md-12">
              <Carousel
                emulateTouch
                autoPlay
                infiniteLoop
                showArrows={true}
                showStatus={false}
                // centerMode
                showThumbs={false}
              >
                {allData._photos.map((item, key) => (
                  <Col md={12} key={key}>
                    <div className="image-block">
                      <img src={item} key={"photo" + key} />
                      <a
                        className="delete-link"
                        onClick={() => handleDelete(key)}
                      >
                        x
                        {/* <BsFillTrashFill className="cs_pointer text-light" /> */}
                      </a>
                    </div>
                  </Col>
                ))}
              </Carousel>
            </div>
            <Col md={12}>
              <div className="image-add-block">
                <button className="add_btn" onClick={() => setImageModal(true)}>
                  Add Image
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className={"all-images"}>
            <Col md={3}>
              <div className="image-block pt-95">
                <button
                  className="search_btn"
                  onClick={() => setImageModal(true)}
                >
                  Add Image
                </button>
              </div>
            </Col>
          </Row>
        )}
        <Row className={"justify-content-center"}>
          {/* <Col md={5} className={"car_title"}>
            <h5>{data.title}</h5>
            <hr />
            <p>
              {" "}
              Price: <span> {data.price} AED</span>{" "}
            </p>
            <p>
              {" "}
              Type: <span> {data.advertisement_type} </span>{" "}
            </p>
            <p> Created Date: <span> car.create_at</span></p>
          </Col> */}
          <Col md={5} className={"car_title"}>
            <div className={"d-flex flex-column justify-content-around flex-wrap"}>
              {Object.keys(data).map((key) => ( 
                key !== "views" && key !== "title" && key !== "price" && key !== "year" && key !== "fuel_type" && key !== "color" && key !== "condition" && key !== "region" && key !== "warranty" && key !== "description" &&
                <div
                  key={key}
                  style={{
                    flex: "100%",
                    display: "flex",
                  }}
                >
                  <p>
                    {key.toUpperCase()}:{" "}
                    <span>
                      {" "}
                      &nbsp;{data[key]}{" "}
                      {key.toUpperCase() === "PRICE" ? "AED" : ""}{" "}
                    </span>
                  </p>
                </div>
              ))}
              <div>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>Title :</Form.Label>
                  <Form.Control
                    className="input-fields-theme"
                    type="text"
                    value={title}
                    placeholder="Enter Title"
                    onChange={(data) => {
                      console.log(data.target.value);
                      setTitle(data.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>Price :</Form.Label>
                  <Form.Control
                    className="input-fields-theme"
                    type="number"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(data) => {
                      setPrice(parseFloat(data.target.value));
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>Color* :</Form.Label>
                  <Select
                    placeholder={"Color"}
                    options={ColorTypes()}
                    value={ColorTypes().find(
                      (obj) => obj.label === color
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setColor(data.label);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>
                    Manufacturing Year* :
                  </Form.Label>
                  <Select
                    placeholder={"Select"}
                    options={ManufacturingYearsOptions()}
                    value={ManufacturingYearsOptions().find(
                      (obj) => obj.label === madeYear
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setMadeYear(data.label);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>
                    Fuel Type* :
                  </Form.Label>
                  <Select
                    placeholder={"Fuel Type"}
                    options={FuelTypes()}
                    value={FuelTypes().find(
                      (obj) => obj.label === fuel
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setFuel(data.label);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>Region* :</Form.Label>
                  <Select
                    placeholder={"Manufacturing Region"}
                    options={RegionalOption()}
                    value={RegionalOption().find(
                      (obj) => obj.label === region
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setRegion(data.label);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>
                    Condition* :
                  </Form.Label>
                  <Select
                    placeholder={"Body Condition"}
                    options={BodyCondition()}
                    value={BodyCondition().find(
                      (obj) => obj.label === condition
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setCondition(data.label);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>Warranty* :</Form.Label>
                  <Select
                    placeholder={"Enter Warrenty"}
                    options={WarrantyTypes()}
                    value={WarrantyTypes().find(
                      (obj) => obj.label === warranty
                    )}
                    isSearchable={true}
                    onChange={(data) => {
                      setWarranty(data.label);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label style={{ color: "#fff" }}>Description :</Form.Label>
                  <Form.Control
                    className="input-fields-theme"
                    as="textarea"
                    rows={3}
                    value={desc}
                    placeholder="Description"
                    onChange={(data) => {
                      setDesc(data.target.value);
                    }}
                  />
                </Form.Group>

              </div>
            </div>
            <button
              className="search_btn mb-3"
              onClick={() => modifyData()}
            >
              Modify
            </button>
          </Col>
          {/* <Col md={2} className={"car_title"}>
            <p>
              Viewed This: <span>{allData._views}</span>
            </p>
          </Col> */}
        </Row>
      </Container>
      {allData && allData._title ? (
        <Modify
          open={openmodification}
          ads={allData}
          handleclose={closemodification}
        />
      ) : (
        <></>
      )}
      {allData && allData._title ? (
        <PhotoModal
          open={imageModal}
          ads={allData}
          savePhoto={savePhotos}
          handleClose={closeImageModal}
        />
      ) : (
        <></>
      )}

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
export default CarDetails;

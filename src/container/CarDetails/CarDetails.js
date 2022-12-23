import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
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

const CarDetails = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [allData, setAllData] = useState({});
  const [openmodification, setOpenmodification] = useState(false);
  const [close, setClose] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const id = params.Id;

  useEffect(() => {
    getAdvertisementById(id).then((res) => {
      setAllData(res.data);
      let ads = res.data;
      let instance = checkAdvertisemntType(ads);
      const newdata = Object.assign(instance, { ...ads });
      const modifyData = newdata.getAlldata();
      setData(modifyData);
      setLoading(false);
    });
  }, [id, setData, close, setAllData]);

  const Modifyication = () => {
    setOpenmodification(true);
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
        alert(res.msg);
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
          alert("Image Deleted successfully");
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
              <Carousel emulateTouch
                autoPlay
                infiniteLoop
                showArrows={true}
                showStatus={false}
                // centerMode
                showThumbs ={false}
              >
                {allData._photos.map((item, key) => (
                  <Col md={12}>
                    <div className="image-block">
                      <img src={item} key={"photo" + key} />
                      <a
                        className="delete-link"
                        onClick={() => handleDelete(key)}
                      >
                        <BsFillTrashFill className="cs_pointer text-light" />
                      </a>
                    </div>
                  </Col>
                ))}
              </Carousel>
            </div>
            <Col md={12}>
              <div className="image-add-block my-5">
                <button
                  className="add_btn"
                  onClick={() => setImageModal(true)}
                >
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
          <Col md={3} className={"car_title"}>
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
            {/* <p> Created Date: <span> car.create_at</span></p> */}
          </Col>
          <Col md={6} className={"car_title"}>
            <div className={"d-flex justify-content-around flex-wrap"}>
              {Object.keys(data).map((key) => (
                <div
                  key={key}
                  style={{
                    flex: "50%",
                    display:
                      key === "title" ||
                        key === "Price" ||
                        key === "views" ||
                        key === "advertisement_type"
                        ? "none"
                        : "flex",
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
            </div>
            <button
              className="search_btn mb-3"
              onClick={() => Modifyication(true)}
            >
              Modify
            </button>
          </Col>
          <Col md={2} className={"car_title"}>
            <p>
              Viewed This: <span>{allData._views}</span>
            </p>
          </Col>
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

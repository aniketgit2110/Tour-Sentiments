import React, { useState, useRef  , useEffect, useContext} from "react";
import "./../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config.js";
import LoadingAnimation from "../LoadingAnimation.jsx";

import {AuthContext} from './../context/AuthContext';


const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const {user} = useContext(AuthContext)


  const {data:tour , loading , error} = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const [photoUrl, setPhotoUrl] = useState(null);
  const [additionalPhotos, setAdditionalPhotos] = useState([]);

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try{
    if(!user || user === undefined || user === null){
      alert('Please Sign In')
    }

    const reviewObj = {
      username:user?.username,
      reviewText,
      rating:tourRating
    }
      const res = await fetch(`${BASE_URL}/review/${id}`,{
        method: 'post',
        headers:{
          'content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(reviewObj)
      })


      const result = await res.json()
      if(!res.ok){
        return alert(result.message);
      }
      alert(result.message);
    }catch(err){
      alert(err.message);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPhoto = async () => {
      try {
        const apiKey = "EB1py9IDgxegMEKCpTVUcS9Rch4yb3CEIBtpBdZTAXtnknaOcnwhHDLD"; 
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${title}&per_page=1&page=1`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setPhotoUrl(data.photos[0].src.large);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [city, title]);

  //additional photos
  //additional photos
useEffect(() => {
  const fetchAdditionalPhotos = async () => {
    try {
      const apiKey = "EB1py9IDgxegMEKCpTVUcS9Rch4yb3CEIBtpBdZTAXtnknaOcnwhHDLD";
      const perPage = 5;
      const page = 1;

      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${title}&per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.photos && data.photos.length > 0) {
        setAdditionalPhotos(data.photos.slice(1));
      }
    } catch (error) {
      console.error("Error fetching additional photos:", error);
    }
  };

  fetchAdditionalPhotos();
}, [title]);



  return (
    <>
      <section>
        <Container>
        {loading && <LoadingAnimation />} 
      {error && <h4>Error: {error}</h4>} 
          {
            !loading && !error && <Row>
            <Col lg="8">
              <div className="tour_content">
              <img
              src={photoUrl}
              alt="tour-img"
              style={{ width: "100%", height: "450px", objectFit: "cover" }}
            />
                <div className="tour_info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour_rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating == 0 ? null : avgRating}
                      {totalRating == 0 ? (
                        "Not rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>
                    <span>
                      <i className="ri-map-pin-fill"></i>
                      {address}
                    </span>
                  </div>
                  <div className="tour_extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i>
                      {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i>${price}
                      /per person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i>
                      {distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                <div className="tour_reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 rating_group">
                      <span onClick={() => setTourRating(1)}>
                        1 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5 <i className="ri-star-s-fill"></i>
                      </span>
                    </div>

                    <div className="review_input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="share your thoughts"
                        required
                      />
                      <button
                        type="submit"
                        className="btn primary__btn text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user-reviews">
                    {reviews?.map((review) => (
                      <div className="review_item">
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}<i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating}></Booking>
            </Col>
          </Row>
          }
        </Container>
      </section>
      <section className="additional_photos">
        <Container>
          <h4>More Images</h4>
          <Row>
            {additionalPhotos.map((photo) => (
              <Col key={photo.id} md="4">
                <img
              src={photo.src.large2x}
              alt="tour-img"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </>
  );
};

export default TourDetails;

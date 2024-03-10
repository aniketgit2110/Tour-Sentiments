import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { id, City, Place, Ratings } = tour;
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const apiKey = "EB1py9IDgxegMEKCpTVUcS9Rch4yb3CEIBtpBdZTAXtnknaOcnwhHDLD";
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${Place}&per_page=1&page=1&fit=crop`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setPhotoUrl(data.photos[0].src.large);
        } else {
          // If no image is loaded, provide a default image URL
          setPhotoUrl("https://th.bing.com/th/id/OIP.v58dYWfscvV01uQPABLQ4wHaE8?rs=1&pid=ImgDetMain");
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [City]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ri-star-fill" style={{ color: "orange" }}></i>);
    }

    if (halfStar) {
      stars.push(<i key="half" className="ri-star-half-fill" style={{ color: "orange" }}></i>);
    }

    return stars;
  };

  return (
    <div className="tour_card">
      <Card>
        <div className="tour_image">
          <img
            src={photoUrl}
            alt="tour-img"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </div>
        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="tour_location d-flex align-align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {City}
            </span>
            <span className="tour_rating d-flex align-align-items-center gap-1">
              {renderStars(Ratings)}
              {Ratings}
            </span>
          </div>

          <span style={{ fontSize: "12px" }} className="tour_title">
            <Link to={`/tours/${id}`}>{Place}</Link>
          </span>
          <div className="card_bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${99} <span>/per person</span>
            </h5>
            <button className="btn booking_btn">
              <Link to={`/tours/${id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;

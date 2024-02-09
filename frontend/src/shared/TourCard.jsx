import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../utils/avgRating";

const TourCard = ({ tour }) => {
  const { _id, title, city, price, featured, reviews } = tour;
  const [photoUrl, setPhotoUrl] = useState(null);
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const apiKey = "EB1py9IDgxegMEKCpTVUcS9Rch4yb3CEIBtpBdZTAXtnknaOcnwhHDLD";
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${title}&per_page=1&page=1&fit=crop`,
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
  }, [city]);

  return (
    <div className="tour_card">
      <Card>
        <div className="tour_image">
        <img
              src={photoUrl}
              alt="tour-img"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="tour_location d-flex align-align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {city}
            </span>
            <span className="tour_rating d-flex align-align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? "Not rated" : <span>({reviews.length})</span>}
            </span>
          </div>

          <h5 className="tour_title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <div className="card_bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span>/per person</span>
            </h5>
            <button className="btn booking_btn">
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;

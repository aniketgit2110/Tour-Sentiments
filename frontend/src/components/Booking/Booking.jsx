import React, { useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import ThankYou from "../../pages/ThankYou";

import {useNavigate} from "react-router-dom";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    userId: "01",
    userEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10
  const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee)
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/thank-you");
  };
  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i>
          {avgRating == 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* booking form */}
      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder="Select date"
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charges</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;

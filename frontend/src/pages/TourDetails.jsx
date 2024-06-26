import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

import "../styles/tour-details.css"

import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config.js";
import LoadingAnimation from "../LoadingAnimation.jsx";
import { AuthContext } from "./../context/AuthContext";

const center = { lat: 19.0760, lng: 72.8777 };
const libraries = ["places"]

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [tour, setTour] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [price , setPrice] = useState(0);

  const [currentLocation, setCurrentLocation] = useState(center);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const originLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      
      setCurrentLocation(originLatLng);
    }
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourById = await axios.get(`${BASE_URL}/sqlroute/${id}`);
        setTour(tourById.data.result);

        // Fetch photo
        const apiKey = "EB1py9IDgxegMEKCpTVUcS9Rch4yb3CEIBtpBdZTAXtnknaOcnwhHDLD";
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${tourById.data.result.Place}&per_page=1&page=1&fit=crop`,
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
          setPhotoUrl("https://example.com/default-image.jpg");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
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

  const getCoordinatesByPlace = async (placeName) => {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: placeName }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          console.error('Error getting coordinates by place name:', status);
          reject(new Error('Invalid request or no results.'));
        }
      });
    });
  };
  const [first , setFirst] = useState(true);
  const calculateRoute = async () => {
    setFirst(false)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const originLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(originLatLng);
  
          let destinationLatLng = {};
          if (tour && tour.City) {
            const combinedPath = `${tour.Place}${tour.City} `;
            destinationLatLng = await getCoordinatesByPlace(combinedPath);
            console.log(destinationLatLng);
          }
  
          if (Object.keys(destinationLatLng).length === 0) {
            destinationLatLng = await getCoordinatesByPlace(tour && tour.City);
            return;
          }
  
          const directionsService = new google.maps.DirectionsService();
          const results = await directionsService.route({
            origin: originLatLng,
            destination: destinationLatLng,
            travelMode: google.maps.TravelMode.DRIVING,
          });
  
          setDirectionsResponse(results);
          setDistance(results.routes[0].legs[0].distance.text);
          setDuration(results.routes[0].legs[0].duration.text);

          const durationText = results.routes[0].legs[0].duration.text;
        const durationArray = durationText.split(' ');
        let totalDurationMinutes = 0;
        for (let i = 0; i < durationArray.length; i += 2) {
          if (durationArray[i + 1] === 'hours' || durationArray[i + 1] === 'hour') {
            totalDurationMinutes += parseInt(durationArray[i]) * 60;
          } else if (durationArray[i + 1] === 'mins' || durationArray[i + 1] === 'min') {
            totalDurationMinutes += parseInt(durationArray[i]);
          }
        }

         // Calculate price
        const baseRate = 24.99;
        const distanceRate = 0.15; // $ per kilometer
        const durationRate = 0.01; // $ per minute
        const stopRate = 7; // $ per stop
        const specialFeaturesRate = 0; // If you have any special features rate, you can include it here

        const distanceInKm = parseFloat(results.routes[0].legs[0].distance.text.replace(/,/g, '').split(' ')[0]);
        console.log('Distance', distanceInKm)
        console.log('Duration : ', totalDurationMinutes)
        let numStops = 0;
        if (distanceInKm >= 50 && distanceInKm < 200) {
          numStops = 1;
        } else if (distanceInKm >= 200 && distanceInKm < 700) {
          numStops = 2;
        } else if (distanceInKm >= 700) {
          numStops = 3;
        }
        console.log('Stops : ', numStops)

        const priceTour = calculate_price(distanceInKm, totalDurationMinutes, numStops, baseRate, distanceRate, durationRate, stopRate, specialFeaturesRate);
        console.log("Price:", priceTour); // Display the calculated price in the console
        setPrice(priceTour);
        },
      );
    }
  };
  const calculate_price = (distance, duration, numStops, baseRate, distanceRate, durationRate, stopRate, specialFeaturesRate) => {
    // Calculate total distance-based cost
    const distanceCost = distance * distanceRate;
    
    // Calculate total duration-based cost
    const durationCost = duration * durationRate;
    
    // Calculate total stop-based cost
    const stopCost = numStops * stopRate;

    // Calculate total special features cost
    const specialFeaturesCost = specialFeaturesRate; // Add more logic if needed

    // Calculate total price
    const totalPrice = baseRate + distanceCost + durationCost + stopCost + specialFeaturesCost;

    // Round the total price to two decimal places
    const roundedPrice = Math.round(totalPrice * 100) / 100;

    return roundedPrice;
};

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    });

    if(!isLoaded){
      return <LoadingAnimation />
    }

return (
  <div className="tour">
    <div className="section1">
      <div className="details">
        <div className="tour_image">
          <img
            src={photoUrl}
            alt="tour-img"
            style={{ width: "700px", height: "400px", objectFit: "cover", borderRadius: "30px", imageRendering: "high-quality" }}
          />
        </div>
        <div className="content">
          <div className="container2">
            <div style={{ display: "flex", gap: "15px" }}>
              <i className="ri-map-pin-line" style={{ color: "orange", fontSize: "60px", marginRight: "-20px", marginLeft: "10px" }}></i>
              <div className="Place">{tour ? tour.Place : ''}</div>
            </div>
            <div className="Ratings">{renderStars(tour ? tour.Ratings : 0)}{tour ? "(" + tour.Ratings + ")" : 0}</div>
          </div>
          <div className="city" style={{ fontSize: "40px", marginLeft: "10px" , display:"flex" , justifyContent:"space-between" }}>{tour ? tour.City : ''}<div style={{marginRight:"20px"}}><span style={{fontSize:"40px" , color:"orange"}}>{`$ `+price}</span></div></div>
          <div className="map-details">
            <button onClick={calculateRoute} className="route">Find Map route</button>
            <span>Duration : <span style={{ color: "orange" }}>{duration}</span></span>
            <span>Distance : <span style={{ color: "orange" }}>{distance}</span></span>
            <span>Price : <span style={{ color: "orange" }}>{price}</span></span>
          </div>
          <div className="Place_desc">{tour ? tour.Place_desc : ''}</div>
        </div>
      </div>
      <div className="reviews">
        <div className="map" style={{ width: "107%", height: "760px", marginLeft: "0px" , left:"0" , right:"0" , marginRight:"0px" }}>
          {
            first?
            <GoogleMap center={currentLocation} zoom={15} mapContainerStyle={{ width: "100%", height: "100%" }} options={{
              zoomControl: false,
              streetViewControl: true,
              mapTypeControl: false,
            }}>
              {currentLocation && <Marker position={currentLocation} />}
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
            :
            <GoogleMap zoom={15} mapContainerStyle={{ width: "100%", height: "100%" }} options={{
              zoomControl: false,
              streetViewControl: true,
              mapTypeControl: false,
            }}>
              {currentLocation && <Marker position={currentLocation} />}
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
          }
        </div>
      </div>
    </div>

  </div>
);

};

export default TourDetails;
import React, { useEffect, useState } from "react";
import "./card.css";
import { useJsApiLoader, GoogleMap, Marker , DirectionsRenderer } from "@react-google-maps/api";
import LoadingAnimation from "../LoadingAnimation";

const center = { lat: 19.0760, lng: 72.8777 };
const libraries = ["places"]

function DaySchedule({ day, schedule , place }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);

  const [showingRoutes , setShowingRoutes] = useState(false);

  const [locations, setLocations] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routeIndex, setRouteIndex] = useState(0);


  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchLocations = async () => {
      const locationPromises = Object.values(schedule).map(async (activity) => {
        const match = activity.match(/(?:at|the|to|Visit|a|Explore|Travel|Trek|of|enchanting|Tour|tour|travel|iconic|on|in|of) (.+)$/i);
        if (match && match[1]) {
          const location = match[1];
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              location+place
            )}&key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            return {
              location,
              coordinates: data.results[0].geometry.location,
            };
          }
        }
        return null;
      });

      const resolvedLocations = await Promise.all(locationPromises);
      setLocations(resolvedLocations.filter((location) => location !== null));

      if (resolvedLocations.length > 0) {
        setMapCenter(resolvedLocations[0].coordinates);
      }
    };

    fetchLocations();
  }, [schedule]);

  useEffect(() => {
    if (locations.length > 1) {
      calculateRoute(locations[routeIndex].coordinates, locations[(routeIndex + 1) % locations.length].coordinates);
    }
  }, [locations, routeIndex]);

  const calculateRoute = async (origin, destination) => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING, 
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const handleNextRoute = () => {
    setShowingRoutes(true);
    setRouteIndex((prevIndex) => (prevIndex + 1) % locations.length);
    setDirectionsResponse(null);
  };

  const showAll = () =>{
    setShowingRoutes(false);
  }


  if (!isLoaded) {
    return <LoadingAnimation />;
  }

  const getNumericDay = (day) => {
    const numericValue = day.match(/\d+/);
    return numericValue ? numericValue[0] : null;
  };

  return (
    <div className="plan">
      <div className="day_section">
        <div className="Day">Day</div>
        <div className="dayval">{getNumericDay(day)}</div>
        <button onClick={showAll} className="routes">Show All</button>
      </div>
      <div className="block">
      <div className="data">
        {Object.entries(schedule).map(([time, activity]) => (
          <div className="single-data" key={time}>
            <div className="time">{time}</div>
            <div className="activity">{activity}</div>
          </div>
        ))}
      </div>
      <div className="other_details" style={{backgroundColor:"orange", height:"36px" , fontWeight:"bold" , color:"white", paddingLeft:"15px" , paddingRight:"15px", paddingTop:"5px", display:"flex"  , justifyContent:"space-between"}}>
        <div className="duration">Duration : <span>{duration}</span></div>
        <div className="duration">Distance : <span>{distance}</span></div>
        <button style={{border:"none" , backgroundColor:"orange" , marginBottom:"5px" , fontWeight:"bold"}} onClick={handleNextRoute}>Routes</button>
      </div>
      </div>
      <div className="reviews">
        <div className="map" style={{ width: "125%", height: "400px" }}>
          <GoogleMap center={mapCenter} zoom={12} mapContainerStyle={{ width: "100%", height: "100%" }} options={{
            zoomControl: false,
            streetViewControl: true,
            mapTypeControl: false,
          }}>
            { !showingRoutes && 
            locations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                title={location.location}
              />
            ))}


            { showingRoutes && directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </div>

      </div>
    </div>
  );
}

export default DaySchedule;
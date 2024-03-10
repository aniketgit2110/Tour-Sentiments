import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tours.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import { Container, Row, Col } from "reactstrap";
import LoadingAnimation from "../LoadingAnimation.jsx";
import { BASE_URL } from "../utils/config.js";
import axios from "axios"; 
import { Link } from "react-router-dom";

const Tours = () => {
  const [tours, setTours] = useState([]);  // Initialize tours state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sqlroute`);
        setTours(response.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array, runs once on mount

  return (
    <>
      <CommonSection title={"Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <LoadingAnimation />}
          {error && <h4>Error: {error}</h4>}
          {!loading && !error && (
            <Row>
              {tours.map((tour, index) => (
                <Col lg="3" className="mb-4" key={index}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
        <Link to="/about" style={{ display:"flex", justifyContent:"center", padding:"20px", textDecoration: 'none' }}>
  <button
    style={{
      backgroundColor: 'orange',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    }}
  >
    Generate Plan
  </button>
</Link>
      </section>
    </>
  );
};

export default Tours;

// FeaturedTourList.jsx
import React from 'react';
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';

import useFetch from '../../hooks/useFetch.js';
import { BASE_URL } from './../../utils/config.js';
import LoadingAnimation from '../../LoadingAnimation.jsx';

const FeaturedTourList = () => {
  const { data: featuredTours, loading, error } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`
  );

  return (
    <>
      {loading && <LoadingAnimation />} 
      {error && <h4>Error: {error}</h4>} 
      {!loading && !error && featuredTours &&
        featuredTours.map((tour) => (
          <Col lg="3" className="mb-4" key={tour.id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedTourList;

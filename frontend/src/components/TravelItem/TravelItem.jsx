import React, { useState, useEffect } from 'react';

const TravelItem = (props) => {
  const { id, title } = props;
  const [imageData, setImageData] = useState(null);

  const getImage = async () => {
    const unsplash_url = "https://api.unsplash.com/search/photos";
    const queryParams = `?query=${title}&client_id=${import.meta.env.UNSPLASH_API_KEY}`;

    try {
      const response = await fetch(unsplash_url + queryParams);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setImageData(data);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  useEffect(() => {
    getImage();
  }, [title]); // Trigger the image fetch whenever the title changes

  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0',
          }}
        ></div>
        {imageData && imageData.results && imageData.results.length > 0 ? (
          <img src={imageData.results[0].urls.regular} className="card-img-top" alt="..." />
        ) : (
          <p>Loading image...</p>
        )}
        <div className="card-body">
          <h5 className="card-title">{id}</h5>
          <p className="card-text">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TravelItem;

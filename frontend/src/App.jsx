import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import TravelItem from './components/TravelItem/TravelItem.jsx';
import Layout from './components/Layout/Layout.jsx';
import {Container, Row,Button} from 'reactstrap';

function App() {
  // const [data, setData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [loading, setLoading] = useState(false);

  // const fetchData = async (term) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}${term}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const result = await response.json();
  //     setData(result.slice(1, 20));
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSearch = (searchText) => {
  //   setSearchTerm(searchText);
  // };

  // useEffect(() => {
  //   const currentSearchTerm = searchTerm; // Capture the current searchTerm value
  //   fetchData(currentSearchTerm);

  //   // Cleanup function to cancel ongoing fetch requests
  //   return () => {
  //     setLoading(false); // Set loading to false if component unmounts or if a new search is initiated
  //   };
  // }, [searchTerm]);

  // useEffect(() => {
  //   console.log('Updated data:', data);
  // }, [data]);

  return (
    <> 
      <Layout />
      {/* <Home />
      {loading ? (
        <div class="d-flex justify-content-center">
        <div class="spinner-border" role="True">
          <span class="sr-only"></span>
        </div>
       </div>
      ) : (
        <div className='row'>
          {data.map((element) => (
            <div className='col-md-4' key={element.Place_desc}>
              <TravelItem title={element.City ? element.City : ""} id={element.Place ? element.Place : ""} />
            </div>
          ))}
        </div>
      )} */}
    </>
  );
}

export default App;

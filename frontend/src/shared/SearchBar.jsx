import React,{useRef} from 'react'
import './search-bar.css'
import { Col, Form,FormGroup } from "reactstrap";
import {BASE_URL} from "./../utils/config.js";
import useFetch from '../hooks/useFetch.js';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
const SearchBar = () => {
  const locationRef = useRef('')
  const intrestRef = useRef(0)
  const noofdaysRef = useRef(0)
  const navigate = useNavigate()
 
  const searchHandler = async () => {
    const location = locationRef.current.value;
    const interest = intrestRef.current.value;
    const distance = noofdaysRef.current.value;

    if (location === '') {
      return alert('Location required!');
    }

    try {
      const response = await axios.get(`${BASE_URL}/sqlroute/search`, {
        params: {
          location,
          interest,
          distance,
        },
      });

      console.log(response.data);

      navigate(`/tours/search/?city=${location}&distance=${distance}&maxGroupSize=${interest}`, {
        state: response.data.result,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Something went wrong');
    }
  };


   
  return <Col lg='12'>
   <div className="search__bar">
    <Form className='d-flex align-items-center gap-4'>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span>
              <i className='ri-map-pin-line'></i>  
              </span>
              <div>
                <h6>Location</h6>
                <input type="text" placeholder="where are you going?" ref={locationRef}/>
              </div>
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span>
              <i className='ri-map-pin-time-line'></i>  
              </span>
              <div>
                <h6>Interest ? </h6>
                <input type="text" placeholder="eg. Adventure,Culture" ref={intrestRef}/>
              </div>
           
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-last'>
            <span>
              <i className='ri-group-line'></i> 
              </span> 
              <div>
                <h6>Distance</h6>
                <input type="number" placeholder="0" ref={noofdaysRef}/>
              </div>
        </FormGroup>
        <span className='search__icon' type="submit" onClick={searchHandler}>
          <i className='ri-search-line'></i>
        </span>


    </Form>
   </div>
  </Col>
}

export default SearchBar

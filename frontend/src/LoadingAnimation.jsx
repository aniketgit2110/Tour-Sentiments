// LoadingAnimation.jsx
import React from 'react';
import './LoadingAnimation.css';
import Loader from "./assets/Loader.gif"

const LoadingAnimation = () => (
  <div className="loading-animation">
    <img src={Loader} style={{background:"transparent" , width:"200px" , height:"200px" , marginTop:"-100px"}} alt="" />
    <span style={{color:"black" , fontSize:"30px", marginLeft:"20px"}}>Generating ...</span>
  </div>
);

export default LoadingAnimation;

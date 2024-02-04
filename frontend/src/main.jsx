import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
   <App />
  </BrowserRouter>
  // </React.StrictMode>,
)

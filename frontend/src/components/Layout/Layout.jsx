import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './../Footer/Footer';
import Header from './../Header/Header';
import Routers from '../../router/Routers';

const Layout = () => {
  const navigate = useNavigate();
  const isTourDetailsPage = window.location.pathname.includes('/tours/');

  return (
    <>
      <Header />
      <Routers />
      {isTourDetailsPage ? null : <Footer />}
    </>
  );
};

export default Layout;

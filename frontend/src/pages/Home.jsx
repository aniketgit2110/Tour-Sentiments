import React from 'react'
import '../styles/home.css';
import {Container,Row,Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import Subtitle from '../shared/subtitle';
import FeaturedTourList from '../components/featured-tours/FeaturedTourList';
import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const {user} = useContext(AuthContext)
  return <>
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero__content" >
          <h2 className='mb-4 ' id='welcome'>{`Hi, ${user ? user.username : "Guest"} !!`}</h2>
            <div className="hero__subtitle d-flex align-items-center">
             <Subtitle subtitle={'know Before You Go'}/>
             <img src={worldImg} alt="" />
            </div>
            <h1>Travel opens the door to creating <span className="highlight">
               memories
              </span></h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Sequi suscipit, ut non aperiam quas eveniet vero exercitationem 
                dolores quasi reiciendis mollitia doloremque autem ab eius. 
                Perferendis debitis similique vel nesciunt!</p>
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box">
            <img src={heroImg} alt="" />
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box mt-4">
            <video src={heroVideo} alt="" controls />
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero__img-box mt-5">
            <img src={heroImg02} alt="" />
          </div>
        </Col>
        <SearchBar />
      </Row>
    </Container>
  </section>
  {/* hero section start */}
  <section>
    <Container>
      <Row>
        <Col lg='3'>
           <h5 className="services__subtitle">What we serve</h5>
           <h2 className="services_title">We offer our bst services</h2>
        </Col>
         <ServiceList />
      </Row>
    </Container>
  </section>
  
  {/* feature section starts */}
   {/* <section>
    <Container>
      <Row>
        <Col lg="12" className='mb-5'>
          <Subtitle subtitle={"Explore"} />
          <h2 className="featured_tour-title">Our featured tours</h2>
        </Col>
        <FeaturedTourList />
      </Row>
    </Container>
   </section> */}
  {/* feature section ends */}

  {//weather section
  }
  </>
}

export default Home

import React from 'react'
import './footer.css'
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import {Link} from 'react-router-dom'
import logo from "../../assets/images/logo.png"

const quick__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/tours',
    display:'Tours'
  }
];
const quick__links2=[
  {
    path:'/Login',
    display:'Login'
  },
  {
    path:'/register',
    display:'Register'
  }
]
const Footer = () => {
  return <footer className='footer'>
    <Container>
      <Row>
        <Col lg='3'>
          <div className='logo'>
            <img src={logo} alt=''/>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est qui voluptatem sit? Rem quibusdam molestiae itaque? Incidunt veniam, illum qui cumque vero ex consequatur perferendis quae inventore quos odit amet?</p>
            <div className="social_links d-flex align-content-center gap-4">
              <span>
                <Link to={'#'}><i class="ri-youtube-line"></i></Link>
              </span>
              <span>
                <Link to={'#'}><i class="ri-github-fill"></i></Link>
              </span>
              <span>
                <Link to={'#'}><i class="ri-facebook-circle-line"></i></Link>
              </span>
              <span>
                <Link to={'#'}><i class="ri-instagram-line"></i></Link>
              </span>
              </div>          
          </div>
        </Col>
        <Col lg='3'>
          <h5 className='footer_link-title'>Discover</h5>
          <ListGroup className='footer_quick-links'>
            {quick__links.map((item,index)=><ListGroupItem key={index} className='ps-0 border-0'><Link to={item.path}>{item.display}</Link></ListGroupItem>)}
          </ListGroup>
        </Col>
        <Col lg='3'>
        <h5 className='footer_link-title'>Quick Links</h5>
          <ListGroup className='footer_quick-links'>
            {quick__links2.map((item,index)=><ListGroupItem key={index} className='ps-0 border-0'><Link to={item.path}>{item.display}</Link></ListGroupItem>)}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer

// Header.jsx
import React, { useContext, useState } from 'react';
// import Container from 'react-bootstrap/Container';
import {Container, Row,Button} from 'reactstrap';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';

import {AuthContext } from './../../context/AuthContext'; 

const nav__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'Planner'
  },
  {
    path:'/tours',
    display:'Tours'
  },
  {
    path:'/weather',
    display:'Weather'
  }
]
function Header({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const {user , dispatch} = useContext(AuthContext)

  const logout = () =>{
    dispatch({type: "LOGOUT"})
    navigate("/")
  }


  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    // <Navbar expand="lg" className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">
    //             Another action
    //           </NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item>
    //         </NavDropdown>
    //       </Nav>
    //       <div className="d-flex">
    //         <input
    //           type="text"
    //           placeholder="Search"
    //           value={searchText}
    //           onChange={(e) => setSearchText(e.target.value)}
    //           className="form-control me-2"
    //         />
    //         <button
    //           type="button"
    //           onClick={handleSearch}
    //           className="btn btn-outline-success"
    //         >
    //           Search
    //         </button>
    //       </div>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* logo */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
              {/* logo end */}
              {/* menu start */}
              <div className="navigation">
                <ul className='menu d-flex align-items-center gap-5'>
                  {
                    nav__links.map(
                      (item,index)=>(
                        <li key={index} className="nav__item">
                          <NavLink to={item.path} className={navClass=> navClass.isActive ? "active__link" : ""
                        }
                        >
                          {item.display}
                          </NavLink>
                        </li>
                      )
                    )
                  }
                </ul>
              </div>
              {/* menu end */}
               
              <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">

                  {
                    user ? (
                    <>
                    <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                    </>) : (
                    <>
                    <Button className="btn secondary__btn"><Link to='/login'>
                        Login
                      </Link></Button>
                      <Button  className="btn primary__btn"><Link to='/register'>
                        Register
                      </Link></Button>
                    </>
                  )}
                </div>
                <span className='moblie__menu'>
                   <i className="ri-menu-line"></i>
                </span>
              </div>

          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;

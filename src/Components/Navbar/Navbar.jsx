import React from 'react';
import './styles.css';
import logo from './imgs/jumia logo1.png';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  



function Navbar() {
  return (
    <header className="navbar m-0 mb-5">
      <div className="container  d-flex justify-content-around">
        <div className='img-container'>
      <a href="/" className="logo"><img className='logo m-0' src={logo} alt="Logo" /></a>
      </div>
        <div className="search-bar">
        <input type="text" placeholder="&#xF002; Search products, brands, and categories" className="search-input" />
          <button className='search-button'> SEARCH</button>
        </div>

        <div className="dropdown">
        <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <i  className="fa-regular mx-1 fa-user"></i> <span className='text-hover'> Account </span></a>

    <ul className="dropdown-menu" >
    <Link to="/login" className='dropdown-item'><i className="fa-regular me-2 fa-user"></i> Sign in</Link>
    <hr />
    <li><a className="dropdown-item" href="#"><i className="fa-regular me-2 fa-user"></i> My Account</a></li>
    <li><a className="dropdown-item" href="#"><i className="fa-regular fa-heart me-2"></i> Orders</a></li>
    <li><a className="dropdown-item" href="#"><i className="fa-regular fa-heart me-2"></i> Saved Items</a></li>
  </ul>
</div>
<div className="dropdown">
  <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <i className="fa-regular fa-circle-question me-2"></i><span className='text-hover'> Help </span></a>

  <ul className="dropdown-menu">
    <li><a className="dropdown-item mt-2" href="#">Help Center</a></li>
    <li><a className="dropdown-item mt-2" href="#">Place An Order</a></li>
    <li><a className="dropdown-item mt-2" href="#">Pay For Your Order</a></li>
    <li><a className="dropdown-item mt-2" href="#">TrackPay For Your Order</a></li>
    <li><a className="dropdown-item mt-2" href="#">Cancel An Order</a></li>
    <li><a className="dropdown-item mt-2" href="#">Create A return</a></li>
    <hr />
    <button className='sign-in-button btn  p-2 text-white text-start'> <FontAwesomeIcon icon={faRocketchat} />Live Chat</button>



  </ul>
</div>
        <div className="user-links">
          <a href="#"><i className="fa fa-shopping-cart"></i> Cart (0)</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

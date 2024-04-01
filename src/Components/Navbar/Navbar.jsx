import React, { useState } from 'react';
import './styles.css';
import logo from './imgs/jumia logo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from '../../userSlice';
import { cartDataSelector } from '../CartPage/cartSlice';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { setSearchQueryAction } from '../Store/searchSlice';
import { Button } from '@mui/material';


function Navbar(props) {
  const cartCount = useSelector(cartDataSelector).totalItems;
  const userData = useSelector(userDataSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQ, setSearchQ] = useState('')
  // console.log(userData);
  const keyPressSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setSearchQueryAction(searchQ));
    }
  }
  return (

    <header className="navbar m-0 mb-5">
      <div className="container  d-flex justify-content-around">
        <div className='img-container'>
          <Link to="/" className="logo"><img className='logo m-0' src={process.env.PUBLIC_URL + '/images/logo/Joya2.png'} alt="Logo" /></Link>
        </div>
        <div className="search-bar">
          <input onKeyUp={(e) => { keyPressSearch(e) }}
            type="text" placeholder="Search products, brands, and categories"
            className="search-input" id='search'
            value={searchQ}
            onChange={(e) => { setSearchQ(e.target.value) }}
          />
          <button className='search-button' onClick={() => { dispatch(setSearchQueryAction(searchQ)); navigate('/store') }} >SEARCH</button>
        </div>

        <div className="dropdown">
          <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <i className="fa-regular mx-1 fa-user"></i> <span className='text-hover'> Account </span></a>

          <ul className="dropdown-menu" >
            {!userData.user ? <Link to="/login" className='dropdown-item'><i className="fa-regular me-2 fa-user"></i> Sign in</Link> : <></>}
            {userData.user ?
              <>
                <li><Link className="dropdown-item" to="/account"><i className="fa-regular me-2 fa-user"></i> My Account</Link></li>
                <li><Link className="dropdown-item" to="/orders/index"><i className="fa-regular fa-heart me-2"></i> Orders</Link></li>
                <li><Link className="dropdown-item" to="/account/saved"><i className="fa-regular fa-heart me-2"></i> Saved Items</Link></li>
                <li><Button className="dropdown-item" onClick={() => { props.logout() }}><span>Logout</span></Button></li>
              </> :
              <></>
            }
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
          <Link className='cart-icon' to="cart"><FontAwesomeIcon icon={faCartShopping} /> <span className='cart-count'>{cartCount}</span></Link>
          {/* <Link to="/dashboard">dashboard</Link> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

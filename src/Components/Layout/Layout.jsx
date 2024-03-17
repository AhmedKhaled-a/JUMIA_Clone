import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import {useNavigate, Outlet} from 'react-router-dom'


export default function Layout({ userData, setUserData }) {
let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('gameToken');
    setUserData(null);
    navigate('/login')
}

  return <>
  <Navbar userData={userData} logOut={logout}/>
  <div className="container">
  <Outlet></Outlet>
  </div>
  <Footer/>
</>  
}

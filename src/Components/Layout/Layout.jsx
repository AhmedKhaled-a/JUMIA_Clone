import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNavigate, Outlet } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserDataStore'


export default function Layout() {
  let { UserDataValue, setUserData } = useContext(UserDataContext);
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('gameToken');
    setUserData(null);
    navigate('/login')
  }

  return <>
    <Navbar userData={UserDataValue} logOut={logout} />
    <div className="container">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}

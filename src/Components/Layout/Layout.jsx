import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNavigate, Outlet } from 'react-router-dom'


export default function Layout() {
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('userToken');
    // setUserData(null);
    navigate('/login')
  }

  return <>
    <Navbar userData={ {} } logOut={logout} />
    <div className="" style={{width:'85%',margin:'auto'}}>
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}

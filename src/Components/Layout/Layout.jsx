import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import { authHeaders } from '../../config/axiosConfig';
import { baseURL } from '../../config/config';


export default function Layout() {
  let navigate = useNavigate()
  const logout = () => {
    let usertype = localStorage.getItem('userType');
    axios.post(`${baseURL}/api/auth/${usertype}/logout`,{} ,authHeaders)

    localStorage.removeItem('userToken');
    localStorage.removeItem('userType');
    // setUserData(null);
    navigate('/');
  }

  return <>
    <Navbar userData={ {} } logOut={logout} />
    <div className="" style={{width:'85%',margin:'auto'}}>
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}

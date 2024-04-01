import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import { authHeaders } from '../../config/axiosConfig';
import { baseURL } from '../../config/config';
import { useDispatch } from 'react-redux';
import { fetchUser, resetUserData } from '../../userSlice';


export default function Layout() {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        let usertype = localStorage.getItem('userType');
        axios.post(`${baseURL}/api/auth/${usertype}/logout`, {}, authHeaders);

        localStorage.removeItem('userToken');
        localStorage.removeItem('userType');
        // setUserData(null);
        console.log(localStorage.getItem('userType'));
        console.log(localStorage.getItem('userToken'));
        dispatch(resetUserData());
        // fetch one more time
        dispatch(fetchUser());
        navigate('/');
    }

    return <>
        <Navbar logout={logout} />
        <div className="" style={{ width: '85%', margin: 'auto' }}>
            <Outlet></Outlet>
        </div>
        <Footer />
    </>
}

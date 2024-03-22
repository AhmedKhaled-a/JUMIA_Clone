import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userDataSelector } from '../userSlice';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

export const ProtectedRoute = (props) => {
  const location = useLocation();
  const userData = useSelector(userDataSelector);
  const [auth, setAuth] = useState(undefined);
  const getAuth = () => {
    if (props.role == 'superAdmin' && userData.isSuperAdmin == true && userData.type == 'admin') {
      return true;
    } else if(props.role == 'superAdmin') {
      return false;
    }
    return userData.type === props.role;
  }
  while (!userData.user || userData.loading) {
    console.log("frek");
    return <CircularProgress sx={{ marginLeft: '50%' }} />; // or loading indicator/spinner/etc
  }
  return <>
    {
      getAuth() ? <Outlet />
        : <Navigate to="/unauth" replace state={{ from: location }} />
  }

  </>
}


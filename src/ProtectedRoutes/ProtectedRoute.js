import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userDataSelector } from '../userSlice';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

export const ProtectedRoute = (props) => {
  const location = useLocation();
  const userData = useSelector(userDataSelector);
  // const [auth, setAuth] = useState(undefined);
  const getAuth = (role) => {
    if(userData.error) {
      return false; // user, seller, admin not logged in
    }

    if (role == 'superAdmin' && userData.isSuperAdmin && userData.type == 'admin') {
      return true;
    } else if (role == 'superAdmin') {
      return false;
    }
    return userData.type == role;
  }

  while ( (!userData.user && !userData.error) || userData.loading ) {
    // console.log("frek");
    return <CircularProgress sx={{ marginLeft: '50%' }} />; // or loading indicator/spinner/etc
  }
  return <>
    {
      getAuth(props.role) ? <Outlet />
        : <Navigate to="/unauth" replace state={{ from: location }} />
    }
  </>
}


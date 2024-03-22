import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { setTypeAction, userDataSelector } from "../userSlice";
import { CircularProgress } from "@mui/material";


export const ProtectedRoute = ({ access, role }) => {
  const location = useLocation();
  // const userData = useSelector(userDataSelector);
  const [authorized, setAuthorized] = useState(false); // initially undefined!
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000);
    const authorize = async () => {
      try {
        let res = await access();
        if (role) {
          if (res.data.role == "superAdmin") {
            dispatch(setTypeAction("superAdmin"));
            console.log("super admin");
            setAuthorized(true);
          }
          else if (res.data.role == role) {
            console.log("role");
            setAuthorized(true);
          }
        }
        else {
          console.log("not authed");
          setAuthorized(true);
        }
        clearTimeout(timeout);
      } catch (err) {
        setAuthorized(false);
        clearTimeout(timeout);
      }
    };

    authorize();
  }, []);

  if (authorized === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return loading ? '' : authorized ? <Outlet />
    : <Navigate to="/unauth" replace state={{ from: location }} />;
};
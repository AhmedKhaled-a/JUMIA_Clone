import { useState, useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = ({ access }) => {
  const location = useLocation();
  const [authorized, setAuthorized] = useState(); // initially undefined!

  useEffect(() => {
    const authorize = async () => {
      try {
        await access();
        setAuthorized(true);
      } catch (err) {
        setAuthorized(false);
      }
    };

    authorize();
  }, []);

  if (authorized === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return authorized
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location }} />;
};
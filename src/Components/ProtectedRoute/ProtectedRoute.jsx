import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { UserDataContext } from '../../Contexts/UserDataStore'
import axios from 'axios';
import { baseURL } from '../../config/config';


export default function ProtectedRoute(props) {
    let { UserDataValue, loading, saveUserData, userDataPromise } = useContext(UserDataContext);
    
        if (localStorage.getItem('userToken') === null) {
            return <Navigate to="/login" />;
        } else {
            return props.children
        }
    

}

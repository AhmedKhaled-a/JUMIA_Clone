import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { baseURL } from "../config/config";

export let UserDataContext = createContext(null);

export default function UserDataContextProvider(props) {

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            saveUserData()
        }
    }, [])

    function saveUserData() {
        let token = localStorage.getItem('userToken');
        getUserWithToken(token).then((data) => setUserData(data)).catch()
    }

    async function getUserWithToken(token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
            key: "value"
        };
        let { data } = await axios.post(`${baseURL}/api/auth/user/me`, {}, config)
        return data;
    }


    const UserDataValue = useMemo(() => ({ userData }), [userData]);
    // console.log(UserDataValue);

    return <UserDataContext.Provider value={{ UserDataValue, setUserData, saveUserData }}>
        {props.children}
    </UserDataContext.Provider>
}


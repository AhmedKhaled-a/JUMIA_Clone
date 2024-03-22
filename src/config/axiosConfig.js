import axios from "axios";
import { baseURL } from "./config";

const token = localStorage.getItem('userToken');

export const authenticatedClient = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 1000,
    headers: {
        Authorization: `Bearer ${token}`,
        crossDomain: true,
        contentType: 'application/json'
    }
});

export const authHeaders = {
    Authorization: `Bearer ${token}`,
    crossDomain: true,
    contentType: 'application/json'
}

export const notAuthHeaders = {
    crossDomain: true,
    contentType: 'application/json'
}
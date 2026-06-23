import axios from 'axios';
import axiosInstance from '../../../utils/axiosInstance';

export async function register({ username, email, password }) {
    try {
        const response = await axiosInstance.post(
            '/api/v1/auth/register',
            { username, email, password },
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function login({ email, password }) {
    try {
        const response = await axiosInstance.post(
            "/api/v1/auth/login",
            { email, password },
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function logout() {
    try {
        const response = await axios.post(
            "/api/v1/auth/logout",
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getMe() {
    try {
        const response = await axios.get(
            "/api/v1/auth/get-me",
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}
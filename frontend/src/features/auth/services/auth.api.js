import axiosInstance from '../../../utils/axiosInstance';

export async function register({ username, email, password }) {
    const response = await axiosInstance.post('/api/v1/auth/register', {
        username,
        email,
        password,
    });

    return response.data;
}

export async function login({ email, password }) {
    const response = await axiosInstance.post('/api/v1/auth/login', {
        email,
        password,
    });

    return response.data;
}

export async function logout() {
    const response = await axiosInstance.post('/api/v1/auth/logout');

    return response.data;
}

export async function getMe() {
    const response = await axiosInstance.get('/api/v1/auth/get-me');

    return response.data;
}

export async function forgotPassword({ email }) {
    const response = await axiosInstance.post('/api/v1/auth/forgot-password', { email });
    return response.data;
}

export async function verifyOtp({ email, otp }) {
    const response = await axiosInstance.post('/api/v1/auth/verify-otp', { email, otp });
    return response.data;
}

export async function resetPassword({ email, resetToken, newPassword }) {
    const response = await axiosInstance.post('/api/v1/auth/reset-password', {
        email,
        resetToken,
        newPassword,
    });
    return response.data;
}
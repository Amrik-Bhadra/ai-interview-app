import axiosInstance from '../../../utils/axiosInstance';

export async function getAllReports() {
    const response = await axiosInstance.get('/api/v1/report');
    return response.data;
}

export async function getReportById(id) {
    const response = await axiosInstance.get(`/api/v1/report/${id}`);
    return response.data;
}

export async function generateReport(formData) {
    const response = await axiosInstance.post('/api/v1/report/generate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
}
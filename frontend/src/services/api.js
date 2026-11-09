import axios from "axios"

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    response => response,
    error => {
        console.error('API error: ', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default api
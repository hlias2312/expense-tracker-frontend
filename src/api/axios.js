import axios from 'axios'

const api = axios.create({
    baseURL: 'https://expense-tracker-api-production-7af4.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

export default api
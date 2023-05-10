import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = import.meta.env.VITE_BASE_URI

const Api = axios.create({ baseURL })

Api.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`
    return config;
}, (error) => {
    return Promise.reject(error)
});

Api.interceptors.response.use((response) => response,
    async (error) => {
        if (error.response.status === 401) {
            try {
                const token = Cookies.get('refreshToken')
                const response = await Api.post(`/refresh-token`, {
                    token
                })
                const newAccessToken = response.data.accessToken
                console.log({ newAccessToken })
            } catch (error) {
                console.log('Failed to refresh access token', error)
            }
        }
    })

export default Api;

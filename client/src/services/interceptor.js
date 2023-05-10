import axios from 'axios'
import Cookies from 'js-cookie'
const baseURL = import.meta.env.VITE_BASE_URI

const Api = axios.create({ baseURL })

const refreshAccessToken = async () => {
    try {
        const token = Cookies.get('refreshToken')
        console.log({ refreshToken: token })
        const response = await Api.post(`/refresh-token`, {
            token
        })
        const newAccessToken = response.data.accessToken
        Cookies.set('accessToken', newAccessToken)
        console.log({ newAccessToken })
    } catch (error) {
        console.log('Failed to refresh access token', error)
    }
}

Api.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken')
    console.log("interceptor Access Token", accessToken)
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}
);

Api.interceptors.response.use((response) =>
    response,
    (error) => {
        console.log("RESPONSE STATUS ERROR", error.response.status)
        if (error.response.status === 401) {
            refreshAccessToken()
        }
    })

export default Api;

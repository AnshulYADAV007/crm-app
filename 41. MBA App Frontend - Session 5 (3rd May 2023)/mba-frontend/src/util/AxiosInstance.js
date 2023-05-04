import axios from 'axios'
import { API_BASE_URL, TIMEOUT } from '../config/Config'

axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

export const AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: TIMEOUT
})
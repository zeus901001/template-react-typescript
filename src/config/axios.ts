import Axios from 'axios'
import store from '../store'
import { API_URI } from '../config'
import { authActions } from '../store/auth'

const instance = Axios.create({
    baseURL: API_URI,
    headers: {
        'Content-Type': 'application/json'
    }
})

/**
 * instance request config.
 */
instance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken)
        config.headers['x-access-token'] = accessToken

    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken)
        config.headers['x-refresh-token'] = refreshToken

    return config
}, err => {
    return Promise.reject(err)
})

/**
 * instance response config.
 */
instance.interceptors.response.use(res => res, async err => {
    const refreshToken = localStorage.getItem('refreshToken')

    if (err.response.status === 401) {
        try {
            const res2 = await Axios.post(`${API_URI}/auth/updateAccessToken`, { refreshToken })
            localStorage.setItem('accessToken', res2.data.accessToken)
            instance.defaults.headers.common['x-access-token'] = `${res2.data.accessToken}`

            return instance(err.config)
        }
        catch (_err: any) {
            await instance.post(`${API_URI}/auth/removeRefreshToken`, { refreshToken })

            delete instance.defaults.headers.common['x-access-token']
            delete instance.defaults.headers.common['x-refresh-token']

            store.dispatch(authActions.removeUserInfo())

            throw new Axios.Cancel(_err.response.data)
        }
    }
})

export default instance
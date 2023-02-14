import jwtDecode from 'jwt-decode'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../models/user'

let userInfo: IUser | null = null

const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')

if (accessToken && refreshToken) {
    try {
        const decodedToken: any = jwtDecode(accessToken)
        userInfo = decodedToken?.payload
    }
    catch (err) {
        console.log(err)
    }
}

const initialState = { userInfo }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)

            const decodedToken: any = jwtDecode(action.payload.accessToken)
            state.userInfo = decodedToken?.payload
        },
        removeUserInfo(state) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            state.userInfo = null
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer
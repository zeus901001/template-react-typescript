import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../models/user';

const initialState = {
    data: [] as IUser[],
    model: null as IUser | null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        findAll(state, action) {
            state.data = action.payload
        },
        findById(state, action) {
            state.model = action.payload
        },
        updateById(state, action) {
            state.model = null
            state.data = state.data.map(item => item._id === action.payload._id ? action.payload : item)
        },
        removeById(state, action) {
            state.data = state.data.filter(item => item._id !== action.payload._id)
        }
    }
})

export const usersActions = usersSlice.actions

export default usersSlice.reducer
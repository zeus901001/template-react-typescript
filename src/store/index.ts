import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import authReducer from './auth'
import usersReducer from './users'

/**
 * Create a store, combine reducers and redux thunk automatically.
 */
const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    },
    devTools: process.env.NODE_ENV === `development`,
    middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([]),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
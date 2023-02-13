import { FC } from 'react'
import { Navigate, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { useAppSelector } from '../store'

import Auth from '../views/Layouts/Auth'
import App from '../views/Layouts/App'
import Login from '../views/Auth/Login'
import Register from '../views/Auth/Register'
import Dashboard from '../views/Dashboard'
import Users from '../views/Account/Users'

/**
 * auth routes.
 */
const authRoutes: Array<object> = [
    {
        element: <Auth />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ]
    },
    { path: '*', element: <Navigate to='login' /> }
]

/**
 * main routes.
 */
const mainRoutes: Array<object> = [
    {
        element: <App />,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/account/users', element: <Users /> },
        ]
    },
    { path: '*', element: <Navigate to='/' /> }
]

const MainRouter: FC = () => {
    const userInfo = useAppSelector(state => state.auth.userInfo)
    const router = createBrowserRouter(userInfo ? mainRoutes : authRoutes)
    return <RouterProvider router={router} />
}

export default MainRouter
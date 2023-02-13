import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store'
import { IUser } from '../models/user'

const Dashboard: FC = () => {
    const userInfo: IUser | null = useAppSelector(state => state.auth.userInfo)

    return (
        <div>
            <h1>Hi {userInfo?.firstName} !</h1>
            <p>You're logged in with React 18 & JWT!!</p>
            <p>This is dashboard page.</p>
            <p><Link to="/account/users">Manage Users</Link></p>
        </div>
    )
}

export default Dashboard
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { authActions } from '../../store/auth'
import { useAppDispatch } from '../../store/index'

const App: FC = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="container p-4">
            <Outlet />
            <div>
                <button type="button" className="btn btn-secondary" onClick={e => dispatch(authActions.removeUserInfo())}>Logout</button>
            </div>
        </div>
    )
}

export default App
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Auth: FC = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Auth
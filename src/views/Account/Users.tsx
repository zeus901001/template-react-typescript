import Axios from '../../config/axios'
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { API_URI } from '../../config'
import { IUser } from '../../models/user'
import { usersActions } from '../../store/users'
import { useAppSelector, useAppDispatch } from '../../store/index';

const Users: FC = () => {
    const dispatch = useAppDispatch()
    const users: Array<IUser> = useAppSelector(state => state.users.data)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        Axios.get(`${API_URI}/account/users`).then(res => {
            dispatch(usersActions.findAll(res.data))
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const onChangePermission = (record: IUser) => (e: any) => {
        console.log(record.id, e.target.checked)
    }

    return (
        <div>
            <p>This is account/users page.</p>
            <p><Link to="/">Back To Dashboard</Link></p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>E-mail</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Permission</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.role}</td>
                                <td><input type="checkbox" defaultChecked={item.permission} onChange={onChangePermission(item)} /></td>
                            </tr>
                        )
                    })}
                    {loading && <tr>
                        <td className="text-center" colSpan={5}>
                            <span className="spinner-border spinner-border-lg align-center" />
                        </td>
                    </tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Users
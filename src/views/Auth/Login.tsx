import Axios from 'axios'
import * as Yup from 'yup'
import { FC, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { API_URI } from '../../config'
import { authActions } from '../../store/auth'
import { useAppDispatch } from '../../store/index'

const Login: FC = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const initialValues = {
        email: '',
        password: '',
    }

    const schema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const onSubmit = (credentials: object) => {
        setLoading(true)

        Axios.post(`${API_URI}/auth/login`, credentials).then(res => {
            if (res.data.success) {
                toast.success(res.data.message)
                const { accessToken, refreshToken } = res.data
                dispatch(authActions.setUserInfo({ accessToken, refreshToken }))
            }
            else {
                toast.warn(res.data.message)
            }

            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="card m-3">
            <h5 className="card-header">Login your credentials.</h5>
            <div className="card-body">
                <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
                    {({ errors, status, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    {loading && <span className="spinner-border spinner-border-sm mr-1"></span>} Login
                                </button>
                                <Link to="/register" className="btn btn-link ml-2">Register</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div >
        </div >
    )
}

export default Login
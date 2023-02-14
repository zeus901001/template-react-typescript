import Axios from 'axios'
import * as Yup from 'yup'
import { FC, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { API_URI } from '../../config'
import { useAppDispatch } from '../../store'
import { authActions } from '../../store/auth'

const Register: FC = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        acceptTerms: false
    }

    const schema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
    })

    const onSubmit = (credentials: object) => {
        if (!window.confirm(`Are you sure to register ?`))
            return

        setLoading(true)

        Axios.post(`${API_URI}/auth/register`, credentials).then(res => {
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
            <h5 className="card-header">Register your credentials.</h5>
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
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group form-check">
                                <Field type="checkbox" id="acceptTerms" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                                <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    {loading && <span className="spinner-border spinner-border-sm mr-1"></span>} Register
                                </button>
                                <Link to="/login" className="btn btn-link ml-2">Cancel</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Register
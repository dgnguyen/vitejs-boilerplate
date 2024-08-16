import { useState } from 'react'

// import { LoadingButton } from '@mui/lab'
import { Link, Button } from '@mui/material'

import { ROUTES } from 'constants/endpoint'
import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useAppDispatch } from "redux/hooks"
import { useNavigate } from 'react-router-dom'

import { isSuperAdminOrAdmin } from 'helpers/auth'
import loginSchema from '../../../schema/loginSchema'
import {
  loginUser,
  loadingLogin
} from 'redux/reducers/user'

import styles from './styles.module.scss'

const LoginForm = () => {
  const [show, setShow] = useState(false)
  const dispatch = useAppDispatch()
  const loginIsLoading = useSelector(loadingLogin)
  const navigate = useNavigate()

  const onSubmit = async (values: any, action: any) => {
    try {
      await dispatch(loginUser(values))
      navigate(
        isSuperAdminOrAdmin() ? ROUTES.DASHBOARD : ROUTES.TRANSACTION
      )
    } catch (e) {
      action.setErrors({
        email: 'Email is not correct',
        password: 'Password is not correct'
      })
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values, actions) => {
        onSubmit(values, actions)
      }}
    >
      {props => (
        <Form className="login-form" onSubmit={props.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <div className={styles.input_group}>
              <input
                id="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                type="text"
                name="email"
                className={
                  props.touched.email && props.errors.email ? 'error_input' : ''
                }
              />
              {props.touched.email && props.errors.email && (
                <span className="error_text">{props.errors.email}</span>
              )}
            </div>
          </div>
          <div className={styles.password_wrap}>
            <label htmlFor="password">Password</label>
            <div className={styles.input_group}>
              <input
                id="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                type={!show ? 'password' : 'text'}
                name="password"
                className={
                  props.touched.password && props.errors.password
                    ? 'error_input'
                    : ''
                }
              />
              <div className={styles.eye} onClick={() => setShow(!show)}>
                {!show ? (
                  <i className={'icon icon-Hide'}> </i>
                ) : (
                  <i className={'icon icon-Show'}> </i>
                )}
              </div>
            </div>
            {props.touched.password && props.errors.password && (
              <span className="error_text">{props.errors.password}</span>
            )}
          </div>
          <Button
            key="loginButton"
            type="submit"
            disabled={loginIsLoading}
            // loading={loginIsLoading}
            variant="contained"
            fullWidth
          // loadingPosition="start"
          >
            <span>Login</span>
          </Button>
          <Link
            sx={{
              textAlign: 'left',
              marginTop: 2
            }}
            component="button"
            variant="body2"
            onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
          >
            Forgot your password{' '}
          </Link>
          {/*@TODO remove comment after Remember me login will bby in backend*/}
          {/*<label className={styles.checkbox_wrap}>*/}
          {/*    Remember me*/}
          {/*    <input type="checkbox"/>*/}
          {/*    <span className={styles.checkmark}> </span>*/}
          {/*</label>*/}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm

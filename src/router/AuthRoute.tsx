import React, { FC } from 'react'

import { Navigate, RouteProps } from 'react-router-dom'

import { ROUTES } from 'constants/endpoint'
import AppLayout from 'layout/AppLayout'
import { useLogin } from 'context/LoginContext'

const AuthRoute: FC<RouteProps> = (props) => {
  const { element } = props
  const { isLogin } = useLogin()
  const route = <AppLayout>{element}</AppLayout>
  if (!isLogin) {
    return <Navigate to={ROUTES.APP_ROOT} />
  }

  return route
}

export default AuthRoute

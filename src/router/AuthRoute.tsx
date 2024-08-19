import React, { FC } from 'react'

import { Navigate, Route, RouteProps } from 'react-router-dom'

import { ROUTES } from 'constants/endpoint'
import * as auth from 'helpers/auth'
import AppLayout from 'layout/AppLayout'

const AuthRoute: FC<RouteProps> = (props) => {
  const { element } = props

  const route = <AppLayout>{element}</AppLayout>

  if (!auth.isAuthenticated()) {
    return <Navigate to={ROUTES.APP_ROOT} />
  }

  return route
}

export default AuthRoute

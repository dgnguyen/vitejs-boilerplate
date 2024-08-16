import React, { FC } from 'react'

import { Navigate, Route, RouteProps } from 'react-router-dom'

import { ROUTES } from 'constants/endpoint'
import * as auth from 'helpers/auth'

const AuthRoute: FC<RouteProps> = props => {
  const { children, ...rest } = props

  const route = <Route {...rest} element={children} />

  if (!auth.isAuthenticated()) {
    return <Navigate to={ROUTES.APP_ROOT} />
  }

  return route
}

export default AuthRoute

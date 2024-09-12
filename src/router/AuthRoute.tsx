import React, { FC } from 'react'

import { Navigate, Route, RouteProps } from 'react-router-dom'

import { ROUTES } from 'constants/endpoint'
import * as auth from 'helpers/auth'
import AppLayout from 'layout/AppLayout'

type RouteWithRoleProps = RouteProps & {
  role?: number
}

const AuthRoute: FC<RouteWithRoleProps> = (props) => {
  const { element, role } = props
  if (role && !auth.haveRightToAccess(role)) return <Navigate to={ROUTES.TRANSACTION} />
  const route = <AppLayout>{element}</AppLayout>
  if (auth)
    if (!auth.isAuthenticated()) {
      return <Navigate to={ROUTES.APP_ROOT} />
    }

  return route
}

export default AuthRoute

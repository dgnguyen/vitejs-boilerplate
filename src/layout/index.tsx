import React from 'react'

import { Route, Switch } from 'react-router-dom'

import RouteEnum, { adminPath, routes } from './constants/RoutEnum'
import AuthRoute from 'router/AuthRoute'
import AdminDashboardLayout from 'pages/Dashboard'
import Login from 'pages/Login'

const Layout: React.FC = () => {
  return (
    <Switch>
      <Route exact path={routes.LOGIN} component={Login} />
      <Route exact path={routes.FORGOT_PASSWORD} component={Login} />
      <AuthRoute path={adminPath} component={AdminDashboardLayout} />
    </Switch>
  )
}

export default Layout

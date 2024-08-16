import { RouteObject, useRoutes } from 'react-router-dom'
import { ROUTES } from '../constants/endpoint'
import Login from 'pages/Login'
import NotFound from 'pages/notFound'
import Dashboard from 'pages/Dashboard'
import AuthRoute from './AuthRoute'

const allRoutes: RouteObject[] = [
  {
    path: ROUTES.APP_ROOT,
    element: <Login />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <AuthRoute element={<Dashboard />} />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]

export default function Router() {
  const route = useRoutes(allRoutes)
  return route
}

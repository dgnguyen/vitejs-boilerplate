import { RouteObject, useRoutes } from 'react-router-dom'
import { ROUTES } from '../constants/endpoint'
import Login from 'pages/Login'
import NotFound from 'pages/notFound'
import Dashboard from 'pages/Dashboard'
import AuthRoute from './AuthRoute'
import Transaction from 'pages/Transaction'
import Player from 'pages/Player'
import PlayerTracking from 'pages/PlayerTracking'
import Agent from 'pages/Agent'
import AgentBetLimit from 'pages/Agent/AgentBetLimit'

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
    path: ROUTES.DASHBOARD_AGENT,
    element: <AuthRoute element={<Dashboard />} />,
  },
  {
    path: `${ROUTES.TRANSACTION}/:playerId/:isTester`,
    element: <AuthRoute element={<Transaction />} />,
  },
  {
    path: ROUTES.TRANSACTION,
    element: <AuthRoute element={<Transaction />} />,
  },
  {
    path: ROUTES.PLAYER,
    element: <AuthRoute element={<Player />} />,
  },
  {
    path: ROUTES.PLAYER_TRACKING,
    element: <AuthRoute element={<PlayerTracking />} />,
  },
  {
    path: ROUTES.AGENT,
    element: <AuthRoute element={<Agent />} />,
  },
  {
    path: ROUTES.AGENT_BETLIMIT,
    element: <AuthRoute element={<AgentBetLimit />} />,
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

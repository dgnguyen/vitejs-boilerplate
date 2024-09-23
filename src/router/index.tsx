import { USER_ROLE } from 'constants/auth'
import { getUser } from 'helpers/auth'
import AccountSettings from 'pages/Account/AccountSettings'
import AccountsManagement from 'pages/Account/AccountsManagement'
import Agent from 'pages/Agent'
import AgentBetLimit from 'pages/Agent/AgentBetLimit'
import Dashboard from 'pages/Dashboard'
import Login from 'pages/Login'
import MarketStats from 'pages/Market'
import MarketSettings from 'pages/Market/MarketSettings'
import TopMarket from 'pages/Market/TopMarket'
import NotFound from 'pages/notFound'
import Player from 'pages/Player'
import PlayerTracking from 'pages/PlayerTracking'
import Transaction from 'pages/Transaction'
import { RouteObject, useRoutes } from 'react-router-dom'

import { ROUTES } from '../constants/endpoint'

import AuthRoute from './AuthRoute'

const allRoutes: RouteObject[] = [
  {
    path: ROUTES.APP_ROOT,
    element: <Login />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <Login />,
  },
  {
    path: ROUTES.DASHBOARD,
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
    element: (
      <AuthRoute
        element={<Agent />}
        role={USER_ROLE.SUPER_ADMIN}
      />
    ),
  },
  {
    path: ROUTES.AGENT_BETLIMIT,
    element: (
      <AuthRoute
        element={<AgentBetLimit />}
        role={USER_ROLE.MASTER_AGENT}
      />
    ),
  },
  {
    path: ROUTES.MARKET,
    element: (
      <AuthRoute
        element={<MarketStats />}
        role={USER_ROLE.MASTER_AGENT}
      />
    ),
  },
  {
    path: ROUTES.MARKET_SETTINGS,
    element: (
      <AuthRoute
        element={<MarketSettings />}
        role={USER_ROLE.MASTER_AGENT}
      />
    ),
  },
  {
    path: ROUTES.TOP_MARKET,
    element: (
      <AuthRoute
        element={<TopMarket />}
        role={USER_ROLE.MASTER_AGENT}
      />
    ),
  },
  {
    path: ROUTES.ACCOUNT_SETTINGS,
    element: <AuthRoute element={<AccountSettings />} />,
  },
  {
    path: ROUTES.ACCOUNT_MANAGEMENT,
    element: (
      <AuthRoute
        element={<AccountsManagement />}
        role={USER_ROLE.MASTER_AGENT}
      />
    ),
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

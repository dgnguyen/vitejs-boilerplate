export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const ROUTES = {
  APP_ROOT: '/',
  DASHBOARD: '/dashboard',
  DASHBOARD_AGENT: '/dashboard/agent',
  TRANSACTION: '/transaction',
  TRANSACTION_PLAYER: '/transaction/player',
  PLAYER: '/player',
  PLAYER_TRACKING: '/player_tracking',
  AGENT: '/agent',
  AGENT_BETLIMIT: '/agent/betlimit',
  AGENT_TRACKING: '/agent_tracking',
  MARKET: '/market',
  MARKET_SETTINGS: '/market/settings',
  TOP_MARKET: '/market/top-market',
  ACCOUNT: '/account',
  FORGOT_PASSWORD: '/forgot-password',
} as const

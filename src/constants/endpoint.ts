export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const ENDPOINT = {
  TEST: `${API_BASE_URL}/test`,
} as const

export const ROUTES = {
  APP_ROOT: '/',
  DASHBOARD: '/dashboard',
  DASHBOARD_AGENT: '/dashboard/agent',
  TRANSACTION: '/transaction',
  PLAYER: '/player',
  PLAYER_TRACKING: '/player_tracking',
  AGENT: '/agent',
  AGENT_TRACKING: '/agent_tracking',
  MARKET: '/market',
  ACCOUNT: '/account',
  FORGOT_PASSWORD: '/forgot-password',
} as const

export default ENDPOINT

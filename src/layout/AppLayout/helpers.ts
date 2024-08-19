import { USER_ROLE } from 'constants/auth'
import { ROUTES } from 'constants/endpoint'
import {
  isAdmin,
  isSuperAdmin,
  isMasterAgent,
  isAgent,
  getUser,
} from 'helpers/auth'

export const getDrawerItems = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      href: ROUTES.DASHBOARD,
      enable: getUser()?.role < USER_ROLE.ADMIN,
    },
    {
      label: 'Transaction',
      icon: 'transaction',
      href: ROUTES.TRANSACTION,
      enable: true,
    },
    {
      label: 'Player',
      icon: 'player',
      href: ROUTES.PLAYER,
      enable: true,
    },
    {
      label: 'Player Tracking',
      icon: 'player',
      href: ROUTES.PLAYER_TRACKING,
      enable: getUser()?.role < USER_ROLE.ADMIN,
    },
    {
      label: 'Agent',
      icon: 'agent',
      href: ROUTES.AGENT,
      enable: getUser()?.role < USER_ROLE.ADMIN,
    },
    {
      label: 'Market',
      icon: 'market',
      href: ROUTES.MARKET,
      enable: getUser()?.role < USER_ROLE.ADMIN,
    },
    {
      label: 'Account',
      icon: 'account',
      href: ROUTES.ACCOUNT,
      enable: getUser()?.role < USER_ROLE.ADMIN,
    },
  ]
  return menuItems
}

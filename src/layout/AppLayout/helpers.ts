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

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

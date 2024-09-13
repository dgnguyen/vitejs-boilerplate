import { USER_ROLE } from 'constants/auth'
import { ROUTES } from 'constants/endpoint'
import Account from 'assets/images/menu/Account.svg'
import Dashboard from 'assets/images/menu/Dashboard.svg'
import Agent from 'assets/images/menu/Agent.svg'
import Market from 'assets/images/menu/Market.svg'
import Player from 'assets/images/menu/Player.svg'
import PlayerTracking from 'assets/images/menu/PlayerTracking.svg'
import Transaction from 'assets/images/menu/Transaction.svg'
import {
  isAdmin,
  isSuperAdmin,
  isMasterAgent,
  isAgent,
  getUser,
} from 'helpers/auth'

type MenuItemProps = {
  label: string
  icon: any
  href: string
  enable: boolean
}

export const getDrawerItems = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <Dashboard />,
      href: ROUTES.DASHBOARD,
      enable: true,
    },
    {
      label: 'Transaction',
      icon: <Transaction />,
      href: ROUTES.TRANSACTION,
      enable: true,
    },
    {
      label: 'Player',
      icon: <Player />,
      href: ROUTES.PLAYER,
      enable: true,
    },
    {
      label: 'Player Tracking',
      icon: <PlayerTracking />,
      href: ROUTES.PLAYER_TRACKING,
      enable: true,
    },
    {
      label: 'Agent',
      icon: <Agent />,
      href:
        getUser()?.role === USER_ROLE.MASTER_AGENT
          ? ROUTES.AGENT_BETLIMIT
          : ROUTES.AGENT,
      enable: ![USER_ROLE.ADMIN, USER_ROLE.AGENT].includes(getUser()?.role),
    },
    {
      label: 'Market',
      icon: <Market />,
      href: ROUTES.MARKET,
      enable: ![USER_ROLE.ADMIN, USER_ROLE.AGENT].includes(getUser()?.role),
    },
    {
      label: 'Account',
      icon: <Account />,
      href: ROUTES.ACCOUNT_SETTINGS,
      enable: getUser()?.role < USER_ROLE.ADMIN,
    },
  ] as MenuItemProps[]
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

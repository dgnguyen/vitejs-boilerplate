import { Button } from '@mui/material'

import { ROLES } from 'constants/account'
import { USER_ROLE } from 'constants/auth'
import { ROUTES } from 'constants/endpoint'
import { haveRightToAccess } from 'helpers/auth'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

const buttonsArrCore = [
  {
    name: 'Account Settings',
    location: ROUTES.ACCOUNT_SETTINGS,
  },
]

export const HeaderTab = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const buttonsArr = haveRightToAccess(USER_ROLE.MASTER_AGENT)
    ? [
        ...buttonsArrCore,
        {
          name: 'Account Management',
          location: ROUTES.ACCOUNT_MANAGEMENT,
        },
      ]
    : buttonsArrCore

  return (
    <div className={styles.topBar}>
      <div className={styles.headerTitleDiv}>
        {buttonsArr.map((item, index) => {
          const isActive = location.pathname === item.location
          return (
            <Button
              sx={{
                background: isActive ? '#5863ff' : '#ffffff',
              }}
              key={item.location}
              onClick={() => navigate(item.location)}
              variant={isActive ? 'contained' : 'outlined'}
            >
              {item.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

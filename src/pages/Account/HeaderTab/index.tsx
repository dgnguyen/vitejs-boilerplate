import { Button } from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'
import { ROUTES } from 'constants/endpoint'

const buttonsArrCore = [
  {
    name: 'Account Settings',
    location: ROUTES.ACCOUNT_SETTINGS
  }
]

export const HeaderTab = ({ isSuperAdmin }: { isSuperAdmin: boolean }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const buttonsArr = isSuperAdmin
    ? [
      ...buttonsArrCore,
      {
        name: 'Account Management',
        location: ROUTES.ACCOUNT_MANAGEMENT
      }
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
                background: isActive ? '#5863ff' : '#ffffff'
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

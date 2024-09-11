import { useEffect, useState } from 'react'

import { Card } from '@mui/material'

import { isSuperAdmin } from 'helpers/auth'

import AccountSettings from './AccountSettings'
import AccountsManagement from './AccountsManagement'
// import { PasswordForm } from './Form'
import { HeaderTab } from './HeaderTab'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

function withHOC(WrappedComponent: React.ComponentType): React.FC {
  const WithHOC: React.FC = () => (
    <div className={styles.container}>
      <HeaderTab isSuperAdmin={isSuperAdmin()} />
      <Card className={styles.content} elevation={0}>
        <WrappedComponent />
      </Card>
    </div>
  )

  return WithHOC
}

const Account: React.FC = () => {
  // const navigate = useNavigate()
  // if (history.location.pathname === ROUTES.ACCOUNT) return <AccountSettings />
  return <AccountsManagement />
}

const AccountWithHOC = withHOC(Account)

export default AccountWithHOC

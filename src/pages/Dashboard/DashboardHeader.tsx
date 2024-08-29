import { Box, Button } from '@mui/material'
import { ROUTES } from 'constants/endpoint'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import { getStyledButton } from './helpers'

const DashboardHeader = () => {
  const navigate = useNavigate()
  return (
    <Box className='dashboard-header-wrapper'>
      <Box className='buttons-wrapper'>
        {isSuperAdminOrAdmin() && (
          <Button
            variant={getStyledButton(ROUTES.DASHBOARD)}
            data-testid='button-globaldashboard'
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Global Dashboard
          </Button>
        )}
        <Button
          variant={getStyledButton(ROUTES.DASHBOARD_AGENT)}
          data-testid='button-dashboardByAgent'
          onClick={() => navigate(ROUTES.DASHBOARD_AGENT)}
        >
          Dashboard by Agent
        </Button>
      </Box>
    </Box>
  )
}

export default DashboardHeader

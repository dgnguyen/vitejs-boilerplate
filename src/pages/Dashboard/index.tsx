import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'

import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'

const Dashboard = () => {
  return (
    <Box>
      <PageTitle title="Dashboard" />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default Dashboard

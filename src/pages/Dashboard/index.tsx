import { Box } from '@mui/material'
import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'
import PageTitle from 'components/Commons/PageTitle'

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

import { Box } from '@mui/material'
import DashboardHeader from './DashboardHeader'
import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'

const Dashboard = () => {
  return (
    <Box>
      <DashboardHeader />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default Dashboard

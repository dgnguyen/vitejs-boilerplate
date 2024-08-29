import { Box } from '@mui/material'
import DashboardHeader from './DashboardHeader'
import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'

const DashboardByAgent = () => {
  return (
    <Box>
      <DashboardHeader />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default DashboardByAgent

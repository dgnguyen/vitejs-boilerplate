
import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import withGetListAgent from 'components/withGetListAgents'

import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'

const Dashboard = () => {
  return (
    <Box>
      <PageTitle title='Dashboard' haveRate />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default withGetListAgent(Dashboard)

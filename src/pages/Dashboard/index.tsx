import { useEffect } from 'react'

import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import ConversionRate from 'components/ConversionRate'
import withGetListAgent from 'components/withGetListAgents'

import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'

const Dashboard = () => {
  return (
    <Box>
      <PageTitle title='Dashboard' />
      <ConversionRate />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default withGetListAgent(Dashboard)

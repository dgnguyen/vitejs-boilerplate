import { useEffect } from 'react'

import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import ConversionRate from 'components/ConversionRate'
import { getListAgents, resetListAgents } from 'redux/reducers/listAgents'
import { useAppDispatch } from 'redux/store'

import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getListAgents())
    return () => {
      dispatch(resetListAgents())
    }
  }, [])


  return (
    <Box>
      <PageTitle title='Dashboard' />
      <ConversionRate />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default Dashboard

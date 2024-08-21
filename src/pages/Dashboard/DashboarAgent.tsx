import { Box } from '@mui/material'
import DashboardHeader from './DashboardHeader'
import DashboardActions from './DashboardActions'
import { useAppDispatch } from 'redux/store'
import { useEffect } from 'react'
import { dashboardFilterSelector, getDashboardDataAction } from 'redux/reducers/dashboard'
import { useSelector } from 'react-redux'
import DashboardContent from './DashboardContent'

const DashboardByAgent = () => {
  const dispatch = useAppDispatch()
  const filterDashboard = useSelector(dashboardFilterSelector)
  const {
    dateRange: {
      startDate,
      endDate,
    },
    isTester,
    agentSelected
  } = filterDashboard
  useEffect(() => {
    dispatch(
      getDashboardDataAction(
        new Date(startDate),
        new Date(endDate),
        JSON.parse(isTester),
        agentSelected,
      )
    )
  }, [startDate, endDate, isTester, agentSelected, dispatch])
  return (
    <Box>
      <DashboardHeader />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default DashboardByAgent

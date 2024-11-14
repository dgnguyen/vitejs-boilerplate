import { useEffect } from 'react'

import { Box, CircularProgress, } from '@mui/material'

import { useSelector } from 'react-redux'
import {
  dashboardDataSelector,
  dashboardErrorSelector,
  dashboardFilterSelector,
  dashboardLoadingPageSelector,
  getDashboardDataAction,
  resetDashboardFilter,
} from 'redux/reducers/dashboard'
import { listAgentsSelector, } from 'redux/reducers/listAgents'
import { useAppDispatch } from 'redux/store'

import DashboardContentByCurrency from './DashboardContentByCurrency'

import './style.scss'

const DashboardContent = () => {
  const dispatch = useAppDispatch()
  const listAgentsData = useSelector(listAgentsSelector)
  const { data: listAgents, error: errorLoadAgents, loading: loadingAgents } = listAgentsData
  const filterDashboard = useSelector(dashboardFilterSelector)
  const {
    dateRange: { startDate, endDate },
    isTester,
    agentSelected,
    currencySelected,
  } = filterDashboard

  useEffect(() => {
    dispatch(getDashboardDataAction())
  }, [startDate, endDate, agentSelected, isTester])

  useEffect(() => {
    return () => {
      dispatch(resetDashboardFilter())
    }
  }, [])

  const loadingPage = useSelector(dashboardLoadingPageSelector)
  const errorMsg = useSelector(dashboardErrorSelector)
  const data = useSelector(dashboardDataSelector)


  if (loadingPage || loadingAgents) return <CircularProgress />
  if (errorMsg) return <Box>{errorMsg}</Box>
  if (errorLoadAgents) return <Box>Error load agents</Box>



  return (
    <Box className='dashboard-content-wrapper'>
      <Box
        sx={{
          height: 'calc(100% - 240px)',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ marginTop: 2 }}>
          {data?.[currencySelected] && <DashboardContentByCurrency data={data?.[currencySelected]} />}
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardContent

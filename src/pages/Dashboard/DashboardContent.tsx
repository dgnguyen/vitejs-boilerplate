import { useEffect, useState } from 'react'

import { Box, CircularProgress, Divider, Tab, Tabs } from '@mui/material'

import Card from 'components/Card'
import { thousandSeparator } from 'helpers/currency'
import { useSelector } from 'react-redux'
import {
  dashboardDataSelector,
  dashboardErrorSelector,
  dashboardFilterSelector,
  dashboardLoadingPageSelector,
  getDashboardDataAction,
  resetDashboardFilter,
} from 'redux/reducers/dashboard'
import { listAgentsSelector, setListAgents } from 'redux/reducers/listAgents'
import { useAppDispatch } from 'redux/store'

import DashboardContentByCurrency from './DashboardContentByCurrency'
import { getCurrencyByAgent } from './helpers'

import './style.scss'

const DashboardContent = () => {
  const dispatch = useAppDispatch()
  const listAgentsData = useSelector(listAgentsSelector)
  const { data: listAgents, error: errorLoadAgents, loading: loadingAgents } = listAgentsData
  const filterDashboard = useSelector(dashboardFilterSelector)
  const {
    dateRange: { startDate, endDate },
    isTester,
    agentSelected
  } = filterDashboard

  const [tabValue, setTabValue] = useState<string>('')
  const currencyTabs = getCurrencyByAgent(agentSelected, listAgents)
  useEffect(() => {
    setTabValue(currencyTabs?.[0] || '')
  }, [agentSelected, listAgents])

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }


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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable currency"
          >

            {
              currencyTabs?.map((item) => (
                <Tab value={item} key={item} label={item} />
              ))
            }
          </Tabs>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          {data?.[tabValue] && <DashboardContentByCurrency data={data?.[tabValue]} />}
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardContent

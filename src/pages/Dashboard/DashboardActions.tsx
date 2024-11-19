import { Refresh } from '@mui/icons-material'
import { Box, Button, SelectChangeEvent } from '@mui/material'

import AgentSelect from 'components/AgentSelectV2'
import CurrencySelect from 'components/CurrencySelect'
import DataPicker from 'components/DataPicker'
import ExportExcel from 'components/ExportExcel'
import TesterSelect from 'components/TesterSelect'
import { isOperator, isSuperAdmin, isSuperAdminOrAdmin } from 'helpers/auth'
import { useSelector } from 'react-redux'
import {
  dashboardFilterSelector,
  dashboardLoadingSelector,
  getDashboardDataAction,
  resetDashboardFilter,
  setAgent,
  setAgentName,
  setCurrency,
  setDate,
  setIsTester,
} from 'redux/reducers/dashboard'
import { listAgentsSelector } from 'redux/reducers/listAgents'
import { useAppDispatch } from 'redux/store'

import { getCurrencyByAgent } from './helpers'

import './style.scss'

const DashboardActions = () => {
  const dispatch = useAppDispatch()
  const listAgents = useSelector(listAgentsSelector)
  const { data: agents, loading, error } = listAgents

  const dashboardFilter = useSelector(dashboardFilterSelector)
  const { dateRange, agentSelected, currencySelected, isTester } = dashboardFilter
  const loadingDashboard = useSelector(dashboardLoadingSelector)

  const currencyTabs = getCurrencyByAgent(agentSelected, agents)


  async function handleDateChange(
    startDate?: string | Date,
    endDate?: string | Date
  ) {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate)
      const endDateObj = new Date(endDate)

      dispatch(
        setDate({
          startDate: startDateObj,
          endDate: endDateObj,
        })
      )
    }
  }

  function handleReset() {
    dispatch(resetDashboardFilter())
  }

  function handleRefresh() {
    dispatch(getDashboardDataAction())
  }

  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(setAgent(event.target.value))
  }

  // const handleChangeAgentName = (value?: string) => {
  //   dispatch(setAgentName(value || ''))
  // }


  const handleChangeCurrency = (event: SelectChangeEvent) => {
    dispatch(setCurrency(event.target.value))
  }

  const handleChangeIsTester = (event: SelectChangeEvent) => {
    dispatch(setIsTester(event.target.value))
  }

  return (
    <Box className='dashboard-actions-wrapper'>
      <Box>
        <DataPicker
          changeHandler={handleDateChange}
          initialSetDate={dateRange}
          oneMonthSelection
        />
      </Box>
      {(isSuperAdmin() || isOperator()) && (
        <AgentSelect
          agents={agents}
          loading={loading}
          error={error}
          agentSelected={agentSelected}
          handleChange={handleChangeAgent}
        // cb={handleChangeAgentName}
        />
      )}
      <CurrencySelect
        loading={loading}
        error={error}
        currencySelected={currencySelected}
        currenciesList={currencyTabs}
        handleChangeCurrency={handleChangeCurrency}
      />
      <TesterSelect
        isTester={isTester}
        handleChangeIsTester={handleChangeIsTester}
      />

      <Button
        variant='contained'
        data-testid='resetFilterDashboard'
        onClick={handleReset}
      >
        Reset
      </Button>
      <Box
        marginLeft='auto'
        display='flex'
        gap={2}
      >
        <Button
          variant='contained'
          data-testid='refreshDashboard'
          onClick={handleRefresh}
        >
          <Refresh />
        </Button>
        <ExportExcel
          id='export-excel-dashboard'
          disableSearch={loadingDashboard}
          optionalData={{
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          }}
        />
      </Box>
    </Box>
  )
}

export default DashboardActions

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import DataPicker from 'components/DataPicker'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/store'
import {
  dashboardFilterSelector,
  dashboardLoadingSelector,
  DateRange,
  getDashboardDataAction,
  resetDashboardFilter,
  resetDate,
  setAgent,
  setDate,
  setIsTester,
} from 'redux/reducers/dashboard'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import AgentSelect from 'components/AgentSelect'

import './style.scss'
import { ROUTES } from 'constants/endpoint'
import TesterSelect from 'components/TesterSelect'
import ExportExcel from 'components/ExportExcel'
import { Refresh } from '@mui/icons-material'

const DashboardActions = () => {
  const dispatch = useAppDispatch()
  const dasboardFilter = useSelector(dashboardFilterSelector)
  const { dateRange, agentSelected, isTester } = dasboardFilter

  const loadingDashboard = useSelector(dashboardLoadingSelector)

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
      {isSuperAdminOrAdmin() &&
        window.location.pathname === ROUTES.DASHBOARD_AGENT && (
          <AgentSelect handleChange={handleChangeAgent} />
        )}
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

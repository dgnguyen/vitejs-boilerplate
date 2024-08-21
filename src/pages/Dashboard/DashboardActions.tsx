import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import DataPicker from 'components/DataPicker'
import { useSelector } from 'react-redux'
import { useAppDispatch } from "redux/store"
import { dashboardFilterSelector, DateRange, resetDashboardFilter, resetDate, setAgent, setDate, setIsTester } from 'redux/reducers/dashboard'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import AgentSelect from 'components/AgentSelect'

import "./style.scss"
import { ROUTES } from 'constants/endpoint'
import TesterSelect from 'components/TesterSelect'

const DashboardActions = () => {
  const dispatch = useAppDispatch()
  const dasboardFilter = useSelector(dashboardFilterSelector)
  const { dateRange, agentSelected, isTester } = dasboardFilter

  async function handleDateChange(startDate?: string | Date, endDate?: string | Date) {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate)
      const endDateObj = new Date(endDate)

      dispatch(setDate({
        startDate: startDateObj,
        endDate: endDateObj
      }))
    }
  }

  function handleReset() {
    dispatch(resetDashboardFilter())
  }

  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(setAgent(event.target.value))
  }

  const handleChangeIsTester = (event: SelectChangeEvent) => {
    dispatch(setIsTester(event.target.value))
  }



  return (
    <Box className="dashboard-actions-wrapper">
      <Box sx={{ width: 200 }}>
        <DataPicker
          changeHandler={handleDateChange}
          initialSetDate={dateRange}
          oneMonthSelection
        />
      </Box>
      {
        isSuperAdminOrAdmin() && window.location.pathname === ROUTES.DASHBOARD_AGENT &&
        <AgentSelect
          agentSelected={agentSelected}
          handleChange={handleChangeAgent}
        />
      }
      <TesterSelect
        isTester={isTester}
        handleChangeIsTester={handleChangeIsTester}
      />

      <Button variant="contained" data-testid="resetFilterDashboard" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  )
}

export default DashboardActions

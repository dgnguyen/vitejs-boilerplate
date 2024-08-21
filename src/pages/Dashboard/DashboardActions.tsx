import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import DataPicker from 'components/DataPicker'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import { useFetchAgents } from 'hooks/useFetchAgents'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardDateRangeSelector, DateRange, resetDate, setDate } from 'redux/reducers/dashboard'

const DashboardActions = () => {
  const dispatch = useDispatch()
  const dateRange = useSelector(dashboardDateRangeSelector)


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

  const { agents } = useFetchAgents()

  const agentOptions = [

  ]


  return (
    <Box sx={{ marginY: 2 }}>
      <Box sx={{ width: 200 }}>
        <DataPicker
          changeHandler={handleDateChange}
          initialSetDate={dateRange}
          oneMonthSelection
        />
      </Box>
      {/* {
        isSuperAdminOrAdmin() && (
          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
            {
              agentOptions.
            }
            </Select>
          </FormControl>
        )
      } */}
    </Box>
  )
}

export default DashboardActions

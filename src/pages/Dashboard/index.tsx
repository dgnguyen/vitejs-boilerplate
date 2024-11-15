import { useEffect } from 'react'

import { Box, Typography } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import { thousandSeparator } from 'helpers/currency'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { useSelector } from 'react-redux'
import { getListAgents, listAgentsSelector, resetListAgents } from 'redux/reducers/listAgents'
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
  const listAgentsData = useSelector(listAgentsSelector)
  const { rate, loading, error } = listAgentsData


  return (
    <Box>
      <PageTitle title='Dashboard' />
      <Box display="flex" flexDirection="column">
        {!loading && !error && (
          Object.entries(rate).map((item) => (
            <Typography key={item[0]}>{`1 ${item[0]} = ${thousandSeparator((1 / item[1]).toFixed(3))} KRW`}</Typography>
          ))
        )}
      </Box>
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default Dashboard

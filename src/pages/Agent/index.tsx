import { useEffect } from 'react'

import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import DateBlock from 'components/DateBlock'
import { isSuperAdmin } from 'helpers/auth'
import { useNavigate } from 'react-router-dom'
import { resetAgentState } from 'redux/reducers/agent'
import { useAppDispatch } from 'redux/store'

import AgentFilter from './AgentFilter'
import AgentList from './AgentList'
import AgentTab from './AgentTab'

const Agent = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    return () => {
      dispatch(resetAgentState())
    }
  }, [])

  return (
    <Box className='agent-wrapper'>
      <PageTitle title='Agent' />
      <AgentTab />
      <DateBlock />
      <AgentFilter />
      <AgentList />
    </Box>
  )
}

export default Agent

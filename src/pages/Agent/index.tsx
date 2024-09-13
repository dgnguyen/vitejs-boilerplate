import { Box } from '@mui/material'
import DateBlock from 'components/DateBlock'
import AgentTab from './AgentTab'
import AgentFilter from './AgentFilter'
import { isSuperAdmin } from 'helpers/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AgentList from './AgentList'
import PageTitle from 'components/Commons/PageTitle'
import { useAppDispatch } from 'redux/store'
import { resetAgentState } from 'redux/reducers/agent'

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

import { Box } from '@mui/material'
import DateBlock from 'components/DateBlock'
import AgentTab from './AgentTab'
import AgentFilter from './AgentFilter'
import { isSuperAdmin } from 'helpers/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AgentList from './AgentList'
import PageTitle from 'components/Commons/PageTitle'

const Agent = () => {
  // can put it around router //todo
  const navigate = useNavigate()
  useEffect(() => {
    if (!isSuperAdmin()) navigate('/')
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

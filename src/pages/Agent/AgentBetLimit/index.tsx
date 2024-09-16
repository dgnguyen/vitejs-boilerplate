import { useEffect } from 'react'

import { Refresh } from '@mui/icons-material'
import { Box, Button, Divider } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import DateBlock from 'components/DateBlock'
import ExportExcel from 'components/ExportExcel'
import { isSuperAdmin } from 'helpers/auth'
import { useSelector } from 'react-redux'
import { resetAgentState } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'

import AgentTab from '../AgentTab'

import BetLimitHistory from './BetLimitHistory'
import FormBetLimit from './FormBetLimit'

const AgentBetLimit = () => {
  const agentSelector = useSelector((state: RootState) => state.agent)
  const { isExporting } = agentSelector
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetAgentState())
    }
  }, [])

  return (
    <Box>
      <PageTitle title='Agent Bet Limit' />
      {isSuperAdmin() && <AgentTab />}
      <Box
        display='flex'
        alignItems='center'
        marginY={2}
      >
        <DateBlock />
        <Box
          marginLeft='auto'
          display='flex'
          gap={2}
        >
          <Button
            variant='contained'
            data-testid='refreshAgent'
            onClick={() => window.location.reload()}
          >
            <Refresh />
          </Button>
          <ExportExcel
            id='export-excel-agent-bet-limit'
            disableSearch={isExporting}
          />
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'white', borderWidth: 1 }} />
      <FormBetLimit />
      <Divider sx={{ borderColor: 'white', borderWidth: 1 }} />
      <BetLimitHistory />
    </Box>
  )
}

export default AgentBetLimit

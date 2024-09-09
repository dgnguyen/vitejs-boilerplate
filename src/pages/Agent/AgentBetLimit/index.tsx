import { Box, Button, Divider } from '@mui/material'
import AgentTab from '../AgentTab'
import DateBlock from 'components/DateBlock'
import ExportExcel from 'components/ExportExcel'
import { Refresh } from '@mui/icons-material'
import FormBetLimit from './FormBetLimit'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'
import { resetAgentState } from 'redux/reducers/agent'
import { useEffect } from 'react'
import BetLimitHistory from './BetLimitHistory'

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
      <AgentTab />
      <Box display="flex" alignItems="center" marginY={2}>
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
      <Divider sx={{ borderColor: "white", borderWidth: 1 }} />
      <FormBetLimit />
      <Divider sx={{ borderColor: "white", borderWidth: 1 }} />
      <BetLimitHistory />
    </Box>
  )
}

export default AgentBetLimit

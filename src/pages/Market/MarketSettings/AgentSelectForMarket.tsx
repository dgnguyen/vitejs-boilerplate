import { useEffect } from 'react'

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import { useFetchAgents } from 'hooks/useFetchAgents'
import { useSelector } from 'react-redux'
import { setAgentMarketSettings } from 'redux/reducers/market'
import { RootState, useAppDispatch } from 'redux/store'
import { IAgentData } from 'types/agent'

const AgentSelectForMarket = ({ isTopMarket }: { isTopMarket?: boolean }) => {
  const { agents, loadingAgents } = useFetchAgents()
  const dispatch = useAppDispatch()
  const marketSettingsSelector = useSelector((state: RootState) => state.market)
  const { agent } = marketSettingsSelector

  function handleChangeAgent(e: SelectChangeEvent) {
    dispatch(setAgentMarketSettings(e.target.value))
  }

  useEffect(() => {
    if (!loadingAgents) {
      dispatch(setAgentMarketSettings(agents.find((item) => !item.isBlock)?.id))
    }
  }, [loadingAgents])

  return (
    <FormControl sx={{ width: 100 }}>
      <InputLabel id='select-agents-select-label'>Select agent</InputLabel>
      <Select
        labelId='select-agents-select-label'
        id='select-agent'
        label='Select agent'
        value={agent?.toString() || ''}
        disabled={loadingAgents}
        onChange={handleChangeAgent}
      >
        {isTopMarket && <MenuItem value='all'>All</MenuItem>}
        {agents.map((agent: IAgentData) => (
          <MenuItem
            key={agent.id}
            value={agent.id}
            disabled={agent.isBlock}
          >
            {agent.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AgentSelectForMarket

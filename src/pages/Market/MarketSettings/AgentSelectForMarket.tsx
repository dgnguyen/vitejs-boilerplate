import { useEffect } from 'react'

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import CurrencySelect from 'components/CurrencySelect'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { getCurrencyByAgent } from 'pages/Dashboard/helpers'
import { useSelector } from 'react-redux'
import { listAgentsSelector } from 'redux/reducers/listAgents'
import { setSearchValuesMarket } from 'redux/reducers/market'
import { RootState, useAppDispatch } from 'redux/store'
import { IAgentData } from 'types/agent'
import { IAgent } from 'types/listAgents'

const AgentSelectForMarket = ({ isTopMarket }: { isTopMarket?: boolean }) => {
  const listAgentsData = useSelector(listAgentsSelector)
  const { data: agents, loading: loadingAgents, error } = listAgentsData

  const dispatch = useAppDispatch()
  const marketSettingsSelector = useSelector((state: RootState) => state.market)
  const { agent, currency } = marketSettingsSelector.searchValues

  const currencyTabs = getCurrencyByAgent(agent, agents)

  function handleChangeAgent(e: SelectChangeEvent) {
    dispatch(setSearchValuesMarket({ agent: e.target.value }))
  }

  function handleChangeCurrency(e: SelectChangeEvent) {
    dispatch(setSearchValuesMarket({ currency: e.target.value }))
  }

  useEffect(() => {
    if (!loadingAgents) {
      dispatch(
        setSearchValuesMarket({
          agent: agents.find((item: IAgent) => !item.isBlock)?.id,
        })
      )
    }
  }, [loadingAgents])

  return (
    <Box display="flex" gap={2}>
      <FormControl sx={{ width: 100 }}>
        <InputLabel id='select-agents-select-label'>Select Agent</InputLabel>
        <Select
          labelId='select-agents-select-label'
          id='select-agent'
          label='Select Agent'
          value={agent?.toString() || ''}
          disabled={loadingAgents}
          onChange={handleChangeAgent}
        >
          {isTopMarket && <MenuItem value='all'>All</MenuItem>}
          {agents.map((agent: IAgent) => (
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
      {
        isTopMarket && (
          <CurrencySelect
            loading={loadingAgents}
            error={error}
            currencySelected={currency || ''}
            currenciesList={currencyTabs}
            handleChangeCurrency={handleChangeCurrency}
          />
        )
      }
    </Box>
  )
}

export default AgentSelectForMarket

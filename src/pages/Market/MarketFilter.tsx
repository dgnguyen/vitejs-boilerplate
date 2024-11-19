import { Refresh } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

import AgentSelect from 'components/AgentSelectV2'
import CurrencySelect from 'components/CurrencySelect'
import DateBlock from 'components/DateBlock'
import TesterSelect from 'components/TesterSelect'
import { GamesProps } from 'context/GamesContext'
import { isOperator, isSuperAdmin } from 'helpers/auth'
import { MarketStatProps } from 'hooks/useMarketStats'
import { getCurrencyByAgent } from 'pages/Dashboard/helpers'
import { useSelector } from 'react-redux'
import { listAgentsSelector } from 'redux/reducers/listAgents'

import { isNextRoundSelectOptions } from './helpers'

type OmitMarketProps = Omit<MarketStatProps, 'data' | 'error'>
type MarketFilterProps = {
  isMarketSettingsOrTopMarket?: boolean
} & OmitMarketProps

const MarketFilter = (props: MarketFilterProps) => {
  const {
    loading,
    gamesList,
    filter,
    handleFilter,
    handleSearch,
    handleSelectGame,
    handleChangeAgent,
    handleChangeCurrency,
    isRunningBallGame,
  } = props

  const listAgents = useSelector(listAgentsSelector)
  const { data: agents, loading: loadingAgents, error } = listAgents
  const currencyTabs = getCurrencyByAgent(filter?.agent.toString(), agents)

  return (
    <Box>
      <Box
        display='flex'
        gap={2}
        alignItems='center'
      >
        <DateBlock />
        {(isSuperAdmin() || isOperator()) && (
          <AgentSelect
            agents={agents}
            loading={loadingAgents}
            error={error}
            agentSelected={filter?.agent.toString()}
            handleChange={handleChangeAgent}
          // cb={handleChangeAgentName}
          />
        )}
        <CurrencySelect
          loading={loading}
          error={error}
          currencySelected={filter.currency}
          currenciesList={currencyTabs}
          handleChangeCurrency={handleChangeCurrency}
        />
        {isRunningBallGame && (
          <FormControl
            sx={{ m: 1, minWidth: 150 }}
            size='small'
          >
            <Select
              disabled={loading}
              value={filter.isNextRound}
              onChange={(val: SelectChangeEvent) => {
                handleFilter('isNextRound', val)
              }}
              sx={{ background: 'white' }}
            >
              {isNextRoundSelectOptions.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TesterSelect
          disabled={loading}
          isTester={filter.isTester}
          handleChangeIsTester={(val: SelectChangeEvent) => {
            handleFilter('isTester', val)
          }}
        />
        <Button
          variant='contained'
          data-testid='refreshMarketStat'
          onClick={handleSearch}
          disabled={loading}
        >
          <Refresh />
        </Button>
      </Box>
      <Box
        marginY={2}
        display='flex'
        gap={2}
      >
        {gamesList.map((item: GamesProps) => (
          <Button
            disabled={loading}
            variant={`${item.id === filter?.gameType ? 'contained' : 'outlined'}`}
            key={item.id}
            value={item.id}
            onClick={() => handleSelectGame(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default MarketFilter

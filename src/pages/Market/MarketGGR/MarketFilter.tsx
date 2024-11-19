import { Refresh } from '@mui/icons-material'
import {
  Box,
  Button,
  SelectChangeEvent,
} from '@mui/material'

import AgentSelect from 'components/AgentSelectV2'
import CurrencySelect from 'components/CurrencySelect'
import DataPicker from 'components/DataPicker'
import DateBlock from 'components/DateBlock'
import TesterSelect from 'components/TesterSelect'
import { GamesProps } from 'context/GamesContext'
import { MarketGGRProps } from 'hooks/useMarketGGR'
import { getCurrencyByAgent } from 'pages/Dashboard/helpers'
import { useSelector } from 'react-redux'
import { listAgentsSelector } from 'redux/reducers/listAgents'

type OmitMarketProps = Omit<MarketGGRProps, 'data' | 'error'>


const MarketFilter = (props: OmitMarketProps) => {
  const {
    loading,
    gamesList,
    filter,
    handleFilter,
    handleSearch,
    handleSelectGame,
    handleChangeDate,
  } = props

  const listAgents = useSelector(listAgentsSelector)
  const { data: agents, loading: loadingAgents, error } = listAgents
  const currencyTabs = getCurrencyByAgent(filter.partnerId, agents)

  return (
    <Box>
      <Box
        display='flex'
        gap={2}
        alignItems='center'
      >
        <DateBlock />
        <AgentSelect
          error={error}
          agents={agents}
          loading={loadingAgents}
          agentSelected={filter.partnerId || ''}
          handleChange={(val: SelectChangeEvent) => {
            handleFilter('partnerId', val)
          }}
        />
        <CurrencySelect
          loading={loadingAgents}
          error={error}
          currencySelected={filter.currency}
          currenciesList={currencyTabs}
          handleChangeCurrency={(val: SelectChangeEvent) => {
            handleFilter('currency', val)
          }}
        />
        <DataPicker
          changeHandler={handleChangeDate}
          initialSetDate={{
            startDate: filter.searchFrom,
            endDate: filter.searchTo,
          }}
          oneMonthSelection

        />
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
            variant={`${item.id === filter?.gameTypeId ? 'contained' : 'outlined'}`}
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

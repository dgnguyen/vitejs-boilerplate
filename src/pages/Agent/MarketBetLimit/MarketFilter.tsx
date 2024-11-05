import { Refresh } from '@mui/icons-material'
import {
  Box,
  Button,
  SelectChangeEvent,
} from '@mui/material'

import AgentSelect from 'components/AgentSelect'
import DateBlock from 'components/DateBlock'
import { GamesProps } from 'context/GamesContext'
import { MarketBetLimitProps } from 'hooks/useMarketBetLimit'

type OmitMarketProps = Omit<MarketBetLimitProps, 'data' | 'error'>


const MarketFilter = (props: OmitMarketProps) => {
  const {
    loading,
    gamesList,
    filter,
    handleFilter,
    handleSearch,
    handleSelectGame,
  } = props
  return (
    <Box>
      <Box
        display='flex'
        gap={2}
        alignItems='center'
      >
        <DateBlock />
        <AgentSelect
          agentSelected={filter.partnerId || ''}
          handleChange={(val: SelectChangeEvent) => {
            handleFilter('partnerId', val)
          }}
          disableSelectAll
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
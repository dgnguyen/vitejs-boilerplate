import { Refresh } from '@mui/icons-material'
import {
  Box,
  Button,
  SelectChangeEvent,
} from '@mui/material'

import AgentSelect from 'components/AgentSelect'
import DataPicker from 'components/DataPicker'
import DateBlock from 'components/DateBlock'
import TesterSelect from 'components/TesterSelect'
import { GamesProps } from 'context/GamesContext'
import { isSuperAdmin } from 'helpers/auth'
import { MarketGGRProps } from 'hooks/useMarketGGR'

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
  return (
    <Box>
      <Box
        display='flex'
        gap={2}
        alignItems='center'
      >
        <DateBlock />
        {isSuperAdmin() && (
          <AgentSelect
            agentSelected={filter.partnerId || ''}
            handleChange={(val: SelectChangeEvent) => {
              handleFilter('partnerId', val)
            }}
          />
        )}
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

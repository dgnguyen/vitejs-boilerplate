import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import DateBlock from 'components/DateBlock'
import AgentSelect from 'components/AgentSelect'
import { isNextRoundSelectOptions } from './helpers'
import TesterSelect from 'components/TesterSelect'
import { Refresh } from '@mui/icons-material'
import { GamesProps } from 'context/GamesContext'
import { MarketStatProps } from 'hooks/useMarketStats'

type Props = Omit<MarketStatProps, 'data' | 'error'>

const MarketFilter = (props: Props) => {
  const {
    loading,
    gamesList,
    filter,
    handleFilter,
    handleSearch,
    handleSelectGame,
    handleChangeAgent,
    isRunningBallGame,
  } = props
  return (
    <Box>
      <Box display="flex" gap={2} alignItems="center">
        <DateBlock />
        <AgentSelect
          handleChange={handleChangeAgent}
        />
        {
          isRunningBallGame &&
          <FormControl sx={{ m: 1, minWidth: 150 }}
            size='small'>
            <Select
              disabled={loading}
              value={filter.isNextRound}
              onChange={(val: SelectChangeEvent) => {
                handleFilter('isNextRound', val)
              }}
              sx={{ background: "white" }}
            >
              {
                isNextRoundSelectOptions.map(item => (
                  <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        }
        <TesterSelect
          disabled={loading}
          isTester={filter.isTester}
          handleChangeIsTester={
            (val: SelectChangeEvent) => {
              handleFilter('isTester', val)
            }
          }
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
      <Box marginY={2} display="flex" gap={2}>
        {
          gamesList.map((item: GamesProps) =>
          (
            <Button
              disabled={loading}
              variant={`${item.id === filter?.gameType ? "contained" : "outlined"}`}
              key={item.id}
              value={item.id}
              onClick={() => handleSelectGame(item.id)}
            >
              {item.name}
            </Button>
          ))
        }

      </Box>
    </Box>
  )
}

export default MarketFilter

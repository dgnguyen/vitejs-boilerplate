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
import DateBlock from 'components/DateBlock'
import GameSelectButtons from 'components/GameSelectButtons'
import TesterSelect from 'components/TesterSelect'
import { useGames } from 'context/GamesContext'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  setAgentMarketSettings,
  setIsTesterTopMarket,
  setGameTypeMarketSettings,
} from 'redux/reducers/market'
import { RootState, useAppDispatch } from 'redux/store'
import { IAgentData } from 'types/agent'

const MarketSettingsFilter = ({ isTopMarket }: { isTopMarket?: boolean }) => {
  const { gamesList } = useGames()
  const { agents, loadingAgents } = useFetchAgents()
  const dispatch = useAppDispatch()
  const marketSettingsSelector = useSelector((state: RootState) => state.market)
  const { agent, gameType, isTester } = marketSettingsSelector

  useEffect(() => {
    if (!loadingAgents) {
      dispatch(setAgentMarketSettings(agents.find((item) => !item.isBlock)?.id))
    }
  }, [loadingAgents])

  useEffect(() => {
    handleChangeGameType(gamesList[0]?.id)
  }, [])

  function handleChangeAgent(e: SelectChangeEvent) {
    dispatch(setAgentMarketSettings(e.target.value))
  }

  function handleChangeGameType(value: number) {
    dispatch(setGameTypeMarketSettings(value))
  }

  function handleChangeIsTester(e: SelectChangeEvent) {
    dispatch(setIsTesterTopMarket(e.target.value))
  }

  const loading = false
  function handleRefresh() {
    window.location.reload()
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={1}
    >
      <Box
        display='flex'
        gap={2}
        alignItems='center'
      >
        <DateBlock />
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
            {isTopMarket && <MenuItem value="all">All</MenuItem>}
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
        {isTopMarket &&
          <TesterSelect
            disabled={loading}
            isTester={isTester}
            handleChangeIsTester={handleChangeIsTester}
          />
        }
        <Button
          variant='contained'
          data-testid='refreshMarketSettingsFilter'
          onClick={handleRefresh}
          disabled={loading || loadingAgents}
        >
          <Refresh />
        </Button>
      </Box>
      {!isTopMarket &&
        <GameSelectButtons
          loading={loadingAgents}
          selectedGame={gameType}
          handleSelectGame={handleChangeGameType}
        />
      }
    </Box>
  )
}

export default MarketSettingsFilter

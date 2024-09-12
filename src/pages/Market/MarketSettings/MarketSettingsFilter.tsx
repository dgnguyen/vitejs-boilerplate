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
import { isSuperAdmin } from 'helpers/auth'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  setAgentMarketSettings,
  setIsTesterTopMarket,
  setGameTypeMarketSettings,
} from 'redux/reducers/market'
import { RootState, useAppDispatch } from 'redux/store'
import AgentSelectForMarket from './AgentSelectForMarket'

const MarketSettingsFilter = ({ isTopMarket }: { isTopMarket?: boolean }) => {
  const { gamesList } = useGames()
  const dispatch = useAppDispatch()
  const marketSettingsSelector = useSelector((state: RootState) => state.market)
  const { gameType, isTester } = marketSettingsSelector

  useEffect(() => {
    handleChangeGameType(gamesList[0]?.id)
  }, [])

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
        {isSuperAdmin() && <AgentSelectForMarket isTopMarket={isTopMarket} />}
        {isTopMarket && (
          <TesterSelect
            disabled={loading}
            isTester={isTester}
            handleChangeIsTester={handleChangeIsTester}
          />
        )}
        <Button
          variant='contained'
          data-testid='refreshMarketSettingsFilter'
          onClick={handleRefresh}
          disabled={loading}
        >
          <Refresh />
        </Button>
      </Box>
      {!isTopMarket && (
        <GameSelectButtons
          // loading={loadingAgents}
          selectedGame={gameType}
          handleSelectGame={handleChangeGameType}
        />
      )}
    </Box>
  )
}

export default MarketSettingsFilter

import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from './MarketTab'
import MarketFilter from './MarketFilter'
import MarketStatsContent from './MarketStatsContent'
import { useMarketStats } from 'hooks/useMarketStats'

const MarketStats = () => {
  const {
    loading,
    gamesList,
    filter,
    data,
    handleFilter,
    handleSearch,
    handleSelectGame,
    handleChangeAgent,
    isRunningBallGame,
    error,
  } = useMarketStats()

  return (
    <Box className='market-stats-wrapper'>
      <PageTitle title='Market Stats' />
      <MarketTab />
      <MarketFilter
        loading={loading}
        gamesList={gamesList}
        filter={filter}
        handleFilter={handleFilter}
        handleChangeAgent={handleChangeAgent}
        handleSelectGame={handleSelectGame}
        handleSearch={handleSearch}
        isRunningBallGame={isRunningBallGame}
      />
      <MarketStatsContent
        loading={loading}
        data={data}
        error={error}
      />
    </Box>
  )
}

export default MarketStats

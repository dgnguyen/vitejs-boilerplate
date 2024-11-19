import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import withGetListAgent from 'components/withGetListAgents'
import { useMarketStats } from 'hooks/useMarketStats'

import MarketFilter from './MarketFilter'
import MarketStatsContent from './MarketStatsContent'
import MarketTab from './MarketTab'

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
    handleChangeCurrency,
    isRunningBallGame,
    error,
  } = useMarketStats()

  return (
    <Box className='market-stats-wrapper'>
      <PageTitle title='Market Stats' haveRate />
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
        handleChangeCurrency={handleChangeCurrency}
      />
      <MarketStatsContent
        loading={loading}
        data={data}
        error={error}
        currency={filter?.currency}
      />
    </Box>
  )
}

export default withGetListAgent(MarketStats)

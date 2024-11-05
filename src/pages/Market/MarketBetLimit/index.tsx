import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import { useMarketBetLimit } from 'hooks/useMarketBetLimit'

import MarketTab from '../MarketTab'

import Content from './Content'
import MarketFilter from './MarketFilter'

const MarketBetLimit = () => {
  const {
    loading,
    gamesList,
    filter,
    data,
    handleFilter,
    handleSearch,
    handleSelectGame,
    error,
  } = useMarketBetLimit()


  return (
    <Box className='market-stats-wrapper'>
      <PageTitle title='Bet Limit Overview' />
      <MarketTab />
      <MarketFilter
        loading={loading}
        gamesList={gamesList}
        filter={filter}
        handleFilter={handleFilter}
        handleSelectGame={handleSelectGame}
        handleSearch={handleSearch}
      />
      {data &&
        <Content
          loading={loading}
          data={data}
          error={error}
        />
      }
    </Box>
  )
}

export default MarketBetLimit
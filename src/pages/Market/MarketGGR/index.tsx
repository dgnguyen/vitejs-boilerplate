import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import { useMarketGGR } from 'hooks/useMarketGGR'

import MarketTab from '../MarketTab'

import Content from './Content'
import MarketFilter from './MarketFilter'

const MarketGGR = () => {
  const {
    loading,
    gamesList,
    filter,
    data,
    handleFilter,
    handleSearch,
    handleSelectGame,
    handleChangeDate,
    error,
  } = useMarketGGR()


  return (
    <Box className='market-stats-wrapper'>
      <PageTitle title='GGR Stats by Market' />
      <MarketTab />
      <MarketFilter
        loading={loading}
        gamesList={gamesList}
        filter={filter}
        handleFilter={handleFilter}
        handleSelectGame={handleSelectGame}
        handleSearch={handleSearch}
        handleChangeDate={handleChangeDate}
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

export default MarketGGR

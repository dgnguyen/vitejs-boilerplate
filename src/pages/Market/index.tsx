import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketNavigation from './MarketNavigation'

const MarketStats = () => {
  return (
    <Box>
      <PageTitle title='Market stats' />
      <MarketNavigation />
    </Box>
  )
}

export default MarketStats

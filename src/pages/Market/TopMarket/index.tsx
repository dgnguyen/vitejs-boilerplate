import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from '../MarketTab'

const TopMarket = () => {
  return (
    <Box>
      <PageTitle title='Top Market' />
      <MarketTab />
    </Box>
  )
}

export default TopMarket

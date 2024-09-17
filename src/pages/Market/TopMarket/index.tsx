import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'

import MarketSettingsFilter from '../MarketSettings/MarketSettingsFilter'
import MarketTab from '../MarketTab'

import TopMarketContent from './TopMarketContent'

const TopMarket = () => {
  return (
    <Box>
      <PageTitle title='Top Market' />
      <MarketTab />
      <MarketSettingsFilter isTopMarket />
      <TopMarketContent />
    </Box>
  )
}

export default TopMarket

import { Box } from '@mui/material'

import PageTitle from 'components/Commons/PageTitle'
import ConversionRate from 'components/ConversionRate'
import withGetListAgent from 'components/withGetListAgents'

import MarketSettingsFilter from '../MarketSettings/MarketSettingsFilter'
import MarketTab from '../MarketTab'

import TopMarketContent from './TopMarketContent'

const TopMarket = () => {
  return (
    <Box>
      <PageTitle title='Top Market' />
      <ConversionRate />
      <MarketTab />
      <MarketSettingsFilter isTopMarket />
      <TopMarketContent />
    </Box>
  )
}

export default withGetListAgent(TopMarket)

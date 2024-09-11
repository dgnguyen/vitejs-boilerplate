import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from '../MarketTab'
import DateBlock from 'components/DateBlock'
import MarketSettingsFilter from '../MarketSettings/MarketSettingsFilter'
import TopMarketContent from './TopMarketContent'


const TopMarket = () => {


  return (
    <Box>
      <PageTitle title='Top Market' />
      <MarketTab />
      <MarketSettingsFilter isTopMarket />
      <TopMarketContent />
    </Box >
  )
}

export default TopMarket

import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from '../MarketTab'
import MarketSettingsFilter from './MarketSettingsFilter'
import MarketSettingsContent from './MarketSettingsContent'
import MarketSettingsMessage from './MarketSettingsMessage'

const MarketSettings = () => {
  return (
    <Box className='market-settings-wrapper'>
      <PageTitle title='Market Settings' />
      <MarketTab />
      <Box
        display='flex'
        alignItems='baseline'
        justifyContent='space-between'
      >
        <MarketSettingsFilter />
        <MarketSettingsMessage />
      </Box>
      <MarketSettingsContent />
    </Box>
  )
}

export default MarketSettings

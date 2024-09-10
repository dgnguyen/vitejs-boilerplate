import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from '../MarketTab'
import MarketSettingsFilter from './MarketSettingsFilter'
import MarketSettingsContent from './MarketSettingsContent'

const MarketSettings = () => {
  return (
    <Box className="market-settings-wrapper">
      <PageTitle title='Market Settings' />
      <MarketTab />
      <MarketSettingsFilter />
      <MarketSettingsContent />
    </Box>
  )
}

export default MarketSettings

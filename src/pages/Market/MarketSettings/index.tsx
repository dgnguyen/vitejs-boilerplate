import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from '../MarketTab'
import MarketSettingsFilter from './MarketSettingsFilter'
import MarketSettingsContent from './MarketSettingsContent'
import MarketSettingsMessage from "./MarketSettingsMessage"

const MarketSettings = () => {
  return (
    <Box className="market-settings-wrapper">
      <PageTitle title='Market Settings' />
      <MarketTab />
      <MarketSettingsFilter />
      <MarketSettingsMessage />
      <MarketSettingsContent />
    </Box>
  )
}

export default MarketSettings

import { Box } from '@mui/material'
import PageTitle from 'components/Commons/PageTitle'
import MarketTab from '../MarketTab'
import DateBlock from 'components/DateBlock'

const MarketSettings = () => {
  return (
    <Box className="market-settings-wrapper">
      <PageTitle title='Market Settings' />
      <MarketTab />
      <Box>
        <DateBlock />
      </Box>
    </Box>
  )
}

export default MarketSettings

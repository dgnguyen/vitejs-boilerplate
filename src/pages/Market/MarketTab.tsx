import { Box, Button } from '@mui/material'
import { ROUTES } from 'constants/endpoint'
import { useLocation, useNavigate } from 'react-router-dom'

const MarketTab = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  return (
    <Box
      display='flex'
      gap={2}
      marginY={2}
    >
      <Button
        variant={`${pathname === ROUTES.MARKET ? 'contained' : 'outlined'}`}
        onClick={() => navigate(ROUTES.MARKET)}
      >
        Market Stats
      </Button>
      <Button
        variant={`${pathname === ROUTES.MARKET_SETTINGS ? 'contained' : 'outlined'}`}
        onClick={() => navigate(ROUTES.MARKET_SETTINGS)}
      >
        Market settings
      </Button>
      <Button
        variant={`${pathname === ROUTES.TOP_MARKET ? 'contained' : 'outlined'}`}
        onClick={() => navigate(ROUTES.TOP_MARKET)}
      >
        Top Market
      </Button>
    </Box>
  )
}

export default MarketTab

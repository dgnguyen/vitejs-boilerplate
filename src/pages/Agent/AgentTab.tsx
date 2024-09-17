import { Box, Button } from '@mui/material'

import { ROUTES } from 'constants/endpoint'
import { useLocation, useNavigate } from 'react-router-dom'

const AgentTab = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  return (
    <Box
      display='flex'
      gap={2}
      marginY={2}
      sx={{ "button": { textTransform: "capitalize" } }}
    >
      <Button
        variant={`${pathname === ROUTES.AGENT ? 'contained' : 'outlined'}`}
        onClick={() => navigate(ROUTES.AGENT)}
      >
        Agent overview
      </Button>
      <Button
        variant={`${pathname === ROUTES.AGENT_BETLIMIT ? 'contained' : 'outlined'}`}
        onClick={() => navigate(ROUTES.AGENT_BETLIMIT)}
      >
        Bet limit settings
      </Button>
    </Box>
  )
}

export default AgentTab

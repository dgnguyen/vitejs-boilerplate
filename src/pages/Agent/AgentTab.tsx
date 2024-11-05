import { Box, Button } from '@mui/material'

import { ROUTES } from 'constants/endpoint'
import { isSuperAdmin } from 'helpers/auth'
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
      sx={{ button: { textTransform: 'capitalize' } }}
    >
      {isSuperAdmin() && (
        <>
        <Button
        variant={`${pathname === ROUTES.SUB_OPERATOR ? 'contained' : 'outlined'}`}
        onClick={() => navigate(ROUTES.SUB_OPERATOR)}
        >
          Agent overview
        </Button>
        </>
      )}
      <Button
      variant={`${pathname === ROUTES.AGENT_BETLIMIT ? 'contained' : 'outlined'}`}
      onClick={() => navigate(ROUTES.AGENT_BETLIMIT)}
      >
        Bet limit settings
      </Button>
      <Button
        variant={`${pathname === ROUTES.AGENT_BETLIMIT_OVERVIEW ? 'contained' : 'outlined'}`}
        onClick={() => navigate(ROUTES.AGENT_BETLIMIT_OVERVIEW)}
      >
        Bet Limit Overview
      </Button>
    </Box>
  )
}

export default AgentTab

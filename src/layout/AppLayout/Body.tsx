import { Box } from '@mui/material'
import { DRAWER_WIDTH } from 'constants/layout'
import Topbar from './Topbar'

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      className="body-wrapper"
      component="main"
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
      }}

    >
      <Topbar />
      {children}
    </Box>
  )
}

export default Body

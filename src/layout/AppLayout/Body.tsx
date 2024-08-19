import { Box } from '@mui/material'
import { DRAWER_WIDTH } from 'constants/layout'

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      className="body-wrapper"
      sx={{
        flexGrow: 1, p: 3,
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
      }}
    >{children}</Box>
  )
}

export default Body

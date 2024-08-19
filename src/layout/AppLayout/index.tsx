import { Box } from '@mui/material'
import Body from './Body'
import Menu from './Menu'
import "./style.scss"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="app-wrapper">
      <Menu />
      <Body>{children}</Body>
    </Box>
  )
}

export default AppLayout

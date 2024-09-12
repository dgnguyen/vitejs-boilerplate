import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { DRAWER_WIDTH } from 'constants/layout'
import { getDrawerItems } from './helpers'
import { useNavigate } from 'react-router-dom'
import RunningBallLogo from 'assets/images/runningball-logo.png'

const DrawerContent = () => {
  const navigate = useNavigate()
  const rootPathname = `/${window.location.pathname.split('/')?.[1]}`
  return (
    <div>
      <Box
        sx={{
          position: 'absolute',
          top: '32px',
          zIndex: 9999,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={RunningBallLogo}
          alt='logo'
          style={{
            width: '120px',
          }}
        />
      </Box>
      <List>
        {getDrawerItems()
          .filter((item) => item.enable)
          .map((item) => (
            <ListItem
              key={item.label}
              disablePadding
            >
              <ListItemButton
                onClick={() => navigate(item.href)}
                selected={rootPathname === item.href}
              >
                <ListItemIcon
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  )
}

const Menu = () => {
  return (
    <Box className='menu-wrapper'>
      <CssBaseline />
      <Box
        component='nav'
        sx={{
          position: 'relative',
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              justifyContent: 'center',
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>
    </Box>
  )
}

export default Menu

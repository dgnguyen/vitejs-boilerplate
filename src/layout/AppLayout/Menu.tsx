import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { DRAWER_WIDTH } from "constants/layout"
import { isSuperAdmin } from 'helpers/auth'
import { getDrawerItems } from './helpers'
import { useNavigate } from 'react-router-dom'

const DrawerContent = () => {
  const navigate = useNavigate()
  return (
    <div>
      <List>
        {getDrawerItems().map((item, index) => (
          <ListItem key={item.label} disablePadding >
            <ListItemButton onClick={() => navigate(item.href)} selected={window.location.pathname === item.href}>
              {/* <ListItemIcon>

              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}


const Menu = () => {
  const menuItems = getDrawerItems()


  return (
    <Box className="menu-wrapper">
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{

            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { justifyContent: "center", boxSizing: 'border-box', width: DRAWER_WIDTH },
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

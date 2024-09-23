import * as React from 'react'

import { Logout, People } from '@mui/icons-material'
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { ROUTES } from 'constants/endpoint'
import { useUser } from 'context/UserContext'
import { useNavigate } from 'react-router-dom'
import { logout } from 'redux/reducers/user'
import { useAppDispatch } from 'redux/store'

import { stringAvatar } from './helpers'

const pages = ['Products', 'Pricing', 'Blog']

function ResponsiveAppBar() {
  const dispatch = useAppDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logout())
    navigate('/')
  }

  const settings = [
    {
      label: 'Profile',
      icon: <People />,
      onClick: () => navigate(ROUTES.ACCOUNT_SETTINGS),
    },
    {
      label: 'Logout',
      icon: <Logout />,
      onClick: () => handleLogout(),
    },
  ]

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { currentUser } = useUser() as any

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tooltip title='Open settings'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  {...stringAvatar(
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                  )}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={() => {
                    setting.onClick()
                    handleCloseUserMenu()
                  }}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-around',
                  }}
                >
                  {setting.icon}
                  <Typography textAlign='center'>{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar

import * as React from 'react'

import {
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem,
} from '@mui/material'

type MenuOptionProps = {
  icon: React.ReactNode
  name: string
  onClick: () => void
  dataTestId: string
}
type MenuProps = {
  anchorEl: Element
  closeMenu: () => void
  id: string
  optionsMenuCard: MenuOptionProps[]
}

const Menu = (props: MenuProps) => {
  const { anchorEl, closeMenu, id, optionsMenuCard } = props
  if (optionsMenuCard?.length === 0) return null
  return (
    <MuiMenu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      id={id}
      data-testid={`Edit_${id}`}
      open={Boolean(anchorEl)}
      onClose={closeMenu}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
    >
      {optionsMenuCard?.map(({ icon, name, onClick, dataTestId }, i) => (
        <MenuItem
          key={`menu-${i.toString()}`}
          onClick={e => {
            e.stopPropagation()
            closeMenu()
            onClick()
          }}
          data-testid={dataTestId}
          id={`actionItem-${name}-${id}`}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText>{name}</ListItemText>
        </MenuItem>
      ))}
    </MuiMenu>
  )
}

export default Menu

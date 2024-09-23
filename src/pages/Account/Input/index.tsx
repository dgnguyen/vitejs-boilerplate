import { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'

export type Props = {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  label: string
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  id?: string
  error?: boolean
  helperText?: string
  disabled?: boolean
  required?: boolean
}

export const PasswordInput = ({
  onChange,
  value,
  label,
  onBlur,
  id,
  error,
  helperText,
  disabled,
  required = false,
}: Props) => {
  const [show, setShow] = useState(false)
  const onShowPassword = () => {
    setShow(!show)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        fullWidth
        disabled={disabled}
        id={id}
        label={label}
        onBlur={onBlur}
        type={show ? 'text' : 'password'}
        variant='outlined'
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        autoComplete={label}
        InputProps={{
          type: show ? 'text' : 'password',
          autoComplete: 'new-password',
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={onShowPassword}
                edge='end'
              >
                {show ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required={required}
      ></TextField>
    </Box>
  )
}

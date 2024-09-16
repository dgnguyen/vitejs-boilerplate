import { useState } from 'react'
import React from 'react'

import { Box, Button, TextField, Typography } from '@mui/material'

import AgentSelect from 'components/AgentSelect'
import MuiModal from 'components/Commons/MuiModal'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import { useSelector } from 'react-redux'
import { addPlayerTracking } from 'redux/reducers/playerTracking'
import { RootState, useAppDispatch } from 'redux/store'

import './style.scss'

const AddPlayerTrackingForm = ({
  handleClose,
  open,
  setSnackbar,
}: {
  setSnackbar: React.Dispatch<
    React.SetStateAction<{
      open: boolean
      message: string
    }>
  >
  handleClose: () => void
  open: boolean
}) => {
  const [state, setState] = useState({
    playerId: '',
    partnerId: null,
  })
  const playerTrackingData = useSelector(
    (state: RootState) => state.playerTracking
  )
  const { loading, errors } = playerTrackingData

  const { playerId, partnerId } = state

  const dispatch = useAppDispatch()

  function handleChange({ key, value }: { key: string; value: string }) {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleAddPlayerTracking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      addPlayerTracking(
        {
          playerId,
          partnerId,
        },
        () => {
          handleClose()
          setSnackbar({
            open: true,
            message: 'Player has been added in tracking view',
          })
        }
      )
    )
  }

  return (
    <MuiModal
      handleClose={handleClose}
      open={open}
    >
      <Box>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          marginBottom={2}
          sx={{ textTransform: 'capitalize' }}
        >
          Add new player tracking ID
        </Typography>
        <form onSubmit={handleAddPlayerTracking}>
          <Box className='formAddPlayerTracking-wrapper'>
            {isSuperAdminOrAdmin() && (
              <AgentSelect
                disableSelectAll
                handleChange={(e) =>
                  handleChange({ key: 'partnerId', value: e.target.value })
                }
              />
            )}
            <TextField
              name='playerTrackingId'
              id='outlined-basic'
              size='small'
              required
              label='Player  ID'
              variant='outlined'
              value={playerId}
              onChange={(e) =>
                handleChange({ key: 'playerId', value: e.target.value })
              }
            />
            <Button
              id='addPlayerTrackingButton'
              disabled={loading}
              variant='contained'
              type='submit'
            >
              Add
            </Button>
          </Box>
        </form>
      </Box>
      <Box marginTop={2}>
        {errors && (
          <Typography
            fontSize={13}
            color='error'
          >
            {errors}
          </Typography>
        )}
      </Box>
    </MuiModal>
  )
}

export default AddPlayerTrackingForm

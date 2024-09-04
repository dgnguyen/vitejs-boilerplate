import { useFetchAgents } from 'hooks/useFetchAgents'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import AgentSelect from 'components/AgentSelect'
import MuiModal from 'components/Commons/MuiModal'
import { Box, Button, SnackbarProps, TextField, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'
import { addPlayerTracking } from 'redux/reducers/playerTracking'
import "./style.scss"

const addPlayerTrackingForm = ({
  handleClose,
  open,
  setSnackbar,
}: {
  setSnackbar: React.Dispatch<React.SetStateAction<{
    open: boolean
    message: string
  }>>,
  handleClose: () => void,
  open: boolean,

}) => {
  const [state, setState] = useState({
    id: '',
    agent: null,
  })
  const playerTrackingData = useSelector((state: RootState) => state.playerTracking)
  const { loading, isLoadingPage, errors, } = playerTrackingData

  const { id, agent } = state

  const dispatch = useAppDispatch()

  function handleChange({ key, value }: { key: string, value: string }) {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleAddPlayerTracking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputField = e.currentTarget.elements.namedItem(
      'playerTrackingId'
    ) as HTMLInputElement
    dispatch(
      addPlayerTracking(inputField.value, () => {
        handleClose()
        setSnackbar({
          open: true,
          message: 'Player has been added in tracking view'
        })
      })
    )
  }

  return (
    <MuiModal handleClose={handleClose} open={open}>
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          marginBottom={2}
          sx={{ textTransform: 'capitalize' }}
        >
          Add new player tracking ID
        </Typography>
        <form onSubmit={handleAddPlayerTracking}>
          <Box className="formAddPlayerTracking-wrapper">
            {isSuperAdminOrAdmin() && (
              <AgentSelect
                disableSelectAll
                handleChange={(e) => handleChange({ key: 'agent', value: e.target.value })}
              />
            )}
            <TextField
              name="playerTrackingId"
              id="outlined-basic"
              size="small"
              required
              label="MoA Player  ID"
              variant="outlined"
              value={id}
              onChange={e => handleChange({ key: 'id', value: e.target.value })}
            />
            <Button
              id="addPlayerTrackingButton"
              disabled={loading}
              variant="contained"
              type="submit"
            >
              Add
            </Button>
          </Box>
        </form>
      </Box>
      <Box marginTop={2}>
        {errors && (
          <Typography fontSize={13} color="error">
            {errors}
          </Typography>
        )}
      </Box>
    </MuiModal>
  )
}

export default addPlayerTrackingForm

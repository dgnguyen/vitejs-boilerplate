import { useState } from 'react'

import { Edit, History } from '@mui/icons-material'
import { Button, Snackbar, Typography } from '@mui/material'

import Switch from 'components/Switch'
import { useSnackbar } from 'hooks/useSnackbar'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

import BetStatusEditModal from './BetStatusEditModal'
import BetStatusHistoryModal from './BetStatusHistoryModal'

import './style.scss'

const initialState = {
  open: false,
  type: '',
}

const MarketSettingsMessage = () => {
  const betAllowed = useSelector((state: RootState) => state.market.betAllowed)
  const [isBetAllowModalShowing, setBetAllowShowing] = useState({
    open: false,
    isMsgEdit: false,
  })
  const [isBetStatusHistoryModalShow, setBetStatusHistoryModalShow] =
    useState(initialState)
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  if (!betAllowed) return null
  return (
    <div className='betStatusSection'>
      <Button
        variant='outlined'
        onClick={() => {
          setBetStatusHistoryModalShow({
            open: true,
            type: 'betStatusHistoryModal',
          })
        }}
      >
        <History />
      </Button>
      <Button
        variant='outlined'
        onClick={() => {
          setBetAllowShowing({
            open: true,
            isMsgEdit: true,
          })
          //Todo remove setTimeout
        }}
      >
        <Edit />
        <Typography>Message</Typography>
      </Button>
      <div className='toggleDiv'>
        <Typography className='onOffSpan'>On/Off</Typography>
        <Switch
          isChecked={betAllowed.status}
          onChange={() => {
            setBetAllowShowing({
              open: true,
              isMsgEdit: false,
            })
          }}
        />
      </div>

      {isBetAllowModalShowing.open && (
        <BetStatusEditModal
          isMsgEdit={isBetAllowModalShowing.isMsgEdit}
          onModalHide={() =>
            setBetAllowShowing({ open: false, isMsgEdit: false })
          }
          openSnackbar={openSnackbar}
        />
      )}

      {isBetStatusHistoryModalShow.open && (
        <BetStatusHistoryModal
          onModalClose={() => setBetStatusHistoryModalShow(initialState)}
        />
      )}
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </div>
  )
}

export default MarketSettingsMessage

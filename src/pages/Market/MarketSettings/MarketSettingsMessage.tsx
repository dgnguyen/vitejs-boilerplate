import { Button, FormControlLabel, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Switch from 'components/Switch'
import { History, Edit } from '@mui/icons-material'

import './style.scss'
import BetStatusHistoryModal from './BetStatusHistoryModal'
import BetStatusEditModal from './BetStatusEditModal'
// import BetStatusEditModal from './BetStatusEditModal'

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
        />
      )}

      {isBetStatusHistoryModalShow.open && (
        <BetStatusHistoryModal
          onModalClose={() => setBetStatusHistoryModalShow(initialState)}
        />
      )}
    </div>
  )
}

export default MarketSettingsMessage

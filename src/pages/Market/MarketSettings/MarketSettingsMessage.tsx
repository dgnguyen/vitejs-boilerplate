import { Button, Switch } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

import HistoryIcon from "assets/images/icons/history.svg"
import EditIcon from "assets/images/icons/Edit.svg"

const MarketSettingsMessage = () => {
  const betAllowed = useSelector((state: RootState) => state.market.betAllowed)
  const [isBetAllowModalShowing, setBetAllowShowing] = useState(false) //Todo this is for unmounting the component on close.
  const [isBetStatusHistoryModalShow, setBetStatusHistoryModalShow] = useState(false)

  if (!betAllowed) return null //BetAllowed object is null
  return (
    <div className="betStatusSection">
      <Button

      // onClick={() => {
      //   setBetStatusHistoryModalShow(true)
      //   setTimeout(() => {
      //     showModal('betStatusHistoryModal')
      //   }, 300)
      // }}
      >
        <HistoryIcon />
      </Button>
      <Button
      // onClick={() => {
      //   setBetAllowShowing(true)
      //   setTimeout(() => {
      //     showModal('BetStatusEditModal', { isMsgEdit: true })
      //   }, 300)
      //   //Todo remove setTimeout
      // }}
      >
        <EditIcon />
        <span>Message</span>
      </Button>
      <div className="toggleDiv">
        <span className="onOffSpan">On/Off</span>
        <Switch
          checked={betAllowed.status}
        // onChange={() => {
        //   setBetAllowShowing(true)
        //   setTimeout(() => {
        //     showModal('BetStatusEditModal')
        //   }, 300)
        //   //Todo remove setTimeout
        // }}
        />
      </div>

      {/* {isBetAllowModalShowing && (
        <BetStatusEditModal onModalHide={() => setBetAllowShowing(false)} />
      )}
      {isBetStatusHistoryModalShow && (
        <BetStatusHistoryModal
          onModalClose={() => setBetStatusHistoryModalShow(false)}
        />
      )} */}
    </div>
  )
}

export default MarketSettingsMessage

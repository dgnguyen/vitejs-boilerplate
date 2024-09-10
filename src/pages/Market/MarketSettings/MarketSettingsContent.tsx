import { Box, Card } from '@mui/material'
import TicketList from 'components/TicketList'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTickets, updateTicketEventOdd } from 'redux/reducers/market'
import { RootState, useAppDispatch } from 'redux/store'
import "./style.scss"
import { openModal } from 'redux/reducers/modal'
import { showModal } from 'components/Modal/utils'
import MarketModals from './Modals'

const MarketSettingsContent = () => {
  const dispatch = useAppDispatch()
  const marketSettingsData = useSelector((state: RootState) => state.market)
  const { loading, agent, gameType } = marketSettingsData
  const tickets = marketSettingsData.data
  const modalInfo = useSelector((state: RootState) => state.modal)

  useEffect(() => {
    if (agent && gameType) dispatch(getTickets())
  }, [agent, gameType])

  const handleModalCancel = () => {
    const info = {
      open: false,
      type: '',
      id: 0,
      eventId: 0,
      marketId: 0,
      coefficient: 0
    }
    dispatch(openModal(info))
  }

  const handleModalSuccess = async () => {
    try {
      if (gameType)
        await dispatch(
          updateTicketEventOdd(
            modalInfo.id,
            modalInfo.coefficient,
            gameType
          )
        )
      showModal('successModal', {
        message: 'Your ticket  successfully\n' + 'has been edited'
      })
      handleModalCancel()
    } catch (e) {
      handleModalCancel()
      showModal('errorModal', { message: 'Please try again later' })
    }
  }

  return (
    <Box className="market-settings-content-wrapper">
      {
        tickets?.map((ticket, index) => {
          let size = 2

          if (ticket.length > 4 && ticket.length < 7) {
            size = 3
          }
          return (
            <TicketList key={index} ticket={ticket} ticketLength={size} />
          )
        })
      }
      <MarketModals
        actionHandler={handleModalSuccess}
        actionCancel={handleModalCancel}
      />
    </Box >
  )
}

export default MarketSettingsContent

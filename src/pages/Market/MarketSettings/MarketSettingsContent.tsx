import { useEffect } from 'react'

import { Box, Button, Snackbar, Typography } from '@mui/material'

import Loader from 'components/Commons/Loader'
import MuiModal from 'components/Commons/MuiModal'
import TicketList from 'components/TicketList'
import { isSuperAdmin } from 'helpers/auth'
import { useSnackbar } from 'hooks/useSnackbar'
import { useSelector } from 'react-redux'
import { getTickets, updateTicketEventOdd } from 'redux/reducers/market'
import { closeModal } from 'redux/reducers/modal'
import { RootState, useAppDispatch } from 'redux/store'

import './style.scss'

const MarketSettingsContent = () => {
  const dispatch = useAppDispatch()
  const marketSettingsData = useSelector((state: RootState) => state.market)
  const { loading, loadingPage, searchValues: { agent, gameType } } = marketSettingsData
  const tickets = marketSettingsData.data
  const modalInfo = useSelector((state: RootState) => state.modal)
  const { snackbar, closeSnackbar, openSnackbar } = useSnackbar()

  const { open, ticket, coefficient } = modalInfo
  function handleClose() {
    dispatch(closeModal(false))
  }

  useEffect(() => {
    //if superadmin, need agent and gametype to fetch tickets, other user just need gametype
    if ((isSuperAdmin() && agent && gameType) || (!isSuperAdmin() && gameType))
      dispatch(getTickets())
  }, [agent, gameType])

  const handleModalCancel = (cancel?: boolean) => {
    dispatch(closeModal(cancel))
  }

  const handleModalSuccess = async () => {
    if (gameType) {
      try {
        const result = await dispatch(
          updateTicketEventOdd(modalInfo.id, modalInfo.coefficient, gameType)
        )
        if (result?.isSuccess) {
          openSnackbar({
            message: 'Your ticket  successfully\n' + 'has been edited',
          })
        }
      } catch (e) {
        console.error('error in marketingSettingsContent', e)
        openSnackbar({ message: 'Error. Please try again later' })
      } finally {
        handleModalCancel()
      }
    }
  }

  function resetAndCloseModal() {
    handleModalCancel(true)
  }

  if (loadingPage) return <Loader />
  return (
    <Box className='market-settings-content-wrapper'>
      {tickets?.map((ticket, index) => {
        let size = 2
        if (ticket.length > 4 && ticket.length < 7) {
          size = 3
        }
        return (
          <TicketList
            key={index}
            ticket={ticket}
            ticketLength={size}
          />
        )
      })}
      {open && (
        <MuiModal
          handleClose={handleClose}
          open={open}
        >
          <Box className='marketName'>
            <Typography>{ticket?.marketName}</Typography>
          </Box>
          <Box className='eventName'>
            {ticket.maxRate ? (
              <Typography className='ticket_point_bracket'>
                {ticket.eventName}{' '}
                {`(${ticket.minRate} - ${ticket.maxRate}) - ${ticket.odds}`}
              </Typography>
            ) : (
              <Typography>
                {' '}
                {ticket.minRate
                  ? `${ticket.eventName} - (${ticket.minRate})`
                  : `${ticket.eventName} ${ticket.odds}`}{' '}
              </Typography>
            )}
          </Box>
          <Box className='modalText'>
            Are you sure you want to replace {ticket.odds} coefficient to{' '}
            {coefficient}
          </Box>
          <Box
            display='flex'
            marginY={2}
            gap={2}
            justifyContent='end'
            sx={{
              button: {
                textTransform: 'uppercase',
              },
            }}
          >
            <Button
              data-testid='cancel-modify-ticket'
              onClick={resetAndCloseModal}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant='contained'
              data-testid='confirm-modify-ticket'
              onClick={handleModalSuccess}
            >
              Confirm
            </Button>
          </Box>
        </MuiModal>
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
    </Box>
  )
}

export default MarketSettingsContent

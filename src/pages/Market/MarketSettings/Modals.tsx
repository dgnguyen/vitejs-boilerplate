import React from 'react'

import { Button } from "@mui/material"
import Modal, { hide } from 'components/Modal'
import CheckIcon from 'assets/images/Check.svg'
import ErrorIcon from 'assets/images/Error.svg'

import styles from './MarketModals.module.scss'

type MarketModalsProps = {
  actionHandler?: (type: string) => void
  actionCancel?: () => void
}

const MarketModals: React.FC<MarketModalsProps> = ({
  actionHandler,
  actionCancel
}) => {
  const rename = () => {
    hide('warningModal')
    actionHandler && actionHandler('confirm')
  }
  const cancel = () => {
    actionCancel && actionCancel()
    hide('warningModal')
  }

  //Todo it would be better to have the error, success and warn message modals outside
  // of Market modals to be able use them as reusable components.

  return (
    <>
      <Modal
        id="successModal"
        className={styles.succsessModal}
        shouldCloseOnOverlayClick
      >
        {({ message }: { message: string }) => (
          <>
            <CheckIcon />
            <span className={styles.modalText}>{message}</span>
          </>
        )}
      </Modal>
      <Modal id="warningModal" className={styles.worningModal}>
        {(message: any) => (
          <>
            <h2 className={styles.modalTitle}>{message.ticket.marketName}</h2>
            <div className={styles.ticketName}>
              {' '}
              {message.ticket.maxRate ? (
                <span className={styles.ticket_point_bracket}>
                  {message.ticket.eventName}{' '}
                  {`(${message.ticket.minRate} - ${message.ticket.maxRate}) - ${message.ticket.odds}`}
                </span>
              ) : (
                <span>
                  {' '}
                  {message.ticket.minRate
                    ? `${message.ticket.eventName} - (${message.ticket.minRate})`
                    : `${message.ticket.eventName} ${message.ticket.odds}`}{' '}
                </span>
              )}
            </div>

            <div className={styles.modalText}>
              Are you sure you want to replace {message.ticket.odds} coefficient
              to {message.coefficient}
            </div>
            <div className={styles.buttonContainer}>
              <Button variant="outlined" onClick={cancel}>
                Cancel
              </Button>
              <Button onClick={rename}>
                Confirm
              </Button>
            </div>
          </>
        )}
      </Modal>
      <Modal
        id="errorModal"
        className={styles.errorModal}
        shouldCloseOnOverlayClick
      >
        {({ message }: { message: string }) => (
          <>
            <ErrorIcon />
            <span className={styles.modalText}>
              {message || 'Something went wrong!'}
            </span>
          </>
        )}
      </Modal>
    </>
  )
}

export default MarketModals

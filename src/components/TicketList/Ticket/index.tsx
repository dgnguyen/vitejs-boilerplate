import React, { useEffect, useRef, useState } from 'react'

import cx from 'classnames'
import OutsideClickHandler from 'react-outside-click-handler'
import { useDispatch, useSelector } from 'react-redux'

import { marketNames } from 'constants/market'
import DotesIcon from 'assets/images/icons/dotes.svg'
import EditIcon from 'assets/images/icons/Edit.svg'
import { IMarketData } from 'redux/reducers/market'
// import { openModal, selectModalIsOpen } from '../../../store/modal/modalSlice'

import './style.scss'
import { RootState } from 'redux/store'
import { openModal } from 'redux/reducers/modal'

type IProps = {
  ticket: IMarketData
}

const Ticket: React.FC<IProps> = ({ ticket }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<number | null | string>()
  const [error, setError] = useState({ id: 0, error: '' })
  const [show, setShow] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const modalIsOpen = useSelector((state: RootState) => state.modal.open)
  const dispatch = useDispatch()

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const re = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/

    if (value === '') {
      setError({ id: ticket.id, error: 'error_input' })
      setValue(null)
    } else {
      setError({ id: ticket.id, error: '' })
      if (
        parseFloat(value) > 0.99 &&
        parseFloat(value) <= 28 &&
        re.test(value)
      ) {
        setValue(value)
      }
    }
  }

  const handleDotsClick = () => {
    setShow(!show)
  }
  const handleEditClick = () => {
    setValue(value || ticket.odds)
    setShowInput(!showInput)
    setShow(!show)
  }
  const outSideClick = () => {
    setShow(!show)
  }
  const outSideInputClick = () => {
    let val = value
    if (typeof val === 'string' && val !== '' && val[val.length - 1] === '.') {
      val = val.slice(0, -1)
      setValue(val)
    }
    if (val) {
      setShowInput(!showInput)
      const info = {
        open: !modalIsOpen,
        type: 'warningModal',
        id: ticket.id,
        eventId: ticket.eventId,
        marketId: ticket.marketId,
        ticket,
        coefficient: val
      }
      dispatch(openModal(info))
    }
  }

  return (
    <>
      <div
        className={`ticket_row ${ticket.eventName ? "not_empty" : ''}`}
      >
        <div className="ticket_name">
          {marketNames[ticket.eventName as keyof typeof marketNames] ||
            ticket.eventName}
          <div>
            {ticket.maxRate ? (
              <span className="ticket_point_bracket">
                {`(${ticket.minRate} - ${ticket.maxRate})`}
              </span>
            ) : (
              <span className="ticket_point_bracket">
                {ticket.minRate ? `(${ticket.minRate})` : ''}
              </span>
            )}
          </div>
        </div>
        <span className="ticket_odd">
          {show ? (
            <OutsideClickHandler onOutsideClick={outSideClick}>
              <div
                className="ticket_edit_modal"
                onClick={handleEditClick}
              >
                <div>
                  <EditIcon /> <span>Edit</span>
                </div>
              </div>
            </OutsideClickHandler>
          ) : (
            ''
          )}

          {!showInput ? (
            <span>{value ? value : ticket.odds} </span>
          ) : (
            <OutsideClickHandler onOutsideClick={outSideInputClick}>
              <input
                ref={inputRef}
                className={cx("ticket_input", {
                  error_input: error.id === ticket.id && error.error
                })}
                type={'text'}
                onChange={handleChange}
                value={value || ''}
              />
            </OutsideClickHandler>
          )}
          <span className="ticket_dotes" onClick={handleDotsClick}>
            <DotesIcon />
          </span>
        </span>
      </div>
    </>
  )
}

export default Ticket

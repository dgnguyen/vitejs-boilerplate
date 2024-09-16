import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@mui/material'
import Button from '@mui/material/Button'

import BottomArrowIcon from 'assets/images/BottomArrow.svg'
import UpArrowIcon from 'assets/images/UpArrow.svg'
import cx from 'classnames'
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  differenceInDays,
  format,
  isAfter,
  isSameDay,
  lastDayOfMonth,
  subDays,
} from 'date-fns'
import { useClickOutside } from 'hooks/useClickOutside'
import moment from 'moment'
import {
  Calendar,
  DateRangePicker,
  Range,
  RangeKeyDict,
} from 'react-date-range'

import { initialState } from './config'
import DateRange from './CustomDateRange'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import styles from './DataPicker.module.scss'

type DataPickerProps = {
  changeHandler?: (startDate: string | Date, endDate: string | Date) => void
  oneMonthSelection?: boolean
  calendar?: boolean
  withoutDate?: string
  reset?: boolean
  initialSetDate: {
    startDate: Date
    endDate: Date
  }
  disabled?: boolean
  style?: {}
}

const DataPicker: React.FC<DataPickerProps> = ({
  changeHandler,
  oneMonthSelection,
  calendar,
  withoutDate,
  reset,
  initialSetDate,
  disabled = false,
  style = {},
}) => {
  const [state, setState] = useState<any>([
    {
      ...(initialSetDate ? initialSetDate : initialState),
      key: 'selection',
      color: '#5863FF',
    },
  ])

  const initialRenderRef = useRef(false)

  useEffect(() => {
    if (!initialRenderRef.current) {
      initialRenderRef.current = true
    } else {
      const initialDateObj = {
        ...(initialSetDate ? initialSetDate : initialState),
      }
      setDate(null)
      setState([
        {
          ...initialDateObj,
          key: 'selection',
          color: '#5863FF',
        },
      ])

      setSelectedState(initialDateObj)

      setToggleState({
        isOpen: false,
        y: 0,
      })
    }
  }, [initialSetDate, reset])

  const [date, setDate] = useState<any>(null)
  const [selectedRange, setSelectedState] = useState({
    ...(initialSetDate ? initialSetDate : initialState),
  })
  const [toggleState, setToggleState] = useState({
    isOpen: false,
    y: 0,
  })
  const today = new Date()
  const endDateMaxToAllow = state[0].startDate
    ? subDays(addMonths(state[0].startDate, 1), 1)
    : today //The backend side is adding the validation with 30 days.

  const { ref: datePickerRef } = useClickOutside(() => {
    setToggleState({
      isOpen: false,
      y: 0,
    })
  })

  const toggle = (e: React.MouseEvent<HTMLElement>) => {
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect()
    setToggleState({
      isOpen: !toggleState.isOpen,
      y: rect.bottom + 5,
    })
  }

  const pickerValue = useMemo(() => {
    if (calendar) {
      return withoutDate
        ? withoutDate
        : `${format(date ? date : new Date(), 'dd.MM.yyyy')}`
    }
    return `${format(selectedRange.startDate, 'dd.MM.yyyy')} → ${format(selectedRange.endDate, 'dd.MM.yyyy')}`
  }, [selectedRange?.startDate, selectedRange?.endDate, date, withoutDate])

  const onSaveSelectedRange = () => {
    if (calendar) {
      const startDate = moment(date).startOf('day').format()
      const endDate = moment(date).endOf('day').format()
      if (date) setSelectedState(date)
      setToggleState({
        isOpen: false,
        y: 0,
      })

      changeHandler && changeHandler(startDate, endDate)
    } else {
      setSelectedState({ ...state[0] })
      setToggleState({
        isOpen: false,
        y: 0,
      })
      const { startDate, endDate } = state[0]
      const maxEndDateAllow = isAfter(endDate, today) ? today : endDate
      changeHandler &&
        startDate &&
        endDate &&
        changeHandler(startDate, maxEndDateAllow)
    }
  }

  type DateSelection = {
    selection: {
      startDate: Date
      endDate: Date
    }
  }

  const handleChangeDate = (item: RangeKeyDict) => {
    if (item.selection?.startDate && item.selection?.endDate) {
      const delayDate = Math.abs(
        differenceInDays(item.selection?.endDate, item.selection?.startDate)
      )
      let itemState = item.selection
      if (delayDate > 30)
        itemState = {
          ...item.selection,
          endDate: addDays(item.selection.startDate, 30),
        }
      if (isAfter(item.selection.endDate, today))
        itemState = {
          ...item.selection,
          endDate: today,
        }

      setState([itemState])
    }
  }

  const handleChangeShowDate = (newShowDate: Date) => {
    const itemState = {
      ...state[0],
      startDate: newShowDate,
      endDate: lastDayOfMonth(newShowDate),
    }

    setState([itemState])
  }

  return (
    <Box ref={datePickerRef}>
      <div
        className={styles.pickerContainer}
        onClick={e => toggle(e)}
        role='button'
      >
        <input
          id='datePicker'
          value={withoutDate ? withoutDate : pickerValue}
          type='text'
          onClick={e => toggle(e)}
          className={cx(styles.inputEl)}
          readOnly
        />
        <span className={styles.pickerIcon}>
          {toggleState.isOpen ? <UpArrowIcon /> : <BottomArrowIcon />}
        </span>
      </div>
      <div
        className={cx(styles.pickerWrapper)}
        style={{
          ...style,
          position: 'absolute',
          display: toggleState.isOpen ? 'block' : 'none',
          top: toggleState.y,
        }}
      >
        {calendar ? (
          <Calendar
            onChange={item => {
              if (item) setDate(item)
            }}
            date={date}
          />
        ) : (
          <>
            {oneMonthSelection ? (
              <DateRangePicker
                onChange={handleChangeDate}
                onShownDateChange={handleChangeShowDate}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction='horizontal'
                className={styles.datePicker}
                maxDate={
                  isAfter(endDateMaxToAllow, today) ? today : endDateMaxToAllow
                }
                inputRanges={[
                  {
                    label: 'days up to today',
                    range(value) {
                      if (value > 30) {
                        return {
                          startDate: today,
                          endDate: today,
                        }
                      }
                      return {
                        startDate: subDays(today, Number(value)),
                        endDate: today,
                      }
                    },
                    getCurrentValue(range: any) {
                      if (!isSameDay(range.endDate, today)) return 0
                      return differenceInCalendarDays(today, range.startDate)
                    },
                  },
                ]}
              />
            ) : (
              <DateRange
                onChange={handleChangeDate}
                ranges={state}
                direction='horizontal'
              />
            )}
          </>
        )}

        <div className={styles.buttonWraper}>
          <Button
            size='small'
            variant='outlined'
            // buttonSize={'sm'}
            // buttonStyle="outline"
            onClick={() =>
              setToggleState(prevState => ({ ...prevState, isOpen: false }))
            }
          >
            Cancel
          </Button>
          <Button
            size='small'
            variant='contained'
            // buttonSize={'sm'}
            className={'primary'}
            onClick={onSaveSelectedRange}
            disabled={disabled}
          >
            Update
          </Button>
        </div>
      </div>
    </Box>
  )
}
export default DataPicker

import React, { useState } from 'react'

import BottomArrowIcon from 'assets/images/BottomArrow.svg'
import UpArrowIcon from 'assets/images/UpArrow.svg'
import cx from 'classnames'
import { GamesProps, useGames } from 'context/GamesContext'
import { format } from 'date-fns'
import { thousandSeparator } from 'helpers/currency'
import { separateAndUppercase } from 'helpers/stringHelper'
import { StatusTransaction } from 'types/transaction'

import { contentHeader, header } from './constants'

import styles from './Accordion.module.scss'

type RowRecord = {
  betLogId: string
  partnerId: string
  transactionDate: string
  playerId: string
  platformPlayerId: string
  coefficient: string
  betAmount: string
  currency: string
  winAmount: number | null
  status: StatusTransaction
}

type content = {
  tickets: {
    externalRoundId: string
    marketName: string
    eventName: string
    coefficent: string
    currency: string
    gameResult: string
    minRate: number | null | string
    maxRate: number | null | string
  }[]
}

type contentRecord = {
  externalRoundId: string
  marketName: string
  eventName: string
  coefficent: string
  currency: string
  gameResult: string
}

type AccordionProps = {
  data: RowRecord & content
}

export type TRListType = RowRecord & content

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [isActive, setIsActive] = useState(false)
  const { tickets, ...row } = data
  const { gamesList } = useGames()

  const renderHeader = () => {
    return Object.keys(header).map((col) => {
      let data = row[col as keyof RowRecord]
      let className = ''
      if (col === 'transactionDate') {
        data = format(new Date(row[col]), 'dd.MM.yyyy HH:mm:ss')?.replace(
          ' ',
          '\n'
        )
      }
      if (col === 'gameType') {
        const gameTypeObj = gamesList.filter(
          (item: GamesProps) => item.id === Number(data)
        )
        data = gameTypeObj?.length > 0 ? gameTypeObj[0].name : 'None'
      }

      if (col === 'status') {
        let status = ''
        switch (row[col as keyof RowRecord] as any) {
          case 0:
            status = 'Pending'
            className = 'refund'
            break
          case 1:
            status = 'Lost'
            className = 'lost'
            break
          case 2:
            status = 'Won'
            className = 'win'
            break
          case 3:
            status = 'Cancel'
            className = 'cancel'
            break
          case 4:
            status = 'Refund'
            className = 'canceled'
            break
        }

        data = status
      }
      if (['winAmount', 'betAmount'].includes(col)) {
        data = thousandSeparator(data as any)
      }

      return (
        <span
          key={col}
          className={styles[className]}
        >
          {data}
        </span>
      )
    })
  }

  const renderContent = () => {
    return tickets.map((row, rowInd) =>
      Object.keys(contentHeader).map((col, ind) => {
        const text = row[col as keyof contentRecord]
        if (col === 'eventName') {
          const evenNumber = row.maxRate
            ? `(${row.minRate} - ${row.maxRate})`
            : row.minRate
              ? `(${row.minRate})`
              : ''

          return (
            <span
              key={`${col}${rowInd}`}
              className={styles[`box${ind + 1}`]}
            >
              {separateAndUppercase(text) + evenNumber}{' '}
            </span>
          )
        } else {
          return (
            <span
              key={`${col}${rowInd}`}
              className={styles[`box${ind + 1}`]}
              style={
                ind === 1
                  ? {
                      whiteSpace: 'inherit',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }
                  : {}
              }
              title={ind === 1 ? text : ''}
            >
              {' '}
              {text}{' '}
            </span>
          )
        }
      })
    )
  }

  return (
    <>
      <div
        className={cx(styles.accordionRow, { [styles.topBorder]: isActive })}
        onClick={() => setIsActive(!isActive)}
      >
        <span className={styles.arrowCol}>
          {isActive ? <UpArrowIcon /> : <BottomArrowIcon />}
        </span>
        {renderHeader()}
      </div>
      {isActive && (
        <div className={styles.accordionContent}>
          <div className={styles.contentHeader}>
            {Object.values(contentHeader).map((col, ind) => {
              return (
                <span
                  key={col}
                  className={styles[`box${ind + 1}`]}
                >
                  {col}
                </span>
              )
            })}
          </div>
          <div className={styles.content}>{renderContent()}</div>
        </div>
      )}
    </>
  )
}

export default Accordion

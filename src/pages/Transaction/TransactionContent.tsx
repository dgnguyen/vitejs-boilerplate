import { useEffect } from 'react'

import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material'

import Accordion from 'components/Accordion'
import Card from 'components/Card'
import PaginateInfo from 'components/Commons/PaginateInfo'
import EmptyData from 'components/EmptyData'
import { FORMAT_DATE } from 'constants/date'
import { thousandSeparator } from 'helpers/currency'
import { header } from 'helpers/playerTransaction'
import { SearchTypeValue } from 'helpers/transaction'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  errorLoadTransactions,
  getTransactions,
  resetSearchValues,
  setMultiSearchLoadTransaction,
  transactionDashboardSelector,
  transactionDataSelector,
  transactionIsLoadingSelector,
  transactionIsPageLoadingSelector,
  transactionSearchValuesSelector,
  updateTransactionThroughWS,
} from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'
import { startSocketConnection } from 'services/signalR'
import { UpdateCMSDataWS } from 'types/transaction'

import { getDashboardCardTitle } from './helpers'

const TransactionContent = ({
  playerId,
  isTester,
}: {
  playerId?: string
  isTester?: string
}) => {
  const dispatch = useAppDispatch()
  const searchValues = useSelector(transactionSearchValuesSelector)
  const { hasMore, totalCount } = searchValues
  const dataTransaction = useSelector(transactionDataSelector)
  const dashboardTransaction = useSelector(transactionDashboardSelector)
  const loadingTransaction = useSelector(transactionIsLoadingSelector)
  const loadingPageTransaction = useSelector(transactionIsPageLoadingSelector)
  const errorLoadTransaction = useSelector(errorLoadTransactions)
  const { inputRef, height } = useSetHeightInfiniteScroll()

  const location = useLocation()

  useEffect(() => {
    startSocketConnection().then(({ isConnected, connection }) => {
      if (isConnected && connection) {
        connection.on('updateTransactionDataCMS', (result: UpdateCMSDataWS) => {
          dispatch(updateTransactionThroughWS(result))
        })
      }
    })
  }, [])

  useEffect(() => {
    if (playerId) {
      const date =
        location.state?.dateRange?.startDate &&
          location.state?.dateRange?.startDate
          ? {
            startDate: moment(location.state?.dateRange?.startDate).format(
              FORMAT_DATE
            ),
            endDate: moment(location.state?.dateRange?.endDate).format(
              FORMAT_DATE
            ),
          }
          : {}
      const updatedArraySearchValues = [
        { id: playerId },
        { searchType: SearchTypeValue.agentPlayerId },
        { agentSelected: location.state?.partnerId },
        { isTester: isTester === 'test' },
        { date },
      ]

      dispatch(setMultiSearchLoadTransaction(updatedArraySearchValues, true))
    } else {
      dispatch(resetSearchValues())
      dispatch(getTransactions())
    }
  }, [playerId, location.state?.dateRange])

  if (errorLoadTransaction) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100px'
      >
        <Typography fontWeight='bold'>
          Error while loading transactions
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box className='transaction-content-wrapper'>
        <Box className='header-transaction-wrapper'>
          {dashboardTransaction &&
            Object.entries(dashboardTransaction)
              .filter((item) => item[0] !== 'currency')
              .map((item: any) => {
                let displayPrice = thousandSeparator(item[1])
                if (item[0] === 'ggrInPercent')
                  displayPrice = `${(item[1] * 100)}%`
                if (item[0] === 'totalCount') displayPrice = item[1].toString()
                return (
                  <Card
                    title={getDashboardCardTitle(item[0])}
                    price={displayPrice}
                    currency={
                      ['ggr', 'totalBetAmount', 'totalWinAmount'].includes(
                        item[0]
                      )
                        ? 'KRW'
                        : ''
                    }
                  />
                )
              })}
        </Box>
        <Box
          className='transaction-table-content-wrapper'
          ref={inputRef}
          sx={{ height: 'calc(100vh - 560px)' }}
        >
          <Box className='transaction-table-header-wrapper'>
            {Object.values(header).map((col) => (
              <Box key={col}>
                <Typography>{col}</Typography>
                {[header.betAmount, header.winAmount].includes(col) ? (
                  <Typography>({dashboardTransaction?.currency})</Typography>
                ) : (
                  ''
                )}
              </Box>
            ))}
          </Box>
          <div
            id='scrollableDiv'
          >
            {loadingPageTransaction && <CircularProgress />}
            {!loadingPageTransaction && dataTransaction?.length > 0 && (
              <InfiniteScroll
                dataLength={dataTransaction?.length}
                next={() => dispatch(getTransactions())}
                hasMore={hasMore}
                height={height}
                loader={loadingTransaction && <LinearProgress />}
                scrollableTarget='scrollableDiv'
              >
                {dataTransaction.map((row: any, ind: number) => {
                  return (
                    <Accordion
                      key={`accordion${ind}`}
                      data={row}
                    />
                  )
                })}
              </InfiniteScroll>
            )}
            {!loadingPageTransaction && !dataTransaction?.length && (
              <EmptyData />
            )}
          </div>
        </Box>
      </Box>
      <PaginateInfo
        currentView={dataTransaction.length}
        totalCount={totalCount}
        loading={loadingTransaction}
      />
    </Box>
  )
}

export default TransactionContent

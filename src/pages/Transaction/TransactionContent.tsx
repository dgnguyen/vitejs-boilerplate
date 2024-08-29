import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material'
import Card from 'components/Card'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dashboardDataSelector } from 'redux/reducers/dashboard'
import { errorLoadTransactions, getTransactions, transactionDashboardSelector, transactionDataSelector, transactionIsLoadingSelector, transactionIsPageLoadingSelector, transactionSearchValuesSelector } from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'
import { getDashboardCardTitle } from './helpers'
import Accordion from 'components/Accordion'
import InfiniteScroll from 'react-infinite-scroll-component'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import EmptyData from 'components/EmptyData'
import { thousandSeparator } from 'helpers/currency'
import { header } from 'helpers/playerTransaction'

const TransactionContent = () => {
  const dispatch = useAppDispatch()
  const searchValues = useSelector(transactionSearchValuesSelector)
  const { hasMore, agentSelected, selectedGameType, searchType } = searchValues
  const dataTransaction = useSelector(transactionDataSelector)
  const dashboardTransaction = useSelector(transactionDashboardSelector)
  const loadingTransaction = useSelector(transactionIsLoadingSelector)
  const loadingPageTransaction = useSelector(transactionIsPageLoadingSelector)
  const errorLoadTransaction = useSelector(errorLoadTransactions)
  const { inputRef, height } = useSetHeightInfiniteScroll()
  useEffect(() => {
    dispatch(getTransactions())
  }, [agentSelected, selectedGameType])

  if (errorLoadTransaction) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100px">
        <Typography fontWeight="bold">Error while loading transactions</Typography>
      </Box>
    )
  }

  return (

    <Box className="transaction-wrapper">
      <Box className="header-transaction-wrapper">
        {
          dashboardTransaction && Object.entries(dashboardTransaction).map(item => {
            let displayPrice = thousandSeparator(item[1])
            if (item[0] === 'ggrInPercent') displayPrice = `${(item[1] * 100).toFixed(2)}%`
            if (item[0] === 'totalCount') displayPrice = item[1].toString()
            return (
              <Card
                title={getDashboardCardTitle(item[0])}
                price={displayPrice}
                currency={['ggr', 'totalBetAmount', 'totalWinAmount'].includes(item[0]) ? 'KRW' : ''}
              />
            )
          })
        }
      </Box>

      <Box className="transaction-table-header-wrapper">
        {Object.values(header).map(col => (
          <Box key={col}>{col}</Box>
        ))}
      </Box>

      <Box className="transaction-table-content-wrapper" ref={inputRef} sx={{ height: 'calc(100vh - 560px)' }}>
        <div id="scrollableDiv"
        //  className={styles.accordion}
        >
          {loadingPageTransaction && <CircularProgress />}
          {!loadingPageTransaction && dataTransaction?.length > 0 && (
            <InfiniteScroll
              dataLength={dataTransaction?.length}
              next={() => dispatch(getTransactions())}
              hasMore={hasMore}
              height={height}
              loader={loadingTransaction && <LinearProgress />}
              scrollableTarget="scrollableDiv"
            >
              {dataTransaction.map((row: any, ind: number) => (
                <Accordion key={`accordion${ind}`} data={row} />
              ))}
            </InfiniteScroll>
          )}
          {!loadingPageTransaction && !dataTransaction?.length && <EmptyData />}
        </div>
      </Box>
    </Box >
  )
}

export default TransactionContent

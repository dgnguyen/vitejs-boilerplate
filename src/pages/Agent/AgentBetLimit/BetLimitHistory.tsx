import { useEffect } from 'react'

import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'

import Loader from 'components/Commons/Loader'
import EmptyData from 'components/EmptyData'
import { FORMAT_DATE_TIME } from 'constants/date'
import { thousandSeparator } from 'helpers/currency'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { getHistoryChangeBetLimitAction } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'
import { IAgentBetLimit } from 'types/agent'

import { headerAgentBetLimit } from '../helpers'

import BetLimitFilter from './BetLimitFilter'

import '../style.scss'

const BetLimitHistory = () => {
  const agentsData = useSelector((state: RootState) => state?.agent)
  const { betLimitData, hasMore, loading, isLoadingPage, searchValues } =
    agentsData
  const dispatch = useAppDispatch()

  function fetchHistory() {
    dispatch(getHistoryChangeBetLimitAction())
  }

  function displayCell(cell: [string, string | number]) {
    if (cell[0] === 'appliedDate')
      return moment(cell?.[1]).format(FORMAT_DATE_TIME)
    if (['minBet', 'maxBet'].includes(cell[0]))
      return thousandSeparator(Number(cell[1]))
    return cell[1]
  }
  useEffect(() => {
    fetchHistory()
  }, [searchValues.value])

  const { inputRef, height } = useSetHeightInfiniteScroll()

  return (
    <Box className='agent-betlimit-history-wrapper'>
      <BetLimitFilter />
      <Box
        ref={inputRef}
        sx={{
          height: 'calc(100vh - 450px)',
          marginY: 1,
        }}
      >
        <div id='scrollableDiv'>
          {isLoadingPage && <CircularProgress />}
          {betLimitData?.length > 0 && (
            <TableContainer
              component={Paper}
              sx={{ marginTop: 1 }}
            >
              <InfiniteScroll
                dataLength={betLimitData?.length || 0}
                next={() => dispatch(getHistoryChangeBetLimitAction())}
                hasMore={hasMore}
                height={height ? height - 100 : 600}
                loader={loading && <LinearProgress />}
                scrollableTarget='scrollableDiv'
              >
                <Table
                  stickyHeader
                  aria-label='sticky table'
                  sx={{ minWidth: 650 }}
                >
                  <TableHead>
                    <TableRow>
                      {headerAgentBetLimit.map((header, index) => (
                        <TableCell key={`headerAgentOverview-${index}`}>
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody id='scrollableDiv'>
                    {betLimitData.map((row: IAgentBetLimit) => {
                      return (
                        <TableRow
                          key={row.appliedDate}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          {Object.entries(row).map(
                            (cell: [string, string | number]) => (
                              <TableCell
                                component='th'
                                scope='row'
                                key={cell?.[0]}
                              >
                                {displayCell(cell)}
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </InfiniteScroll>
            </TableContainer>
          )}
          {!isLoadingPage && !betLimitData?.length && <EmptyData />}
        </div>
      </Box>
    </Box>
  )
}

export default BetLimitHistory

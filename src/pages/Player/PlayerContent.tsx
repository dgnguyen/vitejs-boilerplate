import { useEffect } from 'react'

import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material'

import PaginateInfo from 'components/Commons/PaginateInfo'
import EmptyData from 'components/EmptyData'
import { FORMAT_DATE, FORMAT_DATE_TIME } from 'constants/date'
import { ROUTES } from 'constants/endpoint'
import { thousandSeparator } from 'helpers/currency'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  errorPlayerSelector,
  getPlayersAction,
  IPlayer,
  loadingPagePlayerSelector,
  loadingPlayerSelector,
  resetSearchValuesPlayer,
  setPreviousSearchValues,
} from 'redux/reducers/player'
import { RootState, useAppDispatch } from 'redux/store'

import { header } from './helpers'

const PlayerContent = () => {
  const dispatch = useAppDispatch()
  const { searchValues, data, hasMore } = useSelector(
    (state: RootState) => state.player
  )
  const { agentSelected, totalCount, currency } = searchValues
  const loading = useSelector(loadingPlayerSelector)
  const loadingPage = useSelector(loadingPagePlayerSelector)
  const error = useSelector(errorPlayerSelector)
  const { inputRef, height } = useSetHeightInfiniteScroll()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location?.state?.searchValues)
      dispatch(setPreviousSearchValues(location?.state?.searchValues))
  }, [])

  useEffect(() => {
    dispatch(getPlayersAction())
  }, [agentSelected])

  useEffect(() => {
    return () => {
      dispatch(resetSearchValuesPlayer())
    }
  }, [])

  function goToPlayerTransactionWithPreviousSearch(
    playerId: number,
    isTester: boolean,
    startDate: string,
    endDate: string,
    partnerId: number
  ) {
    navigate(
      `${ROUTES.TRANSACTION}/${playerId}/${isTester ? 'test' : 'real'}`,
      {
        state: {
          searchValues,
          partnerId,
          dateRange: {
            startDate: moment(startDate).format(FORMAT_DATE),
            endDate: moment(endDate).format(FORMAT_DATE),
          },
        },
      }
    )
  }

  if (error) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100px'
      >
        <Typography fontWeight='bold'>Error while loading players</Typography>
      </Box>
    )
  }
  return (
    <Box>
      <Box className='player-content-wrapper'>
        <Box className='player-table-header-wrapper'>
          {header.map((col) => (
            <Box key={col}>
              {['Total Bet', 'Total Win', 'GGR', 'Average Bet Amount'].includes(
                col
              ) ? (
                <Box>
                  <Box>{col}</Box>
                  <Typography>{`${currency ? `(${currency})` : ''}`}</Typography>
                </Box>
              ) : (
                col
              )}
            </Box>
          ))}
        </Box>

        <Box
          className='player-table-content-wrapper'
          ref={inputRef}
          sx={{
            height: 'calc(100vh - 360px)',
          }}
        >
          <div id='scrollableDiv'>
            {loadingPage && <CircularProgress />}
            {!loadingPage && data?.length > 0 && (
              <InfiniteScroll
                dataLength={data?.length}
                next={() => dispatch(getPlayersAction())}
                hasMore={hasMore}
                height={height}
                loader={loading && <LinearProgress />}
                scrollableTarget='scrollableDiv'
              >
                {data.map((row: IPlayer, ind: number) => (
                  <Box
                    key={`player-${row.playerId}`}
                    className='playerRow-wrapper'
                  >
                    <Box>{row?.playerId}</Box>
                    <Box>{row?.bcPlayerId}</Box>
                    <Box>{row?.agentName}</Box>
                    <Box
                      className='transactionCount'
                      onClick={() =>
                        goToPlayerTransactionWithPreviousSearch(
                          row?.bcPlayerId,
                          row?.isTester,
                          row?.firstActivity,
                          row?.lastActivity,
                          row?.partnerId
                        )
                      }
                    >
                      <Typography>{row?.transactionCount}</Typography>
                    </Box>
                    <Box>{thousandSeparator(row?.totalBetAmount)}</Box>
                    <Box>{thousandSeparator(row?.totalWinAmount)}</Box>
                    <Box>{thousandSeparator(row?.ggr)}</Box>
                    <Box>{thousandSeparator(row?.avgBetAmount)}</Box>
                    <Box>
                      {moment(row?.firstActivity).format(FORMAT_DATE_TIME)}
                    </Box>
                    <Box>
                      {moment(row?.lastActivity).format(FORMAT_DATE_TIME)}
                    </Box>
                    <Box className={row?.isTester ? 'test' : 'real'}>
                      {row?.isTester ? 'Test' : 'Real'}
                    </Box>
                  </Box>
                ))}
              </InfiniteScroll>
            )}
            {!loading && !data?.length && <EmptyData />}
          </div>
        </Box>
      </Box>
      <PaginateInfo
        currentView={data.length}
        totalCount={totalCount}
        loading={loading}
      />
    </Box>
  )
}

export default PlayerContent

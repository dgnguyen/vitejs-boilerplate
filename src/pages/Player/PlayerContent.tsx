import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { filterDataSelector } from 'redux/reducers/filter'
import {
  errorPlayerSelector,
  getPlayersAction,
  IPlayer,
  loadingPagePlayerSelector,
  loadingPlayerSelector,
  playerDataSelector,
} from 'redux/reducers/player'
import { useAppDispatch } from 'redux/store'
import { header } from './helpers'
import InfiniteScroll from 'react-infinite-scroll-component'
import EmptyData from 'components/EmptyData'
import Accordion from 'components/Accordion'
import { FORMAT_DATE_TIME } from 'constants/date'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'constants/endpoint'
import { setSearchValue } from 'redux/reducers/transaction'
import { SearchTypeValue } from 'helpers/transaction'

const PlayerContent = () => {
  const dispatch = useAppDispatch()
  const filter = useSelector(filterDataSelector)
  const { hasMore, agentSelected, selectedGameType, searchType } = filter
  const data = useSelector(playerDataSelector)
  const loading = useSelector(loadingPlayerSelector)
  const loadingPage = useSelector(loadingPagePlayerSelector)
  const error = useSelector(errorPlayerSelector)
  const { inputRef, height } = useSetHeightInfiniteScroll()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getPlayersAction())
  }, [agentSelected])




  function goToPlayerTransaction(playerId: number, isTester: boolean) {
    navigate(`${ROUTES.TRANSACTION}/${playerId}/${isTester ? 'test' : "real"}`)
  }

  if (error) {
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
    <Box className='player-content-wrapper'>
      <Box className='player-table-header-wrapper'>
        {Object.values(header).map((col) => (
          <Box key={col}>{col}</Box>
        ))}
      </Box>

      <Box
        className='player-table-content-wrapper'
        ref={inputRef}
        sx={{
          height: 'calc(100vh - 360px)',
        }}
      >
        <div
          id='scrollableDiv'
        //  className={styles.accordion}
        >
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
                  <Box className='transactionCount' onClick={() => goToPlayerTransaction(row?.bcPlayerId, row?.isTester)}>
                    <Typography>{row?.transactionCount}</Typography>
                  </Box>
                  <Box>{row?.totalBetAmount}</Box>
                  <Box>{row?.totalWinAmount}</Box>
                  <Box>{row?.ggr}</Box>
                  <Box>{row?.avgBetAmount}</Box>
                  <Box>
                    {moment(row?.fistActivity).format(FORMAT_DATE_TIME)}
                  </Box>
                  <Box>
                    {moment(row?.lastActivity).format(FORMAT_DATE_TIME)}
                  </Box>
                  <Box className={Boolean(row?.isTester) ? 'test' : 'real'}>
                    {row?.isTester ? 'Test' : 'Real'}
                  </Box>
                </Box>
                // <Accordion key={`accordion${ind}`} data={row} />
              ))}
            </InfiniteScroll>
          )}
          {!loading && !data?.length && <EmptyData />}
        </div>
      </Box>
    </Box>
  )
}

export default PlayerContent

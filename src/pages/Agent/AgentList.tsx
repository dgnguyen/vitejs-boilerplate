import { Delete } from '@mui/icons-material'
import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Loader from 'components/Commons/Loader'
import EmptyData from 'components/EmptyData'
import { FORMAT_DATE_TIME } from 'constants/date'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import moment from 'moment'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { getAgentsListAction } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'

const AgentList = () => {
  const agentsData = useSelector((state: RootState) => state?.agent)
  const { data, hasMore, loading, isLoadingPage } = agentsData
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAgentsListAction())
  }, [])

  const { inputRef, height } = useSetHeightInfiniteScroll()


  return (
    <Box ref={inputRef}>
      {data?.length > 0 && (
        <TableContainer component={Paper}>
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={() => dispatch(getAgentsListAction())}
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
                  {[
                    'Agent Id',
                    'Agent Code',
                    'Register date',
                    'Tag',
                    'Wallet type',
                    'Status',
                  ].map((header) => (
                    <TableCell
                      sx={{ fontWeight: 'bold' }}
                      key={header}
                    >
                      {header}
                    </TableCell>
                  ))}
                  <TableCell align='right' />
                </TableRow>
              </TableHead>
              <TableBody id='scrollableDiv'>
                {isLoadingPage && <Loader />}
                {data.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component='th'
                      scope='row'
                    >
                      {row.externalId}
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                    >
                      {row.code}
                    </TableCell>
                    <TableCell>
                      {moment(row.registerDate).format(FORMAT_DATE_TIME)}
                    </TableCell>
                    <TableCell>{row?.tag || '-'}</TableCell>
                    <TableCell>{row?.walletType || '-'}</TableCell>
                    <TableCell>{row?.isBlock ? 'Block' : 'Active'}</TableCell>
                    <TableCell align='right'>
                      <Delete
                        fontSize='small'
                        sx={{ cursor: 'pointer' }}
                      // onClick={() =>
                      //   setOpenDialog({ open: true, id: row.id })
                      // }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      )}
      {!isLoadingPage && !data?.length && <EmptyData />}
    </Box>
  )
}

export default AgentList

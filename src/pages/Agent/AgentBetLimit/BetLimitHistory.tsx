import { useEffect, useState } from 'react'

import { Delete } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import MuiDialog from 'components/Commons/MuiDialog'
import MuiModal from 'components/Commons/MuiModal'
import EmptyData from 'components/EmptyData'
import { FORMAT_DATE_TIME } from 'constants/date'
import { previousDay } from 'date-fns'
import { thousandSeparator } from 'helpers/currency'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import { useSnackbar } from 'hooks/useSnackbar'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { deleteBetLimitAction, getHistoryChangeBetLimitAction } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'
import { IAgentBetLimit, IAgentData } from 'types/agent'

import { headerAgentBetLimit } from '../helpers'

import BetLimitFilter from './BetLimitFilter'
import FormBetLimit from './FormBetLimit'

import '../style.scss'

const initState = {
  id: undefined,
  edit: false,
  delete: false,
}

const BetLimitHistory = () => {
  const [openModal, setopenModal] = useState<{
    id?: number,
    edit: boolean
    delete: boolean,
  }>(initState)
  const agentsData = useSelector((state: RootState) => state?.agent)
  const { betLimitData, hasMore, loading, isLoadingPage, searchValues } =
    agentsData
  const dispatch = useAppDispatch()

  function fetchHistory() {
    dispatch(getHistoryChangeBetLimitAction())
  }
  function handleCloseModalEdit() {
    setopenModal(initState)
  }

  function displayCell(cell: any) {
    if (['gameType', 'agent', 'market', 'event'].includes(cell[0])) {
      return cell[1]?.name
    }
    if (cell[0] === 'appliedDate')
      return moment(cell?.[1]).format(FORMAT_DATE_TIME)
    if (['minBet', 'maxBet'].includes(cell[0]))
      return thousandSeparator(Number(cell[1]))
    return cell[1]
  }

  useEffect(() => {
    fetchHistory()
  }, [searchValues])

  const { inputRef, height } = useSetHeightInfiniteScroll()
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  function handleEditBetLimit(id: number) {
    setopenModal((prevState) => ({
      ...prevState,
      id,
      edit: true
    }))
  }

  function handleDeleteBetLimit(id: number) {
    setopenModal((prevState) => ({
      ...prevState,
      id,
      delete: true
    }))
  }

  function cbCloseModal(msg: string) {
    if (msg) {
      openSnackbar({ message: msg })
      setopenModal(initState)
    }
  }

  function onSubmitDeleteBetLimit() {
    if (openModal.id) dispatch(deleteBetLimitAction(openModal.id, (msg) => cbCloseModal(msg)))
  }

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
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody id='scrollableDiv'>
                    {betLimitData.map((row: IAgentBetLimit) => {
                      return (
                        <TableRow
                          key={row.appliedDate}
                          sx={{
                            cursor: 'pointer',
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}

                        >
                          {Object.entries(row).map(
                            (cell: [string, any]) => {
                              if (cell[0] !== 'groupPermissionId')
                                return (
                                  <TableCell
                                    component='th'
                                    scope='row'
                                    key={`${row.id}-${cell?.[0]}`}
                                    onClick={() => handleEditBetLimit(row.id)}
                                  >
                                    {displayCell(cell)}
                                  </TableCell>
                                )
                            }
                          )}
                          <TableCell>
                            <Delete onClick={() => handleDeleteBetLimit(row.id)} />
                          </TableCell>
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
      {
        openModal.edit &&
        <MuiModal
          style={{
            width: '70vw',
          }}
          handleClose={handleCloseModalEdit}
          open={openModal.edit}
        >
          {/* <FormSettings
              isSuperEditUser={isSuperAdmin() || isOperator()}
              initialState={optionalState}
              // handleClose={() => handleState({ key: 'edit', value: false })}
              cb={(message) => openSnackbar({ message })}
            /> */}
          <FormBetLimit editBetId={openModal.id} />
        </MuiModal>
      }
      {
        openModal.delete &&
        (
          <MuiDialog
            loading={loading}
            open={openModal.delete}
            title='Delete Account'
            content={`Are you sure you want to delete betLimit id "${openModal.id}"? This action cannot be undone.`}
            handleClose={handleCloseModalEdit}
            handleSubmit={onSubmitDeleteBetLimit}
          />
        )
      }
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </Box>
  )
}

export default BetLimitHistory

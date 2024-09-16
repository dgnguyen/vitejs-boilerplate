import { useEffect, useState } from 'react'

import { Block, Delete, Edit, MoreVert } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import Loader from 'components/Commons/Loader'
import MuiDialog from 'components/Commons/MuiDialog'
import EmptyData from 'components/EmptyData'
import { WALLET_TYPE, WALLET_TYPE_NAME } from 'constants/agent'
import { FORMAT_DATE_TIME } from 'constants/date'
import useAnchor from 'hooks/useAnchor'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import { useSnackbar } from 'hooks/useSnackbar'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import {
  deleteAgentAction,
  getAgentsListAction,
  toggleStatusAgentAction,
  updateAgentAction,
} from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'
import { IAgentData } from 'types/agent'

import { headersAgentList, optionsStatus, walletTypeOptions } from './helpers'
import TagField from './TagField'

const AgentList = () => {
  const agentsData = useSelector((state: RootState) => state?.agent)
  const { data, hasMore, loading, isLoadingPage } = agentsData
  const dispatch = useAppDispatch()
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    dispatch(getAgentsListAction())
  }, [])

  const { inputRef, height } = useSetHeightInfiniteScroll()
  const { optionalState, setOptionalState } = useAnchor()

  const [state, setState] = useState({
    editWalletType: false,
    editTag: false,
    delete: false,
    block: false,
  })

  const handleState = ({ key, value }: { key: string; value: boolean }) =>
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))

  function handleDeleteAgent() {
    dispatch(deleteAgentAction(optionalState?.id, () => {}))
  }

  function toggleBlockAgent() {
    dispatch(
      toggleStatusAgentAction(
        optionalState?.id,
        optionalState?.isBlock,
        (error?: boolean) => {
          handleState({ key: 'block', value: false })
          if (!error)
            openSnackbar({
              message: `Status of agent ${optionalState.name} has been updated`,
            })
          else {
            openSnackbar({
              message: 'An error has occurred while updating agent status',
            })
          }
        }
      )
    )
  }

  function handleEditWalletType(row: IAgentData, e: SelectChangeEvent) {
    setOptionalState({ ...row, walletTypeId: e.target.value })
    handleState({ key: 'editWalletType', value: true })
  }

  function handleSubmitNewWalletType() {
    dispatch(
      updateAgentAction(optionalState, 'walletTypeId', (error?: boolean) => {
        handleState({ key: 'editWalletType', value: false })
        if (!error)
          openSnackbar({
            message: `Wallet type of agent ${optionalState.name} has been updated`,
          })
        else {
          openSnackbar({
            message: 'An error has occurred while updating agent status',
          })
        }
      })
    )
  }

  // to refactor

  // function handleEditAgent({
  //   row: IAgentData,
  //   e?: SelectChangeEvent,
  //   key: string
  // })

  function handleChangeStatus(row: IAgentData) {
    setOptionalState(row)
    handleState({ key: 'block', value: true })
  }

  function handleEditTag(row: IAgentData, newValue: string) {
    setOptionalState({
      ...row,
      tag: newValue,
    })
    handleState({ key: 'editTag', value: true })
  }

  function handleSubmitNewTag() {
    dispatch(
      updateAgentAction(optionalState, 'tag', (error?: boolean) => {
        handleState({ key: 'editTag', value: false })
        if (!error)
          openSnackbar({
            message: `Category of agent ${optionalState.name} has been updated`,
          })
        else {
          openSnackbar({
            message: 'An error has occurred while updating agent status',
          })
        }
      })
    )
  }

  return (
    <Box
      ref={inputRef}
      sx={{
        height: 'calc(100vh - 300px)',
        marginY: 2,
      }}
    >
      <div id='scrollableDiv'>
        {isLoadingPage && <CircularProgress />}
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
                    {headersAgentList.map((header, index) => (
                      <TableCell key={`headerAgentOverview-${index}`}>
                        {typeof header === 'object' ? (
                          <Box>
                            {header.map((item) => (
                              <Box>{item}</Box>
                            ))}
                          </Box>
                        ) : (
                          header
                        )}
                      </TableCell>
                    ))}
                    <TableCell align='right' />
                  </TableRow>
                </TableHead>
                <TableBody id='scrollableDiv'>
                  {isLoadingPage && <Loader />}
                  {!isLoadingPage &&
                    data.map((row: IAgentData) => {
                      return (
                        <TableRow
                          key={row?.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            component='th'
                            scope='row'
                          >
                            {row?.externalId}
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                          >
                            {row?.code || '-'}
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                          >
                            {row?.name}
                          </TableCell>
                          <TableCell>
                            {moment(row?.registerDate).format(FORMAT_DATE_TIME)}
                          </TableCell>
                          <TableCell>
                            <TagField
                              cancelEdit={state.editTag}
                              row={row}
                              loading={loading}
                              onChange={handleEditTag}
                            />
                          </TableCell>
                          <TableCell>
                            <FormControl
                              variant='standard'
                              fullWidth
                            >
                              <Select
                                value={row?.walletTypeId.toString()}
                                label='Wallet Type'
                                onChange={(e) => handleEditWalletType(row, e)}
                              >
                                {walletTypeOptions.map((item) => (
                                  <MenuItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <FormControl
                              variant='standard'
                              fullWidth
                            >
                              <Select
                                value={row?.isBlock.toString()}
                                label='Status'
                                onChange={() => handleChangeStatus(row)}
                              >
                                {optionsStatus.map((item) => (
                                  <MenuItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </InfiniteScroll>
          </TableContainer>
        )}
      </div>
      {state.editWalletType && (
        <MuiDialog
          loading={loading}
          open={state.editWalletType}
          title='Change Wallet Type'
          content={`Are you sure you want to change wallet type of "${optionalState?.name}" to ${optionalState?.walletTypeId === WALLET_TYPE.SEAMLESS ? WALLET_TYPE_NAME.TRANSFER : WALLET_TYPE_NAME.SEAMLESS}?`}
          handleClose={() =>
            handleState({ key: 'editWalletType', value: false })
          }
          handleSubmit={handleSubmitNewWalletType}
        />
      )}
      {state.block && (
        <MuiDialog
          loading={loading}
          open={state.block}
          title={optionalState?.isBlock ? 'Active agent' : 'Block agent'}
          content={`Are you sure you want to ${optionalState?.isBlock ? 'active agent' : 'block agent'} "${optionalState?.name}"?`}
          handleClose={() => handleState({ key: 'block', value: false })}
          handleSubmit={() => toggleBlockAgent()}
        />
      )}
      {state.delete && (
        <MuiDialog
          loading={loading}
          open={state.delete}
          title='Delete Agent'
          content={`Are you sure you want to delete agent "${optionalState?.name}"? This action cannot be undone.`}
          handleClose={() => handleState({ key: 'delete', value: false })}
          handleSubmit={handleDeleteAgent}
        />
      )}
      {state.editTag && (
        <MuiDialog
          loading={loading}
          open={!!state.editTag}
          title='Edit Category Agent'
          content={`Are you sure you want to edit tag agent to "${optionalState.tag}"?`}
          handleClose={() => handleState({ key: 'editTag', value: false })}
          handleSubmit={handleSubmitNewTag}
        />
      )}
      {!isLoadingPage && !data?.length && <EmptyData />}
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

export default AgentList

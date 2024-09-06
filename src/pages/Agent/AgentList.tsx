import { MoreVert, Edit, Delete, Block } from '@mui/icons-material'
import { Box, FormControl, InputLabel, LinearProgress, MenuItem, NativeSelect, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Loader from 'components/Commons/Loader'
import EmptyData from 'components/EmptyData'
import { FORMAT_DATE_TIME } from 'constants/date'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import moment from 'moment'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { toggleStatusAgentAction, deleteAgentAction, getAgentsListAction } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'
import { headersAgentList, optionsStatus, walletTypeOptions } from './helpers'
import useAnchor from 'hooks/useAnchor'
import Menu from 'components/Commons/Menu'
import { useSnackbar } from 'hooks/useSnackbar'
import MuiDialog from 'components/Commons/MuiDialog'
import { WALLET_TYPE, WALLET_TYPE_NAME } from 'constants/agent'
import Tags from 'components/Tags'
import SelectTag from 'components/SelectTag'

const AgentList = () => {
  const agentsData = useSelector((state: RootState) => state?.agent)
  const { data, hasMore, loading, isLoadingPage } = agentsData
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAgentsListAction())
  }, [])

  const { inputRef, height } = useSetHeightInfiniteScroll()
  const { anchorEl, handleOpen, optionalState, setOptionalState, handleClose } =
    useAnchor()

  const [state, setState] = useState({
    editWalletType: false,
    delete: false,
    block: false,
  })
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  const handleState = ({ key, value }: { key: string, value: boolean }) =>
    setState(prevState => ({
      ...prevState,
      [key]: value
    }))


  const optionsMenuCard = [
    {
      onClick: () => handleState({ key: 'edit', value: true }),
      name: 'Edit',
      icon: <Edit />,
      dataTestId: 'edit-agent-button'
    },
    {
      onClick: () => handleState({ key: 'block', value: true }),
      name: 'Block',
      icon: <Block />,
      dataTestId: 'block-agent-button'
    },
    {
      onClick: () => handleState({ key: 'delete', value: true }),
      name: 'Delete',
      icon: <Delete />,
      dataTestId: "delete-agent-button"
    }
  ]

  function handleDeleteAgent() {
    dispatch(deleteAgentAction(optionalState?.id, () => { }))
  }

  function toggleBlockAgent() {
    dispatch(toggleStatusAgentAction(optionalState?.id, optionalState?.isBlock, () => handleState({ key: 'block', value: false })))
  }

  function handleEditWalletType(row: any) {
    setOptionalState(row)
    handleState({ key: 'editWalletType', value: true })
  }

  function handleChangeStatus(row: any) {
    setOptionalState(row)
    handleState({ key: 'block', value: true })
  }

  function handleOnChange() {

  }

  return (
    <Box ref={inputRef} sx={{
      height: 'calc(100vh - 300px)',
      marginY: 2,
    }}>
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
                  {headersAgentList.map((header) => (
                    <TableCell
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
                {data.map((row: any) => {
                  return (
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
                        {row.code || '-'}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {moment(row.registerDate).format(FORMAT_DATE_TIME)}
                      </TableCell>
                      <TableCell>
                        <SelectTag onChange={handleOnChange} />
                      </TableCell>
                      <TableCell>
                        <FormControl variant="standard" fullWidth>
                          <Select
                            value={row.walletTypeId}
                            label="Wallet Type"
                            onChange={() => handleEditWalletType(row)}
                          >
                            {
                              walletTypeOptions.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl variant="standard" fullWidth>
                          <Select
                            value={row?.isBlock.toString()}
                            label="Status"
                            onChange={() => handleChangeStatus(row)}
                          >
                            {
                              optionsStatus.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                              ))
                            }
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
      {anchorEl && (
        <Menu
          id="accounts-action"
          anchorEl={anchorEl}
          closeMenu={handleClose}
          optionsMenuCard={optionsMenuCard}
        />
      )}
      {state.editWalletType && (
        <MuiDialog
          loading={loading}
          open={state.editWalletType}
          title="Change Wallet Type"
          content={`Are you sure you want to change wallet type of "${optionalState?.name}" to ${optionalState?.walletTypeId === WALLET_TYPE.SEAMLESS ? WALLET_TYPE_NAME.TRANSFER : WALLET_TYPE_NAME.SEAMLESS}?`}
          handleClose={() => handleState({ key: 'editWalletType', value: false })}
          handleSubmit={() => { }}
        />
      )}
      {state.block && (
        <MuiDialog
          loading={loading}
          open={state.block}
          title={optionalState?.isBlock ? "Active agent" : "Block agent"}
          content={`Are you sure you want to ${optionalState?.isBlock ? "active agent" : "block agent"} "${optionalState?.name}"?`}
          handleClose={() => handleState({ key: 'block', value: false })}
          handleSubmit={() => toggleBlockAgent()}
        />
      )}
      {state.delete && (
        <MuiDialog
          loading={loading}
          open={state.delete}
          title="Delete Agent"
          content={`Are you sure you want to delete agent "${optionalState?.name}"? This action cannot be undone.`}
          handleClose={() => handleState({ key: 'delete', value: false })}
          handleSubmit={handleDeleteAgent}
        />
      )}
      {!isLoadingPage && !data?.length && <EmptyData />}
    </Box>
  )
}

export default AgentList

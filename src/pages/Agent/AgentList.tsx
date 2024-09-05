import { MoreVert, Edit, Delete, Block } from '@mui/icons-material'
import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Loader from 'components/Commons/Loader'
import EmptyData from 'components/EmptyData'
import { FORMAT_DATE_TIME } from 'constants/date'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import moment from 'moment'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { blockAgentAction, deleteAgentAction, getAgentsListAction } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'
import { getWalletName, headersAgentList } from './helpers'
import useAnchor from 'hooks/useAnchor'
import Menu from 'components/Commons/Menu'
import MuiModal from 'components/Commons/MuiModal'
import FormAgent from './FormAgent'
import { useSnackbar } from 'hooks/useSnackbar'
import MuiDialog from 'components/Commons/MuiDialog'

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
    edit: false,
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

  function handleBlockAgent() {
    dispatch(blockAgentAction(optionalState?.id, () => { }))
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
                    <TableCell>{row?.tag || '-'}</TableCell>
                    <TableCell>{getWalletName(row?.walletTypeId) || '-'}</TableCell>
                    <TableCell>{row?.isBlock ? 'Block' : 'Active'}</TableCell>
                  </TableRow>
                ))}
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
      {state.edit && (
        <MuiModal
          style={{
            width: 600
          }}
          handleClose={() => handleState({ key: 'edit', value: false })}
          open={state.edit}
        >
          <FormAgent
            isSuperEditUser
            initialState={optionalState}
            handleClose={() => handleState({ key: 'edit', value: false })}
            cb={(message: string) => openSnackbar({ message })}
          />
        </MuiModal>
      )}
      {state.block && (
        <MuiDialog
          loading={loading}
          open={state.block}
          title="Block Agent"
          content={`Are you sure you want to block agent "${optionalState?.name}"?`}
          handleClose={() => handleState({ key: 'block', value: false })}
          handleSubmit={handleBlockAgent}
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

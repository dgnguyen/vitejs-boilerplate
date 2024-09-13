import { useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Box,
  Button,
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
  Typography,
} from '@mui/material'

import EmptyData from 'components/EmptyData'
import Menu from 'components/Commons/Menu'
import MuiDialog from 'components/Commons/MuiDialog'
import MuiModal from 'components/Commons/MuiModal'
import PaginateInfo from 'components/Commons/PaginateInfo'
import Loader from 'components/Commons/Loader'
import { FORMAT_DATE_TIME } from 'constants/date'
import useAnchor from 'hooks/useAnchor'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import { useSnackbar } from 'hooks/useSnackbar'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import {
  getAccountsAction,
  handleDeleteUserAction,
  resetAccountsState,
} from 'redux/reducers/account'

import FormSettings from './FormSettings'
import { initialStateCreateAccount } from './helpers'
import { getUserRole } from './helpers'
import { RootState, useAppDispatch } from 'redux/store'
import { HeaderTab } from './HeaderTab'
import { isMasterAgent, isSuperAdmin } from 'helpers/auth'

const AccountsManagement = () => {
  const dispatch = useAppDispatch()
  const accountSelector = useSelector((state: RootState) => state.account)
  const { data, loading, loadingPage, error, hasMore, totalCount } =
    accountSelector

  const [state, setState] = useState({
    create: false,
    edit: false,
    delete: false,
  })

  const handleState = ({ key, value }: { key: string; value: any }) =>
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))

  const { inputRef, height } = useSetHeightInfiniteScroll()

  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  const { anchorEl, handleOpen, optionalState, setOptionalState, handleClose } =
    useAnchor()

  const handleDataLoad = async () => {
    dispatch(getAccountsAction())
  }

  useEffect(
    () => () => {
      dispatch(resetAccountsState())
    },
    []
  )

  useEffect(() => {
    handleDataLoad()
  }, [])

  function handleDeleteUser() {
    dispatch(
      handleDeleteUserAction(optionalState.userId, () => {
        openSnackbar({ message: 'User has been deleted' })
        handleState({ key: 'delete', value: false })
      })
    )
  }

  const optionsMenuCard = [
    {
      onClick: () => handleState({ key: 'edit', value: true }),
      name: 'Edit',
      icon: <EditIcon />,
      dataTestId: 'editAccount',
    },
    {
      onClick: () => handleState({ key: 'delete', value: true }),
      name: 'Delete',
      icon: <DeleteIcon />,
      dataTestId: 'deleteAccount',
    },
  ]
  if (loadingPage) return <CircularProgress />
  if (error) return <Box>Error loading page</Box>
  return (
    <Box>
      <HeaderTab />
      <Box
        ref={inputRef}
        sx={{ width: '100%' }}
      >
        <Box
          display='flex'
          gap={2}
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'black',
            }}
          >
            Account Management
          </Typography>
          <Button
            variant='contained'
            key='addNewAccount'
            onClick={() => handleState({ key: 'create', value: true })}
          >
            Add new account
          </Button>
        </Box>
        <Box sx={{ marginTop: '32px' }}>
          <PaginateInfo
            currentView={data.length}
            totalCount={totalCount}
            loading={loading}
          />

          <TableContainer component={Paper}>
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={() => dispatch(getAccountsAction())}
              hasMore={hasMore}
              height={height ? height - 100 : 600}
              loader={loading && <LinearProgress />}
              scrollableTarget='scrollableDiv'
            >
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label='simple table'
              >
                <TableHead>
                  <TableRow>
                    {[
                      'ID',
                      'Agent Name',
                      'Name',
                      'Surname',
                      'Email',
                      'Login Date',
                      'Created Date',
                      'Created By',
                      'Role',
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
                  {loadingPage && <Loader />}
                  {data.map((row) => (
                    <TableRow
                      key={row?.userId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row?.userId}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row?.agentName}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row?.name}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row?.surname}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row?.email}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {moment(row?.loginDate).format(FORMAT_DATE_TIME)}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {moment(row?.createDate).format(FORMAT_DATE_TIME)}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row?.createdBy}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {getUserRole(row?.permissionLevel)}
                      </TableCell>
                      <TableCell align='right'>
                        <MoreVertIcon
                          fontSize='small'
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpen(e)
                            setOptionalState(row)
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {!loadingPage && !data?.length && <EmptyData />}
                </TableBody>
              </Table>
            </InfiniteScroll>
          </TableContainer>
          {anchorEl && (
            <Menu
              id='accounts-action'
              anchorEl={anchorEl}
              closeMenu={handleClose}
              optionsMenuCard={optionsMenuCard}
            />
          )}
        </Box>
        {state.edit && (
          <MuiModal
            style={{
              width: 600,
            }}
            handleClose={() => handleState({ key: 'edit', value: false })}
            open={state.edit}
          >
            <FormSettings
              isSuperEditUser={isSuperAdmin() || isMasterAgent()}
              initialState={optionalState}
              handleClose={() => handleState({ key: 'edit', value: false })}
              cb={(message) => openSnackbar({ message })}
            />
          </MuiModal>
        )}
        {state.create && (
          <MuiModal
            style={{
              width: 600,
            }}
            handleClose={() => handleState({ key: 'create', value: false })}
            open={state.create}
          >
            <FormSettings
              initialState={initialStateCreateAccount}
              handleClose={() => handleState({ key: 'create', value: false })}
              isCreateUser
              cb={(message) => openSnackbar({ message })}
            />
          </MuiModal>
        )}
        {state.delete && (
          <MuiDialog
            loading={loading}
            open={state.delete}
            title='Delete Account'
            content={`Are you sure you want to delete account "${optionalState.name}"? This action cannot be undone.`}
            handleClose={() => handleState({ key: 'delete', value: false })}
            handleSubmit={handleDeleteUser}
          />
        )}
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
    </Box>
  )
}

export default AccountsManagement

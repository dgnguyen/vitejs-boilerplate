import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import './style.scss'
import { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from 'redux/store'
import { useSelector } from 'react-redux'
import {
  addPlayerTracking,
  deletePlayerTracking,
  loadPlayersTracking,
  setErrorPlayersTracking,
} from 'redux/reducers/playerTracking'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import EmptyData from 'components/EmptyData'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Delete, Add } from '@mui/icons-material'
import PaginateInfo from 'components/Commons/PaginateInfo'
import moment from 'moment'
import Loader from 'components/Commons/Loader'
import { FORMAT_DATE_TIME } from 'constants/date'
import PageTitle from 'components/Commons/PageTitle'
import AddPlayerTrackingForm from './AddPlayerTrackingForm'
const initialState = { id: '', open: false }

export type SnackbarProps = {
  open: boolean
  message: string
}

const initialStateSnackbar = {
  open: false,
  message: '',
}

const PlayerTracking = () => {
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(initialState)
  const [snackBar, setSnackbar] = useState(initialStateSnackbar)

  const dispatch = useAppDispatch()
  const playerTrackingData = useSelector(
    (state: RootState) => state.playerTracking
  )
  const { data, loading, isLoadingPage, errors, hasMore, totalCount } =
    playerTrackingData

  useEffect(() => {
    dispatch(loadPlayersTracking())
    return () => setSnackbar(initialStateSnackbar)
  }, [])

  const handleClose = () => {
    setOpen(false)
    dispatch(setErrorPlayersTracking(''))
  }

  const handleCloseDialog = () => setOpenDialog(initialState)

  const handleDelete = () => {
    dispatch(
      deletePlayerTracking(openDialog.id, () => {
        handleCloseDialog()
        setSnackbar({
          open: true,
          message: 'Player has been remove from tracking view',
        })
      })
    )
  }

  const { inputRef, height } = useSetHeightInfiniteScroll()

  return (
    <Box
      ref={inputRef}
      sx={{
        position: 'relative',
        height: 'calc(100vh - 150px)',
      }}
    >
      <Box>
        <PageTitle title={'Player Tracking'} />
      </Box>
      <Box>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            textTransform: 'capitalize',
          }}
        >
          <Typography>Add New Player tracking ID</Typography>
        </Button>
      </Box>
      <PaginateInfo
        currentView={data.length}
        loading={loading}
        totalCount={totalCount}
      />
      <Box>
        {data?.length > 0 && (
          <TableContainer component={Paper}>
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={() => dispatch(loadPlayersTracking())}
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
                      'Agent Name',
                      'Agent Player ID',
                      'Created date',
                      'Created by',
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
                        {row.agentName}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>
                        {moment(row.createDate).format(FORMAT_DATE_TIME)}
                      </TableCell>
                      <TableCell>{row.createdBy || '-'}</TableCell>
                      <TableCell align='right'>
                        <Delete
                          fontSize='small'
                          sx={{ cursor: 'pointer' }}
                          onClick={() =>
                            setOpenDialog({ open: true, id: row.id })
                          }
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
      {open && (
        <AddPlayerTrackingForm
          open={open}
          handleClose={handleClose}
          setSnackbar={setSnackbar}
        />
      )}
      {openDialog.open && (
        <Dialog
          open={openDialog.open}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle
            id='alert-dialog-title'
            style={{ textTransform: 'capitalize' }}
          >
            Remove tracking player
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {`Are you sure you want to remove tracking player "${openDialog.id}" ?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleDelete}
              variant='contained'
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {snackBar.open && (
        <Snackbar
          open={snackBar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar(initialStateSnackbar)}
          message={snackBar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </Box>
  )
}

export default PlayerTracking

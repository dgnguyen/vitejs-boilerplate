import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export type MuiDialogProps = {
  open: boolean
  title: string
  content: string
  handleSubmit: () => void
  handleClose: () => void
  loading: boolean
}

const MuiDialog = ({
  open,
  title,
  content,
  handleSubmit,
  loading,
  handleClose,
}: MuiDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          variant='contained'
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MuiDialog

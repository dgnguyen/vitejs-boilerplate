import CloseIcon from '@mui/icons-material/Close'
import { Box, Modal } from '@mui/material'

const defaultStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  p: 1,
  outline: 'none',
  borderRadius: 'var(--radius-base)'
}

export type Props = {
  children: React.ReactNode
  handleClose: () => void
  open: boolean
  style?: {}
}

export default function MuiModal({
  children,
  handleClose,
  open,
  style = {}
}: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...defaultStyle,
          ...style
        }}
      >
        <Box width="100%" display="flex" justifyContent="flex-end">
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
        </Box>
        <Box sx={{ padding: '8px 24px 32px 24px' }}>{children}</Box>
      </Box>
    </Modal>
  )
}

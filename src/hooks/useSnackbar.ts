import { useState } from 'react'

const initialStateSnackbar = {
  open: false,
  message: '',
}

type Props = {
  open: boolean
  message: string | React.ReactNode
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<Props>(initialStateSnackbar)

  const openSnackbar = ({ message }: { message: string | React.ReactNode }) =>
    setSnackbar({
      message,
      open: true,
    })

  const closeSnackbar = () => setSnackbar(initialStateSnackbar)

  return {
    snackbar,
    openSnackbar,
    closeSnackbar,
  }
}

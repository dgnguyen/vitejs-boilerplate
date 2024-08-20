import { useState } from 'react'

const initialStateSnackbar = {
  open: false,
  message: '',
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState(initialStateSnackbar)

  const openSnackbar = ({ message }: { message: string }) =>
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

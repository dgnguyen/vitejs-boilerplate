import { useEffect, useState } from 'react'

import { Box, CircularProgress, Snackbar, Typography } from '@mui/material'

import { API_ENDPOINT } from 'api/endpoint'
import axios from 'axios'
import MuiMessage from 'components/Commons/MuiMessage'
import { useSimpleForm } from 'hooks/useSimpleForm'
import { useSnackbar } from 'hooks/useSnackbar'

import FormSettings from './FormSettings'
import { HeaderTab } from './HeaderTab'

type ValuesForm = {
  email: string
  name: string
  surname: string
  isActive?: boolean
  partnerId?: number
  permissionLevel?: number
  oldPassword?: string
  password?: string
  confirmPassword?: string
}

const initialState = {
  email: '',
  name: '',
  surname: '',
  oldPassword: '',
  password: '',
  confirmPassword: '',
  permissionLevel: undefined,
}

const AccountSettings = () => {
  const {
    setLoading,
    error,
    setError,
    message,
    setMessage,
    loadingPage,
    setLoadingPage,
  } = useSimpleForm()
  const [state, setState] = useState(initialState)

  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  async function fetchUser() {
    setLoadingPage(true)
    try {
      const response = await axios.post(API_ENDPOINT.GET_ACCOUNT)
      if (!response?.data) {
        setError(true)
        setMessage(response?.data?.message)
      } else {
        setState(response?.data)
      }
    } catch (e: any) {
      setError(true)
      setMessage(e.message || 'Error while update account settings')
    } finally {
      setLoadingPage(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const onSubmit = async (values: ValuesForm) => {
    setLoading(true)
    setMessage('')
    try {
      const { isActive, partnerId, permissionLevel, ...rest } = values

      const response = await axios.post(API_ENDPOINT.UPDATE_ACCOUNT, rest)
      setError(!response?.data?.isSuccess)
      openSnackbar({ message: response?.data?.message })
    } catch (e: any) {
      setError(true)
      openSnackbar({ message: e?.response?.data?.message || e })
    } finally {
      setLoading(false)
    }
  }
  if (loadingPage) return <CircularProgress />

  return (
    <Box>
      <HeaderTab />
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <FormSettings
          isEditUser
          initialState={state}
          cb={(message) => openSnackbar({ message })}
        />
        {message && (
          <MuiMessage
            message={message}
            error={error}
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

export default AccountSettings

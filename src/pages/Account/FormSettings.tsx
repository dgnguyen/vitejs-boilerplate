import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography
} from '@mui/material'

import axios from 'axios'
import MuiMessage from 'components/Commons/MuiMessage'
import MuiTextFieldFormik from 'components/Commons/MuiTextFieldFormik'
import { PERMISSION_LEVEL, ROLES } from 'constants/account'
import { Form, Formik } from 'formik'
import { useSimpleForm } from 'hooks/useSimpleForm'
import { useDispatch } from 'react-redux'
import accountSchema from 'schema/accountSchema'
import { addNewAccount, updateAccount } from 'redux/reducers/account'

import { PasswordInput } from './Input'

export type ValuesForm = {
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

type Props = {
  initialState: ValuesForm
  handleClose: () => void
  cb: (message: string) => void
  isCreateUser?: boolean
  isEditUser?: boolean
  isSuperEditUser?: boolean
}

const FormSettings = ({
  initialState,
  handleClose,
  isCreateUser = false,
  isEditUser = false,
  isSuperEditUser = false,
  cb
}: Props) => {
  const { loading, setLoading, error, setError, message, setMessage } =
    useSimpleForm()

  const dispatch = useDispatch()

  const onSubmit = async (values: ValuesForm) => {
    setLoading(true)
    setMessage('')
    try {
      if (isCreateUser) {
        const response = await axios.post(
          `${process.env.REACT_APP_MAIN_API}/AdminUser/createUser`,
          values
        )
        setError(!response?.data?.isSuccess)
        setMessage(response?.data?.message)
        if (response?.data?.isSuccess) {
          dispatch(addNewAccount(response?.data?.data))
          cb('Account has been created successfully')
        }
      } else if (isSuperEditUser || isEditUser) {
        const { isActive, partnerId, permissionLevel, ...rest } = values

        const valuesSendToAPI = isSuperEditUser
          ? {
            permissionLevel,
            ...rest
          }
          : rest
        const response = await axios.post(
          `${process.env.REACT_APP_MAIN_API}/AdminUser/updateUser`,
          valuesSendToAPI
        )
        setError(!response?.data?.isSuccess)
        setMessage(response?.data?.message)
        if (response?.data?.isSuccess) {
          dispatch(updateAccount(response?.data?.data))
          cb('Account has been edited successfully')
        }
      }
      handleClose?.()
    } catch (e: any) {
      setError(true)
      setMessage(e?.response?.data?.message || e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Formik
        initialValues={{ ...initialState }}
        validationSchema={accountSchema}
        onSubmit={onSubmit}
      >
        {props => (
          <Form
            id="accountSettingsFormSuperAdmin"
            autoComplete="off"
            onSubmit={props.handleSubmit}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'black',
                  marginBottom: '24px'
                }}
              >
                {isCreateUser
                  ? 'Create New Account'
                  : `Edit Account "${props.values.name}"`}
              </Typography>
              {isSuperEditUser && (
                <MuiMessage
                  message="(*) If email or permission level were changed, user will need to re-login again"
                  error
                />
              )}
              {isEditUser && (
                <MuiMessage message="(*) Email can not be changed" error />
              )}
              {!isEditUser && (
                <MuiMessage message="(*) Only Arctx email can be added" error />
              )}
              {(isCreateUser || isSuperEditUser) && (
                <MuiMessage
                  message="(*) Special characters allowed in email : period (.), underscore(_), hyphen (-) and plus sign (+)"
                  error
                />
              )}
              <Box display="flex" flexDirection="column">
                <MuiTextFieldFormik
                  id="email"
                  handleChange={props.handleChange}
                  handleBlur={props.handleBlur}
                  value={props.values.email}
                  name="email"
                  label="Email"
                  touched={props.touched}
                  errors={props.errors}
                  required
                  disabled={isEditUser}
                />

                <Box
                  display="flex"
                  flexDirection="row"
                  marginTop={4}
                  width="100%"
                  gap={2}
                  justifyContent="space-between"
                >
                  <MuiTextFieldFormik
                    id="name"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.name}
                    name="name"
                    label="Name"
                    touched={props.touched}
                    errors={props.errors}
                    required
                  />

                  <MuiTextFieldFormik
                    id="surName"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    value={props.values.surname}
                    name="surname"
                    label="Surname"
                    touched={props.touched}
                    errors={props.errors}
                    required
                  />
                </Box>
                {(isSuperEditUser || isCreateUser) && (
                  <Box sx={{ marginTop: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel id="changePermissionLevel">
                        Permission Level
                      </InputLabel>
                      <Select
                        labelId="changePermissionLevel"
                        id="changePermissionLevel-Select"
                        value={props.values.permissionLevel}
                        label="Permission Level"
                        onChange={props.handleChange}
                        name="permissionLevel"
                      >
                        {PERMISSION_LEVEL.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}
              </Box>
              {(isCreateUser || isEditUser) && (
                <Box
                  display="flex"
                  flexDirection="column"
                  marginTop={4}
                  gap={2}
                >
                  {isEditUser && (
                    <PasswordInput
                      id={'oldPassword'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.oldPassword}
                      error={!!props.errors.oldPassword}
                      helperText={props.errors.oldPassword}
                      label="Old Password"
                      disabled={loading}
                    />
                  )}
                  <PasswordInput
                    id={'password'}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    error={!!props.errors.password}
                    helperText={props.errors.password}
                    label="New Password"
                    disabled={loading}
                    {...(isCreateUser && { required: true })}
                  />
                  <PasswordInput
                    id={'confirmPassword'}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.confirmPassword}
                    error={!!props.errors.confirmPassword}
                    helperText={props.errors.confirmPassword}
                    label="Confirm New Password"
                    disabled={loading}
                    {...(isCreateUser && { required: true })}
                  />
                </Box>
              )}
            </Box>

            <Box display="flex" justifyContent="flex-end" gap={2}>
              {!isEditUser && (
                <Button
                  sx={{ marginY: 2 }}
                  disabled={loading}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                key="updateAccount"
                sx={{ marginY: 2, width: '200px' }}
                disabled={loading}
              >
                {loading && <CircularProgress />}
                {isCreateUser ? 'Create' : 'Update'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {message && error && <MuiMessage message={message} error={error} />}
    </Box>
  )
}

export default FormSettings

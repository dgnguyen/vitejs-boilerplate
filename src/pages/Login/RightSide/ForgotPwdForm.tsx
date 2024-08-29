// impoyrt { LoadingButton } from '@mui/lab'
import { Box, Link, Button, Typography } from '@mui/material'

import axios from 'axios'
import MuiMessage from 'components/Commons/MuiMessage'
import { ROUTES } from 'constants/endpoint'
import { Form, Formik, FormikHelpers } from 'formik'
import { useSimpleForm } from 'hooks/useSimpleForm'
import { useNavigate } from 'react-router-dom'

import { forgotPwdSchema } from 'schema/loginSchema'

import styles from './styles.module.scss'

type ValuesForm = {
  email: string
}

const ForgotPwdForm = () => {
  const { loading, setLoading, error, setError, message, setMessage } =
    useSimpleForm()
  const navigate = useNavigate()
  const onSubmit = async (
    values: ValuesForm,
    action: FormikHelpers<ValuesForm>
  ) => {
    setLoading(true)
    setMessage('')
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/AdminUser/ResetPassword`,
        values
      )
      setMessage(response.data.message)
    } catch (e) {
      setError(true)
      action.setErrors({
        email: 'Email is not correct',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPwdSchema}
        onSubmit={(values, actions) => {
          onSubmit(values, actions)
        }}
      >
        {(props) => (
          <Form
            className='login-form'
            onSubmit={props.handleSubmit}
          >
            <div>
              <label htmlFor='email'>Email to reset password</label>
              <div className={styles.input_group}>
                <input
                  id='email'
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  type='text'
                  name='email'
                  className={
                    props.touched.email && props.errors.email
                      ? 'error_input'
                      : ''
                  }
                />
                {props.touched.email && props.errors.email && (
                  <span className='error_text'>{props.errors.email}</span>
                )}
              </div>
            </div>

            <Button
              type='submit'
              variant='contained'
              fullWidth
              key='sendMailResetPwd'
              sx={{ marginY: 2 }}
              // loadingPosition="start"
              disabled={loading}
            // loading={loading}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
      {message && (
        <MuiMessage
          message={message}
          error={error}
        />
      )}
      <Link
        sx={{
          textAlign: 'left',
          marginTop: 2,
        }}
        component='button'
        variant='body2'
        onClick={() => navigate(ROUTES.APP_ROOT)}
      >
        Return to login page{' '}
      </Link>
    </Box>
  )
}

export default ForgotPwdForm

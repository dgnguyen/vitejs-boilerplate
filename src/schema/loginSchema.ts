import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email not valid').required('Email is required'),
  password: Yup.string().required('Password is required'),
  remember_me: Yup.bool()
})

export const forgotPwdSchema = Yup.object().shape({
  email: Yup.string().email('Email not valid').required('Email is required')
})

export default loginSchema

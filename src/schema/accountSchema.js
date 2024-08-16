import * as Yup from 'yup'

const passwordSchema = Yup.string()
  .test(
    'empty-or-8-characters-check',
    'Password must be at least 8 characters',
    (password) => !password || password.length >= 8
  )
  .matches(/^\S*$/, 'Whitespace is not allowed')

const coreSchema = {
  name: Yup.string(),
  email: Yup.string()
    .matches(/^[A-Z0-9.+_-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format')
    .test('email-valid', 'Invalid email format', function (value) {
      if (value) {
        const userName = value?.split('@')
        return (
          userName[0].replaceAll('.', '')?.length > 0 &&
          userName[0].replaceAll('-', '')?.length > 0 &&
          userName[0].replaceAll('+', '')?.length > 0
        )
      }
      return true
    }),
  surName: Yup.string(),
}

const accountSchema = Yup.object().shape({
  ...coreSchema,
  oldPassword: Yup.string(),
  password: Yup.string()
    .when('oldPassword', {
      is: (val) => !!val,
      then: Yup.string().required('New password required'),
      otherwise: () => Yup.string(),
    })
    .test(
      'passwords-match',
      'New Passwords must be different',
      function (value) {
        return this.parent.oldPassword
          ? this.parent.oldPassword !== value
          : true
      }
    )

    .concat(passwordSchema),
  confirmPassword: Yup.string()
    .when('oldPassword', {
      is: (val) => !!val,
      then: Yup.string().required('New password required'),
      otherwise: () => Yup.string(),
    })
    .concat(passwordSchema)
    .oneOf([Yup.ref('password'), null], 'Confirm passwords must match'),
})

export default accountSchema

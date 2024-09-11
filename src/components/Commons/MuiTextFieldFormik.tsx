import { Box, TextField } from '@mui/material'
import { FormikHandlers } from 'formik'

type PartialFormikHandlers = Pick<FormikHandlers, "handleChange" | "handleBlur">

interface Props extends PartialFormikHandlers {
  id: string
  disabled?: boolean
  required: boolean
  value: any
  name: string
  label: string
  touched: any
  errors: any
}

const MuiTextFieldFormik = ({
  disabled = false,
  required = false,
  id,
  handleChange,
  handleBlur,
  value,
  name,
  label,
  touched,
  errors
}: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id={id}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        required={required}
        disabled={disabled}
        name={name}
        label={label}
        fullWidth
        className={touched[name] && errors[name] ? 'error_input' : ''}
      />
      {touched[name] && errors[name] && (
        <span className="error_text">{errors[name]}</span>
      )}
    </Box>
  )
}

export default MuiTextFieldFormik

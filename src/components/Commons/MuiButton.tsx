import { CircularProgress } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'

type Props = {
  loading?: boolean
  children: React.ReactNode | string
} & ButtonProps

const MuiButton = (props: Props) => {
  return (
    <Button {...props}>
      {props.loading && (
        <CircularProgress
          size={14}
          sx={{ marginRight: 1 }}
        />
      )}
      {props.children}
    </Button>
  )
}

export default MuiButton

import Typography from '@mui/material/Typography'

const MuiMessage = ({
  message,
  error,
}: {
  message: string
  error: boolean
}) => {
  return (
    <Typography
      sx={{
        marginY: 1,
        fontSize: '14px',
        color: error ? 'var(--red)' : 'var(--blue)',
        marginBottom: 2,
      }}
    >
      {message}
    </Typography>
  )
}

export default MuiMessage

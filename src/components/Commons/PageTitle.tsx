import Typography from '@mui/material/Typography'

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Typography variant='h2' sx={{ marginY: 1 }}>{title}</Typography>
  )
}

export default PageTitle

import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

const PageTitle = ({ title, subTitle }: { title: string, subTitle?: string }) => {
  return (
    <Box display="flex" gap={2} alignItems="baseline">
      <Typography
        variant='h2'
        sx={{ marginY: 1 }}
      >
        {title}
      </Typography>
      {subTitle &&
        <Typography variant="h6" sx={{ color: 'var(--color-text-dark)' }}>
          {subTitle}
        </Typography>
      }
    </Box>
  )
}

export default PageTitle

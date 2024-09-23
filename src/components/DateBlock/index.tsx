import { Box, Typography } from '@mui/material'

import { format } from 'date-fns'

const DateBlock = () => {
  return (
    <Box>
      <Typography>Today {format(new Date(), 'dd.MM.yyyy')}</Typography>
    </Box>
  )
}

export default DateBlock

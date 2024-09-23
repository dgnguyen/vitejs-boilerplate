import React from 'react'

import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {
  minHeight?: BoxProps['minHeight']
  sx?: BoxProps['sx']
}

const EmptyData = ({ minHeight, sx }: Props) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight={minHeight || 300}
      sx={{
        ...sx,
        background: 'white',
      }}
    >
      <Typography
        color='gray'
        fontSize={24}
        sx={{
          textTransform: 'none',
        }}
      >
        No data to display...
      </Typography>
    </Box>
  )
}

export default EmptyData

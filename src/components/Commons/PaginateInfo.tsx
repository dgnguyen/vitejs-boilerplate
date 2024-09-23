import { Box, CircularProgress, Stack } from '@mui/material'

const PaginateInfo = ({
  currentView,
  totalCount,
  loading,
}: {
  currentView: number
  totalCount: number
  loading: boolean
}) => {
  return (
    <Stack
      display='flex'
      flexDirection='row'
      gap={1}
      justifyContent='start'
      marginY={1}
      width='100%'
      sx={{ fontWeight: 'bold' }}
    >
      <Box>Total Search Count : </Box>
      <Box>{loading ? <CircularProgress size={12} /> : totalCount}</Box>
      <Box> / </Box>
      <Box>Current View : </Box>
      <Box>{loading ? <CircularProgress size={12} /> : currentView}</Box>
    </Stack>
  )
}

export default PaginateInfo

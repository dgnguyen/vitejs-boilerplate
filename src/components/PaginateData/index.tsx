import { Box, CircularProgress, Stack } from '@mui/material'

const PaginateData = ({
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
      justifyContent='flex-end'
      marginY={1}
      width='100%'
    >
      <Box>Total Search Count : </Box>
      <Box>{loading ? <CircularProgress size={12} /> : totalCount}</Box>
      <Box> / </Box>
      <Box>Current View : </Box>
      <Box>{loading ? <CircularProgress size={12} /> : currentView}</Box>
    </Stack>
  )
}

export default PaginateData

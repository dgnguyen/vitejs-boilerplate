import { Box, TextField } from '@mui/material'

const AgentFilter = () => {
  return <Box className="agentFilter-wrapper">
    <TextField
      placeholder={`Search`}
      // onChange={handleSearchState}
      // value={searchState}
      // onKeyDown={(e: any) => {
      //   if (e.key === 'Enter' && !disableSearch) {
      //     handleSearchState(e)
      //   }
      // }}
      className='searchTextInput'
      sx={{ width: '250px' }}
    />
  </Box>
}

export default AgentFilter

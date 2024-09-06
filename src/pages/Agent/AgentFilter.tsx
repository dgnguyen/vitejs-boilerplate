import { Box, Select, TextField } from '@mui/material'

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
    {/* <FormControl variant="standard" fullWidth>
                          <Select
                            value={row.walletTypeId}
                            label="Wallet Type"
                            onChange={() => handleEditWalletType(row)}
                          >
                            {
                              walletTypeOptions.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl> */}
  </Box>
}

export default AgentFilter

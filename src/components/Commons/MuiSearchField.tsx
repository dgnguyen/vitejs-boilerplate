import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputBase, { InputBaseProps } from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
const MuiSearchField = (props: InputBaseProps) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 170,
        boxShadow: "none",
        border: "1px solid #c4c4c4"
      }}
    >
      <InputBase
        {...props}
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ 'aria-label': 'search text field' }}
      />
      <Box onClick={props?.onClick}>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
          <SearchIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default MuiSearchField

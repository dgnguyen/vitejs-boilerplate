import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { IAgent } from 'types/dashboard'
import { isTesterSelectOptions } from 'constants/filters'

const TesterSelect = ({
  isTester,
  disabled,
  handleChangeIsTester,
}: {
  isTester: string
  disabled?: boolean
  handleChangeIsTester: (event: SelectChangeEvent) => void
}) => {
  return (
    <Box className='select-wrapper'>
      <FormControl
        sx={{ m: 1, minWidth: 150 }}
        size='small'
      >
        <Select
          id='isTester-select'
          value={isTester}
          onChange={handleChangeIsTester}
          disabled={disabled}
        >
          {isTesterSelectOptions.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default TesterSelect

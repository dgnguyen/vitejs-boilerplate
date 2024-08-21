import { useFetchAgents } from 'hooks/useFetchAgents'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { IAgent } from 'types/dashboard'

type SelectProps = {
  label: string,
  value: number
}[]

const TesterSelect = ({ isTester, handleChangeIsTester }: {
  isTester: string,
  handleChangeIsTester: (event: SelectChangeEvent) => void
}) => {

  const isTestSelectOptions = [
    { value: 'false', label: 'Real' },
    { value: 'true', label: 'Test' },
    { value: 'null', label: 'Real & Test' }
  ]

  return (
    <Box className="select-wrapper">
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <Select
          id="tester-select"
          value={isTester}
          onChange={handleChangeIsTester}
        >
          {
            isTestSelectOptions.map((item, index) => (
              <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl >
    </Box >
  )
}

export default TesterSelect

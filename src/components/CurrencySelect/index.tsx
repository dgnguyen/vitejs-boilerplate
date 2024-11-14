import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

type Props = {
  currencySelected: string
  currenciesList: string[]
  handleChangeCurrency: (e: SelectChangeEvent) => void
  loading: boolean
  error: boolean
}
const CurrencySelect = ({ currenciesList, loading, error, currencySelected, handleChangeCurrency }: Props) => {
  return (
    <Box className="select-wrapper">
      <FormControl
        sx={{ m: 1, minWidth: 150 }}
        size='small'
      >
        <InputLabel id='select-currency-select-label'>Select agent</InputLabel>
        <Select
          labelId='select-currency-select-label'
          id='select-agents-select'
          value={currencySelected?.toString()}
          label='Select Currency'
          onChange={handleChangeCurrency}
          disabled={loading || error}
        >

          {currenciesList.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default CurrencySelect

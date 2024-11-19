import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

type Props = {
  currencySelected: string
  currenciesList: string[]
  handleChangeCurrency: (e: SelectChangeEvent) => void
  loading: boolean
  error: boolean
  required?: boolean
}
const CurrencySelect = ({ currenciesList, loading, error, currencySelected, handleChangeCurrency, required }: Props) => {
  const optionsCurrency = currenciesList.map((item) => (
    {
      label: item === 'all' ? "All" : item,
      value: item
    }
  ))

  return (
    <Box className="select-wrapper">
      <FormControl sx={{ width: 160 }}>
        <InputLabel id='select-currency-select-label'>
          {loading ? <CircularProgress size={14} /> : 'Select Currency'}
        </InputLabel>
        <Select
          name="currencySelect" // need for formik form
          labelId='select-currency-select-label'
          id='select-agents-select'
          value={currencySelected?.toString()}
          label='Select Currency'
          onChange={handleChangeCurrency}
          disabled={loading || error}
          required={required}
        >

          {optionsCurrency.map((item) => (
            <MenuItem
              key={item.value}
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

export default CurrencySelect

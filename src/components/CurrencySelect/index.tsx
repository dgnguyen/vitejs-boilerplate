import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

type Props = {
  currencySelected: string
  currenciesList: string[]
  handleChangeCurrency: (e: SelectChangeEvent) => void
  loading: boolean
  error: boolean
}
const CurrencySelect = ({ currenciesList, loading, error, currencySelected, handleChangeCurrency }: Props) => {
  const optionsCurrency = currenciesList.map((item) => (
    {
      label: item === 'all' ? "All" : item,
      value: item
    }
  )
  )

  return (
    <Box className="select-wrapper">
      <FormControl
        sx={{ m: 1, minWidth: 150 }}
        size='small'
      >
        <InputLabel id='select-currency-select-label'>Select currency</InputLabel>
        <Select
          labelId='select-currency-select-label'
          id='select-agents-select'
          value={currencySelected?.toString()}
          label='Select currency'
          onChange={handleChangeCurrency}
          disabled={loading || error}
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

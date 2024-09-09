import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { searchTypeAgent } from './helpers'
import { RootState, useAppDispatch } from 'redux/store'
import { useSelector } from 'react-redux'
import './style.scss'
import SearchSVG from 'assets/images/search.svg'
import { getAgentsListAction, setSearchValuesAgent } from 'redux/reducers/agent'
import { useState } from 'react'
import { Refresh } from '@mui/icons-material'
import ExportExcel from 'components/ExportExcel'
const AgentFilter = () => {
  const [state, setState] = useState('')
  const agentSelector = useSelector((state: RootState) => state.agent)
  const {
    loading,
    isExporting,
    searchValues: { searchType },
  } = agentSelector
  const dispatch = useAppDispatch()

  function handleChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setState(e.target.value)
    dispatch(setSearchValuesAgent({ value: e.target.value }))
  }

  function handleChangeSearchType(e: SelectChangeEvent) {
    dispatch(setSearchValuesAgent({ searchType: e.target.value }))
  }

  function handleSearch() {
    dispatch(getAgentsListAction())
  }



  return (
    <Box className='agentFilter-wrapper'>
      <TextField
        placeholder={`Search`}
        onChange={handleChangeSearchValue}
        value={state}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter' && !loading) {
            handleChangeSearchValue(e)
            handleSearch()
          }
        }}
        className='searchTextInput'
        sx={{ width: '250px' }}
      />
      <Typography>by</Typography>
      <FormControl
        variant='outlined'
        sx={{ width: 200 }}
      >
        <Select
          value={searchType.toString()}
          onChange={handleChangeSearchType}
        >
          {searchTypeAgent.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={handleSearch}
        disabled={loading}
        variant='contained'
      >
        <SearchSVG />
      </Button>
      <Box
        marginLeft='auto'
        display='flex'
        gap={2}
      >
        <Button
          variant='contained'
          data-testid='refreshAgent'
          onClick={handleSearch}
        >
          <Refresh />
        </Button>
        <ExportExcel
          id='export-excel-agent'
          disableSearch={isExporting}
        />
      </Box>
    </Box>
  )
}

export default AgentFilter

import { useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'

import SearchSVG from 'assets/images/search.svg'
import { SEARCH_TYPE_AGENT_BET_LIMIT } from 'constants/agent'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'
import { setPageAgent, setSearchValuesAgent } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'

import { searchTypeAgentBetLimitOptions } from './helpers'

const BetLimitFilter = () => {
  const [state, setState] = useState({
    value: '',
    searchType: 1,
  })

  const { searchType, value } = state

  function handleChangeState(key: string, value: string | number) {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const agentSelector = useSelector((state: RootState) => state.agent)
  const { loading, isExporting } = agentSelector
  const dispatch = useAppDispatch()

  function handleChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    handleChangeState('value', e.target.value)
  }

  function handleChangeSearchType(e: SelectChangeEvent) {
    handleChangeState('searchType', e.target.value)
  }

  function handleSearch() {
    dispatch(setPageAgent(1))
    dispatch(setSearchValuesAgent(state))
  }

  return (
    <Box
      display='flex'
      gap={2}
    >
      {[
        SEARCH_TYPE_AGENT_BET_LIMIT.MIN_BET,
        SEARCH_TYPE_AGENT_BET_LIMIT.MAX_BET,
      ].includes(searchType) ? (
        <FormControl>
          <NumericFormat
            value={value}
            placeholder={`Search`}
            customInput={TextField}
            thousandSeparator
            onChange={handleChangeSearchValue}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && !loading) {
                handleChangeSearchValue(e)
                handleSearch()
              }
            }}
            className='searchTextInput'
            sx={{ width: '250px' }}
          />
        </FormControl>
      ) : (
        <TextField
          placeholder={`Search`}
          onChange={handleChangeSearchValue}
          value={value}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter' && !loading) {
              handleChangeSearchValue(e)
              handleSearch()
            }
          }}
          className='searchTextInput'
          sx={{ width: '250px' }}
        />
      )}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id='select-search-type-agent-betlimit'>
          Search Type
        </InputLabel>
        <Select
          labelId='select-search-type-agent-betlimit'
          id='select-searchType-agentBetLimit'
          value={searchType.toString()}
          label='Search Type'
          onChange={handleChangeSearchType}
        >
          {searchTypeAgentBetLimitOptions.map((item) => (
            <MenuItem
              key={item.label}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={handleSearch}
        disabled={loading || isExporting}
        variant='contained'
      >
        <SearchSVG />
      </Button>
    </Box>
  )
}

export default BetLimitFilter

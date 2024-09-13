import { Box, Button, TextField } from '@mui/material'
import SearchSVG from 'assets/images/search.svg'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getHistoryChangeBetLimitAction,
  setSearchValuesAgent,
} from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'

const BetLimitFilter = () => {
  const [state, setState] = useState('')
  const agentSelector = useSelector((state: RootState) => state.agent)
  const { loading, isExporting } = agentSelector
  const dispatch = useAppDispatch()

  function handleChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setState(e.target.value)
    dispatch(setSearchValuesAgent({ value: e.target.value }))
  }

  function handleSearch() {
    dispatch(getHistoryChangeBetLimitAction())
  }
  return (
    <Box
      display='flex'
      gap={2}
    >
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

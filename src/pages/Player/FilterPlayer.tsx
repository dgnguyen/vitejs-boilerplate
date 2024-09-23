import { useEffect, useState } from 'react'

import { Refresh } from '@mui/icons-material'
import { Box, Button, SelectChangeEvent, TextField } from '@mui/material'

import SearchSVG from 'assets/images/search.svg'
import AgentSelect from 'components/AgentSelect'
import MuiSearchField from 'components/Commons/MuiSearchField'
import ExportExcel from 'components/ExportExcel'
import TesterSelect from 'components/TesterSelect'
import { isSuperAdmin } from 'helpers/auth'
import { useSelector } from 'react-redux'
import {
  getPlayersAction,
  resetPlayersState,
  setAndLoadPlayersData,
  setSearchValuesPlayer,
} from 'redux/reducers/player'
import { RootState, useAppDispatch } from 'redux/store'

const FilterPlayer = () => {
  const { searchValues, isLoadingData, isLoadingPage } =
    useSelector((state: RootState) => state.player)
  const dispatch = useAppDispatch()
  const { isTester, id, agentSelected } = searchValues
  const disableSearch = isLoadingData || isLoadingPage
  const [searchState, setSearchState] = useState<string>('')

  useEffect(() => {
    setSearchState(id)
  }, [id])

  const handleSearchState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value)
  }

  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(
      setSearchValuesPlayer({ key: 'agentSelected', val: event.target.value })
    )
  }

  const handleChangeAgentName = (val?: string) => {
    dispatch(setSearchValuesPlayer({ key: 'agentSelectedName', val: val || '' }))
  }

  const handleChangeIsTester = (event: SelectChangeEvent) => {
    dispatch(setAndLoadPlayersData('isTester', event.target.value, true))
  }

  const handleSearch = async () => {
    dispatch(setSearchValuesPlayer({ key: 'id', val: searchState }))
    try {
      await dispatch(setAndLoadPlayersData('page', 1))
    } catch (e) {
      console.error(e, 'handleSearch')
    }
  }

  function handleRefresh() {
    dispatch(handleSearch)
  }

  async function resetFilter() {
    setSearchState('')
    await dispatch(resetPlayersState())
    await dispatch(getPlayersAction())
  }

  useEffect(
    () => () => {
      dispatch(resetPlayersState())
    },
    []
  )

  return (
    <Box className='filter-wrapper'>
      <MuiSearchField
        placeholder='Search by Agent Player ID'
        onChange={handleSearchState}
        value={searchState}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter' && !disableSearch) {
            handleSearchState(e)
            handleSearch()
          }
        }}
        className='searchTextInput bgWhite'
        sx={{ width: '260px' }}
      />
      {isSuperAdmin() && (
        <AgentSelect
          agentSelected={agentSelected === null ? 'all' : agentSelected}
          handleChange={handleChangeAgent}
          cb={handleChangeAgentName}
        />
      )}
      <TesterSelect
        isTester={isTester}
        handleChangeIsTester={handleChangeIsTester}
      />
      <Button
        onClick={handleSearch}
        disabled={disableSearch}
        variant='contained'
      >
        <SearchSVG />
      </Button>
      <Button
        variant='contained'
        data-testid='resetFilterPlayer'
        onClick={resetFilter}
      >
        Reset
      </Button>
      <Box
        marginLeft='auto'
        display='flex'
        gap={2}
      >
        <Button
          variant='contained'
          data-testid='refreshTransactions'
          onClick={handleRefresh}
        >
          <Refresh />
        </Button>
        <ExportExcel
          id='export-excel-players'
          disableSearch={disableSearch}
        />
      </Box>
    </Box>
  )
}

export default FilterPlayer

import { Refresh } from '@mui/icons-material'
import { Box, Button, SelectChangeEvent, TextField } from '@mui/material'
import AgentSelect from 'components/AgentSelect'
import ExportExcel from 'components/ExportExcel'
import TesterSelect from 'components/TesterSelect'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getPlayersAction,
  resetPlayersState,
  setAndLoadPlayersData,
  setSearchValuesPlayer,
} from 'redux/reducers/player'
import { AppDispatch, RootState, useAppDispatch } from 'redux/store'
import SearchSVG from 'assets/images/search.svg'

const FilterPlayer = () => {
  const { searchValues, isLoadingData, isLoadingPage, data, hasMore } =
    useSelector((state: RootState) => state.player)
  const dispatch = useAppDispatch()
  const { agentSelected, isTester, id } = searchValues
  const disableSearch = isLoadingData || isLoadingPage
  const [searchState, setSearchState] = useState<string>('')

  useEffect(() => {
    setSearchState(id)
  }, [id])


  const handleSearchState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value)
  }

  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(setSearchValuesPlayer({ key: 'agentSelected', val: event.target.value }))
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
      <TextField
        placeholder={`Search by player ID`}
        onChange={handleSearchState}
        value={searchState}
        // onKeyDown={(e: any) => {
        //   if (e.key === 'Enter' && !disableSearch) {
        //     handleSearchState(e)
        //   }
        // }}
        className='searchTextInput bgWhite'
        sx={{ width: '250px' }}
      />
      {isSuperAdminOrAdmin() && (
        <AgentSelect
          handleChange={handleChangeAgent}
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

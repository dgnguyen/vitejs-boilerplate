import { Refresh } from '@mui/icons-material'
import { Box, Button, SelectChangeEvent, TextField } from '@mui/material'
import AgentSelect from 'components/AgentSelect'
import ExportExcel from 'components/ExportExcel'
import TesterSelect from 'components/TesterSelect'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { resetFilter, setFilter } from 'redux/reducers/filter'
import {
  setAndLoadPlayersData,
  setIsTesterPlayer,
  setSearchValues,
  setSelectAgent,
} from 'redux/reducers/player'
import { RootState, useAppDispatch } from 'redux/store'
import SearchSVG from 'assets/images/search.svg'

const FilterPlayer = () => {
  const { searchValues, isLoadingData, isLoadingPage, data, hasMore } =
    useSelector((state: RootState) => state.player)
  const dispatch = useAppDispatch()
  const { inputRef, height } = useSetHeightInfiniteScroll()
  const { agentSelected, isTester } = searchValues
  const disableSearch = isLoadingData || isLoadingPage
  const [searchState, setSearchState] = useState<string>('')

  const handleSearchState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value)
  }

  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(setFilter({ key: 'agentSelected', val: event.target.value }))
  }

  const handleChangeIsTester = (event: SelectChangeEvent) => {
    dispatch(setFilter({ key: 'isTester', val: event.target.value }))
  }

  const handleSearch = async () => {
    dispatch(setFilter({ key: 'playerId', val: searchState }))
    try {
      await dispatch(setAndLoadPlayersData('page', 1))
    } catch (e) {
      console.error(e, 'handleSearch')
    }
  }

  function handleRefresh() {
    dispatch(handleSearch)
  }

  useEffect(
    () => () => {
      dispatch(resetFilter())
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
          agentSelected={agentSelected}
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

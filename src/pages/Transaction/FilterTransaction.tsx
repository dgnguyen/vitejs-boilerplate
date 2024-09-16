import { useEffect } from 'react'

import { Refresh } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

import SearchSVG from 'assets/images/search.svg'
import DataPicker from 'components/DataPicker'
import ExportExcel from 'components/ExportExcel'
import TesterSelect from 'components/TesterSelect'
import { searchTypeOptions, TRStatusSelectOptions } from 'helpers/transaction'
import useTopDataSearchBar from 'hooks/useTopDataSearchBar'
import { useSelector } from 'react-redux'
import {
  setSearchValue,
  transactionSearchValuesSelector,
} from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'

const FilterTransaction = ({ playerId }: { playerId?: string }) => {
  const dispatch = useAppDispatch()
  const isPageTransactionPlayer = !!playerId

  const searchValues = useSelector(transactionSearchValuesSelector)
  const { searchType, isTester, date, TransactionStatus } = searchValues

  const {
    disableSearch,
    searchState,
    toggleDatePickerReset,
    handleSearchState,
    handleChangeIsTester,
    handleChangeStatus,
    handleChangeSearchType,
    handleSearch,
    resetFilter,
    handleDateChange,
  } = useTopDataSearchBar()

  function handleRefresh() {
    dispatch(handleSearch)
  }

  useEffect(() => {}, [])

  return (
    <Box>
      <Box className='filter-wrapper'>
        {!isPageTransactionPlayer && (
          <>
            <TextField
              placeholder={`Search by ${searchTypeOptions.find((item) => item.value === searchType)?.label}`}
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

            <Select
              value={searchType.toString()}
              onChange={handleChangeSearchType}
              className='bgWhite'
            >
              {searchTypeOptions.map((searchType) => (
                <MenuItem
                  key={searchType.value}
                  value={searchType.value}
                >
                  {searchType.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        <DataPicker
          key={`datapickerFromTransaction`}
          changeHandler={handleDateChange}
          initialSetDate={date}
          oneMonthSelection
          reset={toggleDatePickerReset}
          disabled={disableSearch}
        />
        <Box className='select-wrapper'>
          <FormControl
            sx={{ m: 1, minWidth: 150 }}
            size='small'
          >
            <Select
              value={TransactionStatus.toString()}
              onChange={handleChangeStatus}
              disabled={disableSearch}
            >
              {TRStatusSelectOptions.map((status) => (
                <MenuItem value={status.value}>{status.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {!isPageTransactionPlayer && (
          <TesterSelect
            isTester={isTester}
            handleChangeIsTester={handleChangeIsTester}
          />
        )}
        <Button
          onClick={handleSearch}
          disabled={disableSearch}
          variant='contained'
        >
          <SearchSVG />
        </Button>
        {!isPageTransactionPlayer && (
          <Button
            variant='contained'
            data-testid='resetFilterTransaction'
            onClick={resetFilter}
          >
            Reset
          </Button>
        )}
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
            id={
              isPageTransactionPlayer
                ? 'export-excel-specific-player-transactions'
                : 'export-excel-transactions'
            }
            disableSearch={disableSearch}
            optionalData={{
              startDate: date.startDate,
              endDate: date.endDate,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default FilterTransaction

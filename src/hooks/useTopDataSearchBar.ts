import { SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  resetFilterAndLoadData,
  resetSearchValues,
  setAndLoadData,
  setSearchValue,
  transactionIsLoadingSelector,
  transactionIsPageLoadingSelector,
  transactionSearchValuesSelector,
} from 'redux/reducers/transaction'
import { loadingLogin } from 'redux/reducers/user'
import { useAppDispatch } from 'redux/store'
import { DateRange } from 'types/transaction'

export default function useTopDataSearchBar() {
  const dispatch = useAppDispatch()
  const searchValues = useSelector(transactionSearchValuesSelector)
  const { date, searchType, isTester } = searchValues

  const [searchState, setSearchState] = useState<string>('')

  const loginIsLoading = useSelector(loadingLogin)
  const loadingPage = useSelector(transactionIsPageLoadingSelector)
  const loadingTransactions = useSelector(transactionIsLoadingSelector)
  const disableSearch = loginIsLoading || loadingPage || loadingTransactions

  const handleSearchState = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const re = /^[0-9\b]+$/
    // if (e.target.value === '' || re.test(e.target.value)) {
    // if (typeof e === 'string') setSearchState(e)
    setSearchState(e.target.value)
    // }
  }

  const [toggleDatePickerReset, setToggleDatePickerReset] = useState(false)

  // useEffect(() => {
  //   dispatch(resetSearchValues())
  //   dispatch(setAndLoadData('selectedGameType', selectGame))
  // }, [selectedAllGames])

  const handleDateChange = async (
    startDate?: Date | string,
    endDate?: Date | string
  ) => {
    try {
      const dateRange = {
        startDate,
        endDate,
      } as DateRange
      await dispatch(setAndLoadData('date', dateRange, true))
    } catch (e) {
      console.error(e, 'loadMore')
    }
  }
  const resetFilter = async () => {
    try {
      setToggleDatePickerReset(!toggleDatePickerReset)
      dispatch(resetFilterAndLoadData())
      setSearchState('')
    } catch (e) {
      console.error(e, '')
    }
  }

  const handleSearch = async () => {
    dispatch(setSearchValue({ key: 'id', val: searchState }))
    try {
      await dispatch(setAndLoadData('page', 1))
    } catch (e) {
      console.error(e, 'handleSearch')
    }
  }

  const handleChangeSearchType = (event: SelectChangeEvent) => {
    if (!searchState) {
      dispatch(setSearchValue({ key: 'searchType', val: event.target.value }))
      return
    }
    dispatch(setSearchValue({ key: 'id', val: searchState }))
    dispatch(setAndLoadData('searchType', searchType, true))
  }

  const handleChangeStatus = (event: SelectChangeEvent) => {
    dispatch(setSearchValue({ key: 'id', val: searchState }))
    dispatch(setAndLoadData('TransactionStatus', event.target.value, true))
  }

  const handleChangeIsTester = (event: SelectChangeEvent) => {
    dispatch(setSearchValue({ key: 'id', val: searchState }))
    dispatch(setAndLoadData('isTester', event.target.value, true))
  }

  return {
    searchType,
    isTester,
    date,
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
  }
}

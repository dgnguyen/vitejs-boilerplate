import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import DataPicker from 'components/DataPicker'
import TesterSelect from 'components/TesterSelect'
import SearchSVG from "assets/images/search.svg"
import { useAppDispatch } from 'redux/store'
import { useSelector } from 'react-redux'
import { transactionSearchValuesSelector } from 'redux/reducers/transaction'
import useTopDataSearchBar from 'hooks/useTopDataSearchBar'
import { searchTypeOptions, TRStatusSelectOptions } from 'helpers/transaction'
import { Refresh } from "@mui/icons-material"
import ExportExcel from 'components/ExportExcel'

const FilterTransaction = () => {
  const dispatch = useAppDispatch()

  const searchValues = useSelector(transactionSearchValuesSelector)
  const { id, searchType, isTester, date, TransactionStatus, selectedGameType, selectedAllGames, agentSelected } = searchValues

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

  return (
    <Box>
      <Box className="filter-wrapper">
        <TextField
          // inputMode="numeric"
          // pattern="[0-9]*"
          // className={styles.search_input}
          // type="number"
          // min={1}
          // step={1}
          placeholder={'Search by ID'}
          onChange={handleSearchState}
          value={searchState}

          // onKeyDown={e => {
          //   if (e.key === 'Enter' && !disableSearch) {
          //     handleSearch()
          //   }
          // }}
          className='searchTextInput bgWhite'
          sx={{ width: '160px' }}
        />
        <Select
          // style={{ width: '190px' }}
          value={searchType.toString()}

          onChange={handleChangeSearchType}
          className='bgWhite'
        >
          {searchTypeOptions.map(searchType => (
            <MenuItem key={searchType.value} value={searchType.value}>
              {searchType.label}
            </MenuItem>
          ))}
        </Select>
        <DataPicker
          key={`datapickerFromTransaction`}
          changeHandler={handleDateChange}
          initialSetDate={date}
          oneMonthSelection
          reset={toggleDatePickerReset}
          disabled={disableSearch}
        />
        {/* <Select
          value={TransactionStatus}
          options={TRStatusSelectOptions}
          onChange={handleChangeStatus}
          disabled={disableSearch}
          style={{ width: '90px' }}
        />
        <TesterSelect
          isTester={isTester}
          handleChangeIsTester={handleChangeIsTester}
        /> */}
        <Button
          // buttonStyle={'secondary'}
          // className={styles.trans_btn_search}
          onClick={handleSearch}
          disabled={disableSearch}
          variant='contained'
        // svgOnly={true}
        >
          <SearchSVG />
        </Button>
        <Button variant="contained" data-testid="resetFilterTransaction" onClick={resetFilter}>
          Reset
        </Button>
        <Box marginLeft="auto" display="flex" gap={2}>
          <Button variant="contained" data-testid="refreshTransactions" onClick={handleRefresh}>
            <Refresh />
          </Button>
          <ExportExcel
            id="export-excel-dashboard"
            disableSearch={disableSearch}
            optionalData={{
              startDate: date.startDate,
              endDate: date.endDate
            }}
          />
        </Box>
      </Box>

    </Box>
  )
}

export default FilterTransaction

import { Box, SelectChangeEvent, TextField } from '@mui/material'
import AgentSelect from 'components/AgentSelect'
import TesterSelect from 'components/TesterSelect'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import useSetHeightInfiniteScroll from 'hooks/useSetHeightInfiniteScroll'
import { useSelector } from 'react-redux'
import { setIsTesterPlayer, setSearchValues, setSelectAgent } from 'redux/reducers/player'
import { RootState, useAppDispatch } from 'redux/store'

const FilterPlayer = () => {
  const {
    searchValues,
    isLoadingData,
    isLoadingPage,
    data,
    hasMore
  } = useSelector((state: RootState) => state.player)
  const dispatch = useAppDispatch()
  const { inputRef, height } = useSetHeightInfiniteScroll()
  const { agentSelected, isTester } = searchValues

  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(setSelectAgent(event.target.value))
  }

  const handleChangeIsTester = (event: SelectChangeEvent) => {
    dispatch(setIsTesterPlayer(event.target.value))
  }

  return (
    <Box className="filter-wrapper">
      <TextField
        placeholder={`Search by player ID`}
        // onChange={handleSearchState}
        // value={searchState}
        // onKeyDown={(e: any) => {
        //   if (e.key === 'Enter' && !disableSearch) {
        //     handleSearchState(e)
        //   }
        // }}
        className='searchTextInput bgWhite'
        sx={{ width: '250px' }}
      />
      {
        isSuperAdminOrAdmin() &&
        <AgentSelect
          agentSelected={agentSelected}
          handleChange={handleChangeAgent}
        />
      }
      <TesterSelect
        isTester={isTester}
        handleChangeIsTester={handleChangeIsTester}
      />
    </Box>
  )
}

export default FilterPlayer

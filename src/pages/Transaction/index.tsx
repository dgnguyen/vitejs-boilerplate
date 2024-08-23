import { Box } from '@mui/material'
import GameSelect from 'components/GameSelect'
import { useSelector } from 'react-redux'
import { setSearchValue, transactionIsLoadingSelector, transactionIsPageLoadingSelector, transactionSearchValuesSelector } from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'

const Transaction = () => {
  const searchValues = useSelector(transactionSearchValuesSelector)
  const dispatch = useAppDispatch()
  const { selectedAllGames } = searchValues
  const transactionLoading = useSelector(transactionIsLoadingSelector)
  const transactionPageLoading = useSelector(transactionIsPageLoadingSelector)

  function setSelectedAllGames(selected: string | null) {
    dispatch(setSearchValue({ key: "selectedAllGames", val: !!(selected === "all") }))
  }

  const handleSelectGame = (newSelectedGames: any) => {
    dispatch(setSearchValue({ key: "selectedGameType", val: newSelectedGames }))
  }

  return (
    <Box>
      <GameSelect
        setSelectedAllGames={setSelectedAllGames}
        selectedAllGames={selectedAllGames}
        disabled={transactionLoading || transactionPageLoading}
        handleSelectGame={handleSelectGame}
      />
    </Box>
  )
}

export default Transaction

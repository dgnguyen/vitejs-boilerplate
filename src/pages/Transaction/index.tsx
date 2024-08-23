import { Box, SelectChangeEvent, Typography } from '@mui/material'
import AgentSelect from 'components/AgentSelect'
import DateBlock from 'components/DateBlock'
import GameSelect from 'components/GameSelect'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import { useSelector } from 'react-redux'
import { setAgentTransaction, setSearchValue, transactionIsLoadingSelector, transactionIsPageLoadingSelector, transactionSearchValuesSelector } from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'

const Transaction = () => {
  const searchValues = useSelector(transactionSearchValuesSelector)
  const dispatch = useAppDispatch()
  const { agentSelected, selectedAllGames } = searchValues
  const transactionLoading = useSelector(transactionIsLoadingSelector)
  const transactionPageLoading = useSelector(transactionIsPageLoadingSelector)


  function setSelectedAllGames(selected: string | null) {
    dispatch(setSearchValue({ key: "selectedAllGames", val: !!(selected === "all") }))
  }

  const handleSelectGame = (newSelectedGames: any) => {
    dispatch(setSearchValue({ key: "selectedGameType", val: newSelectedGames }))
  }


  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(setAgentTransaction(event.target.value))
  }


  return (
    <Box>
      <Typography variant='h2'>Transaction</Typography>
      <GameSelect
        setSelectedAllGames={setSelectedAllGames}
        selectedAllGames={selectedAllGames}
        disabled={transactionLoading || transactionPageLoading}
        handleSelectGame={handleSelectGame}
      />
      <Box display="flex" gap={2} alignItems="center">
        <DateBlock />
        {
          isSuperAdminOrAdmin() &&
          <AgentSelect
            agentSelected={agentSelected}
            handleChange={handleChangeAgent}
          />
        }
      </Box>
    </Box>
  )
}

export default Transaction

import { Box, SelectChangeEvent, Typography } from '@mui/material'
import AgentSelect from 'components/AgentSelect'
import DateBlock from 'components/DateBlock'
import GameSelect from 'components/GameSelect'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import { useSelector } from 'react-redux'
import {
  setAgentTransaction,
  setAndLoadData,
  setSearchValue,
  transactionIsLoadingSelector,
  transactionIsPageLoadingSelector,
  transactionSearchValuesSelector,
} from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'
import FilterTransaction from './FilterTransaction'
import './style.scss'
import TransactionContent from './TransactionContent'
import PageTitle from 'components/Commons/PageTitle'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Transaction = () => {
  const { playerId, isTester } = useParams()
  const isPageTransactionPlayer = !!playerId
  const dispatch = useAppDispatch()

  const searchValues = useSelector(transactionSearchValuesSelector)
  const { agentSelected, selectedAllGames } = searchValues
  const transactionLoading = useSelector(transactionIsLoadingSelector)
  const transactionPageLoading = useSelector(transactionIsPageLoadingSelector)

  function setSelectedAllGames(selected: string | null) {
    dispatch(
      setSearchValue({ key: 'selectedAllGames', val: !!(selected === 'all') })
    )
  }

  const handleSelectGame = (newSelectedGames: any) => {
    dispatch(setAndLoadData('selectedGameType', newSelectedGames, true))
  }

  const handleChangeAgent = (event: SelectChangeEvent) => {
    dispatch(setAndLoadData('agentSelected', event.target.value, true))
  }

  return (
    <Box>
      <PageTitle title='Transaction' subTitle={isPageTransactionPlayer ? `Player Id: ${playerId} / Is Test: ${isTester ? "No" : "Yes"}` : ""} />

      <GameSelect
        setSelectedAllGames={setSelectedAllGames}
        selectedAllGames={selectedAllGames}
        disabled={transactionLoading || transactionPageLoading}
        handleSelectGame={handleSelectGame}
      />
      <Box
        display='flex'
        gap={2}
        alignItems='center'
      >
        <DateBlock />
        {isSuperAdminOrAdmin() && (
          <AgentSelect
            agentSelected={agentSelected}
            handleChange={handleChangeAgent}
          />
        )}
      </Box>
      <FilterTransaction playerId={playerId} />
      <TransactionContent playerId={playerId} />
    </Box>
  )
}

export default Transaction

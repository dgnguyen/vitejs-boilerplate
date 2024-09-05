import { Box, SelectChangeEvent, Typography } from '@mui/material'
import AgentSelect from 'components/AgentSelect'
import DateBlock from 'components/DateBlock'
import GameSelect from 'components/GameSelect'
import { isSuperAdminOrAdmin } from 'helpers/auth'
import { useSelector } from 'react-redux'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  resetSearchValues,
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
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from 'constants/endpoint'
import { useEffect } from 'react'

const Transaction = () => {
  const { playerId, isTester } = useParams()
  const isPageTransactionPlayer = !!playerId
  const dispatch = useAppDispatch()
  const location = useLocation()

  const searchValues = useSelector(transactionSearchValuesSelector)
  const { selectedAllGames } = searchValues
  const transactionLoading = useSelector(transactionIsLoadingSelector)
  const transactionPageLoading = useSelector(transactionIsPageLoadingSelector)
  const navigate = useNavigate()

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

  useEffect(() => {
    return () => {
      dispatch(resetSearchValues())
    }
  }, [])

  function backToPlayerWithPreviousSearch() {
    navigate(ROUTES.PLAYER, {
      state: {
        searchValues: location?.state?.searchValues,
      },
    })
  }

  return (
    <Box>
      <Box
        display='flex'
        alignItems='center'
      >
        {isPageTransactionPlayer && (
          <ChevronLeftIcon
            onClick={backToPlayerWithPreviousSearch}
            color='primary'
            fontSize='large'
            sx={{ cursor: 'pointer', marginLeft: -1 }}
          />
        )}
        <PageTitle
          title='Transaction'
          subTitle={
            isPageTransactionPlayer
              ? `Player Id: ${playerId} / Is Test: ${isTester ? 'No' : 'Yes'}`
              : ''
          }
        />
      </Box>
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
          <AgentSelect handleChange={handleChangeAgent} />
        )}
      </Box>
      <FilterTransaction playerId={playerId} />
      <TransactionContent playerId={playerId} />
    </Box>
  )
}

export default Transaction

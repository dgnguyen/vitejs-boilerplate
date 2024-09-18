import { useEffect, useState } from 'react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Box, SelectChangeEvent, Typography } from '@mui/material'

import AgentSelect from 'components/AgentSelect'
import PageTitle from 'components/Commons/PageTitle'
import DateBlock from 'components/DateBlock'
import GameSelect from 'components/GameSelect'
import Switch from 'components/Switch'
import { FORMAT_DATE } from 'constants/date'
import { ROUTES } from 'constants/endpoint'
import { isSuperAdmin } from 'helpers/auth'
import isEqual from 'lodash/isEqual'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  resetSearchValues,
  setAndLoadData,
  setMultiSearchLoadTransaction,
  setSearchValue,
  transactionIsLoadingSelector,
  transactionIsPageLoadingSelector,
  transactionSearchValuesSelector,
} from 'redux/reducers/transaction'
import { useAppDispatch } from 'redux/store'

import FilterTransaction from './FilterTransaction'
import TransactionContent from './TransactionContent'

import './style.scss'

const Transaction = () => {
  const { playerId, isTester } = useParams()
  const isPageTransactionPlayer = !!playerId
  const dispatch = useAppDispatch()
  const location = useLocation()

  const searchValues = useSelector(transactionSearchValuesSelector)
  const { selectedAllGames, agentSelected, date } = searchValues
  const [checkAllTransaction, setCheckAllTransaction] = useState(false)

  const checkedAllTransactionsPlayer = isEqual(date, location?.state?.dateRange)
  const transactionLoading = useSelector(transactionIsLoadingSelector)
  const transactionPageLoading = useSelector(transactionIsPageLoadingSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (isPageTransactionPlayer && checkedAllTransactionsPlayer) {
      setCheckAllTransaction(true)
    } else {
      setCheckAllTransaction(false)
    }
  }, [isPageTransactionPlayer, checkedAllTransactionsPlayer])

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

  const handleChangeAgentName = (val?: string) => {
    dispatch(setSearchValue({ key: 'agentSelectedName', val: val || '' }))
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

  function toggleCheckAllTransactionsPlayer() {
    if (checkAllTransaction) {
      const updatedArraySearchValues = [
        {
          date: {
            startDate: moment(new Date()).format(FORMAT_DATE),
            endDate: moment(new Date()).format(FORMAT_DATE),
          },
        },
      ]
      dispatch(setMultiSearchLoadTransaction(updatedArraySearchValues, true))
    } else {
      const updatedArraySearchValues = [
        {
          date: location?.state?.dateRange,
        },
      ]
      dispatch(setMultiSearchLoadTransaction(updatedArraySearchValues, true))
    }
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
              ? `Player Id: ${playerId} / Is Test: ${isTester === 'test' ? 'Yes' : 'No'}`
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
        {isPageTransactionPlayer && (
          <Box
            display='flex'
            gap={1}
          >
            <Switch
              isChecked={checkAllTransaction}
              onChange={toggleCheckAllTransactionsPlayer}
            />
            <Typography>Show all transactions of this player</Typography>
          </Box>
        )}
        {isSuperAdmin() && !isPageTransactionPlayer && (
          <AgentSelect
            agentSelected={agentSelected}
            handleChange={handleChangeAgent}
            cb={handleChangeAgentName}
          />
        )}
      </Box>
      <FilterTransaction playerId={playerId} />
      <TransactionContent
        playerId={playerId}
        isTester={isTester}
      />
    </Box>
  )
}

export default Transaction

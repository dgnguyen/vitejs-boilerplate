import { useEffect, useState } from 'react'

import { SelectChangeEvent } from '@mui/material'

import { API_ENDPOINT } from 'api/endpoint'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { CATEGORY_GAME } from 'constants/games'
import { useGames } from 'context/GamesContext'
import { GamesProps } from 'context/GamesContext'
import { IMarketStat } from 'types/market'

type FilterProps = {
  isTester: string
  isNextRound: string
  gameType: number
  agent: string | number
}

export type DataMarketStat = {
  allMarkets: IMarketStat[]
  roundId: number
  total: number
}

export type MarketStatProps = {
  loading: boolean
  data: DataMarketStat
  error: string | undefined
  filter: FilterProps
  handleFilter: (key: string, event: SelectChangeEvent) => void
  handleSearch: () => Promise<void>
  handleSelectGame: (value: string | number) => void
  isRunningBallGame: boolean
  gamesList: GamesProps[]
  handleChangeAgent: (e: SelectChangeEvent) => void
}

export function useMarketStats(): MarketStatProps {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const { gamesList } = useGames()

  const [filterMarket, setFilterMarket] = useState<FilterProps>({
    isTester: 'false',
    isNextRound: 'false',
    gameType: gamesList[0].id,
    agent: 'all',
  })

  const checkIsRunningBallGame = (gameType: number) => {
    const gameInfo = gamesList.find(
      item => item.id === gameType
    ) as GamesProps
    return gameInfo?.category === CATEGORY_GAME.RUNNING_BALL
  }

  const handleFilter = (key: string, event: SelectChangeEvent) =>
    setFilterMarket((prevState: FilterProps) => ({
      ...prevState,
      [key]: event.target.value,
    }))

  const isRunningBallGame = checkIsRunningBallGame(filterMarket?.gameType)

  function handleSelectGame(value: string | number) {
    setFilterMarket((prevState: any) => ({
      ...prevState,
      gameType: value,
    }))
  }

  function handleChangeAgent(e: SelectChangeEvent) {
    setFilterMarket((prevState: FilterProps) => ({
      ...prevState,
      agent: e.target.value,
    }))
  }

  async function fetchStatisticMarket() {
    setLoading(true)
    try {
      const response: AxiosResponse = await axios.post(
        API_ENDPOINT.GET_MARKET_STATS,
        {
          gameTypeId: filterMarket?.gameType,
          ...(filterMarket?.agent !== 'all'
            ? { partnerId: filterMarket?.agent }
            : {}),
          ...(filterMarket?.isTester !== 'null'
            ? { isTester: filterMarket?.isTester === 'true' }
            : {}),
          ...(filterMarket?.isNextRound !== 'null' && isRunningBallGame
            ? { isNextRound: filterMarket?.isNextRound === 'true' }
            : {}),
        }
      )
      const { data, isSuccess, message } = response?.data || null
      setData(data)
      if (!isSuccess) setError(message)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error : Please try again')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch() {
    await fetchStatisticMarket()
  }

  useEffect(() => {
    fetchStatisticMarket()
  }, [filterMarket])

  return {
    loading,
    data,
    error,
    filter: filterMarket,
    handleFilter,
    handleSearch,
    handleSelectGame,
    isRunningBallGame,
    gamesList,
    handleChangeAgent,
  }
}

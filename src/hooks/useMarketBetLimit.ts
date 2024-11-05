import { useEffect, useState } from 'react'

import { SelectChangeEvent } from '@mui/material'

import { API_ENDPOINT } from 'api/endpoint'
import axios, {AxiosResponse } from 'axios'
import { useGames } from 'context/GamesContext'
import { GamesProps } from 'context/GamesContext'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'redux/hooks'
import { setSearchValuesMarket } from 'redux/reducers/market'
import { RootState } from 'redux/store'
import { IMarketBetLimit } from 'types/market'

import { useFetchAgents } from './useFetchAgents'

export type FilterProps = {
  gameTypeId: number
  partnerId: string | number | null
}

export type DataMarketBetLimit = {
  allMarkets: IMarketBetLimit[]
  currency: string
  total: number
}

export type MarketBetLimitProps = {
  loading: boolean
  data: DataMarketBetLimit
  error: string | undefined
  filter: FilterProps
  handleFilter: (key: string, event: SelectChangeEvent) => void
  handleSearch: () => Promise<void>
  handleSelectGame: (value: string | number) => void
  gamesList: GamesProps[]
}

export function useMarketBetLimit(): MarketBetLimitProps {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const { agents, loadingAgents } = useFetchAgents()
  const marketSettingsSelector = useSelector((state: RootState) => state.market)
  const dispatch = useAppDispatch()
  const { agent } = marketSettingsSelector.searchValues
  const { gamesList } = useGames()

  const [filterMarket, setFilterMarket] = useState<FilterProps>({
    gameTypeId: gamesList[0].id,
    partnerId: null
  })

  useEffect(() => {
    if (!loadingAgents && agents.length > 0) {
      const defaultAgentId = agent !== null ? agent : agents[0].id
      setFilterMarket((prevState) => ({
        ...prevState,
        partnerId: defaultAgentId,
      }))
      dispatch(
        setSearchValuesMarket({
          agent: defaultAgentId,
        })
      )
    }
  }, [loadingAgents, agents])

  const handleFilterSelect = (key: string, event: SelectChangeEvent) =>
    setFilterMarket((prevState: FilterProps) => ({
      ...prevState,
        [key]: event.target.value,
    }))

  function handleSelectGame(value: string | number) {
    setFilterMarket((prevState: any) => ({
      ...prevState,
      gameTypeId: value,
    }))
  }

  async function fetchStatisticMarket() {
      setLoading(true)
      try {
        const response: AxiosResponse = await axios.post(
          API_ENDPOINT.GET_MARKET_BETLIMIT,
          {
            ...filterMarket,
            ...({ partnerId: filterMarket?.partnerId })
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
    if (filterMarket.partnerId) {
      fetchStatisticMarket()
    }
  }, [filterMarket])

  return {
    loading,
    data,
    error,
    filter: filterMarket,
    handleFilter: handleFilterSelect,
    handleSearch,
    handleSelectGame,
    gamesList
  }
}
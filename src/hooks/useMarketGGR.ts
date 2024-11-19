import { useEffect, useState } from 'react'

import { SelectChangeEvent } from '@mui/material'

import { API_ENDPOINT } from 'api/endpoint'
import axios, { AxiosResponse } from 'axios'
import { FORMAT_DATE } from 'constants/date'
import { useGames } from 'context/GamesContext'
import { GamesProps } from 'context/GamesContext'
import moment from 'moment'
import { IMarketGGR } from 'types/market'

export type FilterProps = {
  isTester: string
  searchFrom: Date
  searchTo: Date
  gameTypeId: number
  partnerId: string | null
  currency: string
}

export type DataMarketGGR = {
  allMarkets: IMarketGGR[]
  total: number
}

export type MarketGGRProps = {
  loading: boolean
  data: DataMarketGGR
  error: string | undefined
  filter: FilterProps
  handleFilter: (key: string, event: SelectChangeEvent) => void
  handleSearch: () => Promise<void>
  handleSelectGame: (value: string | number) => void
  gamesList: GamesProps[]
  handleChangeDate: (startDate: string | Date, endDate: string | Date) => void
}

export function useMarketGGR(): MarketGGRProps {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const { gamesList } = useGames()

  const [filterMarket, setFilterMarket] = useState<FilterProps>({
    isTester: 'false',
    gameTypeId: gamesList[0].id,
    partnerId: null,
    searchFrom: new Date(),
    searchTo: new Date(),
    currency: 'all',
  })

  const handleFilterSelect = (key: string, event: SelectChangeEvent) =>
    setFilterMarket((prevState: FilterProps) => ({
      ...prevState,
      [key]:
        key === 'partnerId' && event.target.value !== 'all'
          ? [event.target.value]
          : event.target.value,
    }))

  function handleSelectGame(value: string | number) {
    setFilterMarket((prevState: any) => ({
      ...prevState,
      gameTypeId: value,
    }))
  }

  function handleChangeDate(startDate: string | Date, endDate: string | Date) {
    setFilterMarket((prevState: any) => ({
      ...prevState,
      searchFrom: moment(startDate).format(FORMAT_DATE),
      searchTo: moment(endDate).format(FORMAT_DATE),
    }))
  }

  function handleChangeAgent(e: SelectChangeEvent) {
    setFilterMarket((prevState: FilterProps) => ({
      ...prevState,
      partnerId: e.target.value,
    }))
  }

  async function fetchStatisticMarket() {
    setLoading(true)
    try {
      const response: AxiosResponse = await axios.post(
        API_ENDPOINT.GET_MARKET_GGR,
        {
          ...filterMarket,
          ...(filterMarket?.partnerId !== 'all'
            ? { partnerId: filterMarket?.partnerId }
            : { partnerId: null }),
          ...(filterMarket?.isTester !== 'null'
            ? { isTester: filterMarket?.isTester === 'true' }
            : { isTester: null }),
          ...(filterMarket?.currency !== 'all'
            ? { currency: filterMarket?.currency }
            : { currency: null }),
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
    handleFilter: handleFilterSelect,
    handleSearch,
    handleSelectGame,
    gamesList,
    handleChangeDate,
  }
}

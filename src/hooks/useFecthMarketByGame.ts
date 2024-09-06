import { API_ENDPOINT } from 'api/endpoint'
import { headersContentType } from 'api/helpers'
import axios, { AxiosResponse } from 'axios'
import { header } from 'helpers/playerTransaction'
import { useEffect, useState } from 'react'

export type IMarketSelect = {
  marketId: number
  marketName: string
}

export function useFetchMarketByGame({
  agentId,
  gameId,
}: {
  agentId?: string
  gameId?: string
}) {
  const [markets, setMarkets] = useState<IMarketSelect[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function fetchMarkets() {
    try {
      setLoading(true)
      const json = JSON.stringify({ partnerId: agentId, gameTypeId: gameId })
      const response: any = await axios.post(
        API_ENDPOINT.GET_MARKET_BY_GAME,
        json,
        headersContentType
      )
      if (response?.data?.isSuccess) {
        setMarkets(response?.data?.data)
      }
    } catch (error) {
      console.error(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (gameId && agentId && gameId !== 'all' && agentId !== 'all') {
      fetchMarkets()
    } else {
      setMarkets([])
    }
  }, [gameId, agentId])

  return {
    markets,
    loadingMarkets: loading,
    errorLoadingMarkets: error,
  }
}

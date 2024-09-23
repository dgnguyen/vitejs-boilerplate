import { useEffect, useState } from 'react'

import { API_ENDPOINT } from 'api/endpoint'
import { headersContentType } from 'api/helpers'
import axios from 'axios'

export type IGamesSelect = {
  id: number
  name: string
}

export function useFetchGamesByAgent(agentId?: string) {
  const [games, setGames] = useState<IGamesSelect[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function fetchGames() {
    try {
      setLoading(true)
      const json = JSON.stringify({ partnerId: agentId })
      const response: any = await axios.post(
        API_ENDPOINT.GET_GAME_BY_AGENT,
        json,
        headersContentType
      )
      if (response?.data?.isSuccess) {
        setGames(response?.data?.data)
      }
    } catch (error) {
      console.error(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (agentId && agentId !== 'all') {
      fetchGames()
    } else {
      setGames([])
    }
  }, [agentId])

  return {
    games,
    loadingGames: loading,
    errorLoadingGames: error,
  }
}

import { useEffect, useState } from 'react'

import { API_ENDPOINT } from 'api/endpoint'
import { headersContentType } from 'api/helpers'
import axios, { AxiosResponse } from 'axios'
import { header } from 'helpers/playerTransaction'

export type IEventSelect = {
  eventId: number
  eventName: string
}

export function useFetchEventByMarket({
  agentId,
  gameId,
  marketId,
}: {
  agentId?: string
  gameId?: string
  marketId?: string
}) {
  const [events, setEvents] = useState<IEventSelect[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function fetchEvents() {
    try {
      setLoading(true)
      const json = JSON.stringify({
        partnerId: agentId,
        gameTypeId: gameId,
        marketId,
      })
      const response: any = await axios.post(
        API_ENDPOINT.GET_EVENT_BY_MARKET,
        json,
        headersContentType
      )
      if (response?.data?.isSuccess) {
        setEvents(response?.data?.data)
      }
    } catch (error) {
      setError(true)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      gameId &&
      agentId &&
      marketId &&
      gameId !== 'all' &&
      agentId !== 'all' &&
      marketId !== 'all'
    ) {
      fetchEvents()
    } else {
      setEvents([])
    }
  }, [gameId, agentId, marketId])

  return {
    events,
    loadingEvents: loading,
    errorLoadingEvents: error,
  }
}

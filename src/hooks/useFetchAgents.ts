import { API_ENDPOINT } from 'api/endpoint'
import axios from 'axios'
import httpStatus from 'constants/httpStatus'
import { useUser } from 'context/UserContext'
import { useEffect, useState } from 'react'

export function useFetchAgents() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function fetchAgents() {
    try {
      setLoading(true)

      const { data } = await axios.post(API_ENDPOINT.GET_AGENT, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (data.isSuccess) {
        setAgents(data?.data)
      }
    } catch (err: any) {
      console.error({ err })
      setError(true)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAgents()
    // return () => setAgents([])
  }, [])

  return {
    agents,
    loadingAgents: loading,
    errorLoadingAgents: error,
  }
}

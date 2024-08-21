import { API_ENDPOINT } from 'api/endpoint'
import { handleRestAPI, HTTP_REQUEST } from 'api/rest'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { logout } from 'redux/reducers/user'
import { useAppDispatch } from 'redux/store'

export function useFetchAgents() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const dispatch = useAppDispatch()
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
      if (err?.response?.status === 401) dispatch(logout())
      setError(true)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // console.log('go here once')
    fetchAgents()
    return () => setAgents([])
  }, [])

  return {
    agents,
    loadingAgents: loading,
    errorLoadingAgents: error,
  }
}

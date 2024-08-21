import { API_ENDPOINT } from 'api/endpoint'
import { handleRestAPI, HTTP_REQUEST } from 'api/rest'
import axios from 'axios'
import { useLogin } from 'context/LoginContext'
import { useEffect, useState } from 'react'

export function useFetchAgents() {
  const [agents, setAgents] = useState([])
  const [loadingAgents, setLoadingAgents] = useState(false)
  const [error, setError] = useState(false)
  const { isLogin, setLogout } = useLogin()

  async function fetchAgents() {
    try {
      console.log('go here')
      setLoadingAgents(true)

      const response = await axios.post(API_ENDPOINT.GET_AGENT, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (err: any) {
      if (err?.response?.status === 401) setLogout()
      setError(true)
      console.error(err)
    } finally {
      setLoadingAgents(false)
    }
  }

  useEffect(() => {
    fetchAgents()
    return () => setAgents([])
  }, [])

  return {
    agents,
  }
}

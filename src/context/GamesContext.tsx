import axios from 'axios'
import { API_BASE_URL } from 'constants/endpoint'
import React, { useContext, useEffect, useState } from 'react'

export interface GamesProps {
  id: number
  name: string
  repeatAfterSeconds: number
  minBet: number
  maxBet: number
  unavailableFrom: string
  unavailableTo: string
  gameInfo?: any
  isTest: boolean
}

export const GamesContext = React.createContext({
  gamesList: [] as GamesProps[],
  errorGames: false as boolean,
  loadingGames: false as boolean,
})

const getInitialState = () => {
  const gamesListLocal = localStorage.getItem('gamesList')
  return gamesListLocal ? JSON.parse(gamesListLocal) : []
}

export const GamesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [loadingGames, setLoadingGames] = useState(false)
  const [gamesList, setGamesList] = useState(getInitialState())
  const [errorGames, setError] = useState(false)

  async function fetchGames() {
    try {
      setLoadingGames(true)
      const response = await axios.get(
        `${API_BASE_URL}/admin/game-types/get-list`
      )

      const data = response?.data || null

      if (data) setGamesList(data)
    } catch (e) {
      console.error(e)
      setError(true)
      throw e
    } finally {
      setLoadingGames(false)
    }
  }
  useEffect(() => {
    if (!getInitialState()?.length) fetchGames()
  }, [])
  useEffect(() => {
    if (gamesList?.length > 0)
      localStorage.setItem('gamesList', JSON.stringify(gamesList))
  }, [gamesList])

  return (
    <GamesContext.Provider value={{ gamesList, errorGames, loadingGames }}>
      {children}
    </GamesContext.Provider>
  )
}

export const useGames = () => {
  const { gamesList, errorGames, loadingGames } = useContext(GamesContext)
  return {
    gamesList,
    errorGames,
    loadingGames,
  }
}

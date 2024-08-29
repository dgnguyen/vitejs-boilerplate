import { Box, Button, CircularProgress } from '@mui/material'
import { useGames } from 'context/GamesContext'

import './style.scss'
import { useEffect, useState } from 'react'
import { setSearchValue } from 'redux/reducers/transaction'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from 'redux/store'

const GameSelect = ({
  handleSelectGame,
  disabled,
  selectedAllGames,
  setSelectedAllGames,
}: {
  disabled: boolean
  handleSelectGame: any
  selectedAllGames?: boolean
  setSelectedAllGames?: (e: string | null) => void
}) => {
  const dispatch = useAppDispatch()
  const { gamesList, loadingGames, errorGames } = useGames()
  const [selectGames, setSelectGames] = useState<any[]>([])
  const gamesListId = gamesList.map((item) => item.id.toString())

  useEffect(() => {
    if (selectGames.length > 0 && selectGames.length === gamesList.length) {
      setSelectedAllGames?.('all')
    }
    if (selectedAllGames && selectGames.length < gamesList.length) {
      setSelectGames(gamesListId)
    }
  }, [selectGames])

  function handleSelectAllGames() {
    setSelectGames(gamesListId)
    dispatch(setSearchValue({ key: 'selectedGameType', val: gamesListId }))
  }

  useEffect(() => {
    if (gamesList?.length > 0) {
      handleSelectAllGames()
    }
  }, [gamesList])

  function toggleSelectGames(gameId: string) {
    if (gameId === 'all') {
      const newValue = gameId === 'all' && !selectedAllGames ? 'all' : ''
      if (newValue === 'all') {
        handleSelectAllGames()
      }
      setSelectedAllGames?.(newValue)
    } else {
      // if (selectedAllGames) {
      //   const newSelectedGames = gamesList?.filter((id) => id.toString() !== gameId.toString())?.map(item => item.id)
      //   console.log('go here', { newSelectedGames, selectGames, gamesList, gameId })

      //   setSelectGames(newSelectedGames)
      //   setSelectedAllGames?.(null)
      //   handleSelectGame(newSelectedGames)
      //   return
      // }
      const toggleSelectGame = selectGames?.includes(gameId)
        ? selectGames.filter((item) => item.toString() !== gameId)
        : [...selectGames, gameId]
      setSelectGames(toggleSelectGame)
      setSelectedAllGames?.(null)
      handleSelectGame(toggleSelectGame)
    }
  }

  if (loadingGames) return <CircularProgress />
  if (!loadingGames && errorGames) return <Box>Error loading games list</Box>
  return (
    <Box className='gameSelect-wrapper'>
      <Button
        key='all-type-game-select'
        data-testid='all-type-game-select'
        onClick={() => !disabled && toggleSelectGames('all')}
        variant={selectedAllGames ? 'contained' : 'outlined'}
        disabled={disabled}
      >
        All
      </Button>
      {gamesList.map((game) => (
        <Button
          key={game?.id}
          data-testid={`gameType-select-${game?.id}`}
          // buttonStyle={selectGame.includes(type?.id) ? '' : 'secondary'}
          onClick={() => !disabled && toggleSelectGames(game?.id.toString())}
          disabled={disabled}
          variant={
            selectGames.includes(game?.id.toString()) ? 'contained' : 'outlined'
          }
        >
          {game.name}
        </Button>
      ))}
    </Box>
  )
}

export default GameSelect

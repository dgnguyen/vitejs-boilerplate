import { Box, Button, CircularProgress } from '@mui/material'
import { useGames } from 'context/GamesContext'

import "./style.scss"
import { useEffect, useState } from 'react'

const GameSelect = ({
  handleSelectGame,
  disabled,
  selectedAllGames,
  setSelectedAllGames,
}: {
  disabled: boolean,
  handleSelectGame: any
  selectedAllGames?: boolean
  setSelectedAllGames?: (e: string | null) => void
}) => {

  const { gamesList, loadingGames, errorGames } = useGames()
  const [selectGames, setSelectGames] = useState<any[]>([])

  useEffect(() => {
    if (selectGames.length > 0 &&
      selectGames.length === gamesList.length
    ) {
      setSelectedAllGames?.("all")
    }

  }, [selectGames])

  function toggleSelectGames(gameId: string) {
    if (gameId === "all") {
      const newValue = gameId === "all" && !selectedAllGames ? "all" : ""
      if (newValue === "all") setSelectGames([])
      setSelectedAllGames?.(newValue)
    }
    else {
      const toggleSelectGame = selectGames?.includes(gameId)
        ? (selectGames).filter(item => item !== gameId)
        : [...selectGames, gameId]
      setSelectGames(toggleSelectGame)
      setSelectedAllGames?.(null)
      handleSelectGame(toggleSelectGame)
    }
  }

  if (loadingGames) return <CircularProgress />
  if (!loadingGames && errorGames) return <Box>Error loading games list</Box>
  return (
    <Box className="gameSelect-wrapper">
      <Button
        key="all-type-game-select"
        data-testid="all-type-game-select"
        onClick={() =>
          !disabled && toggleSelectGames("all")
        }
        variant={selectedAllGames ? "contained" : "outlined"}
        disabled={disabled}

      >
        All
      </Button>
      {
        gamesList.map((game) => (
          <Button
            key={game?.id}
            data-testid={`gameType-select-${game?.id}`}
            // buttonStyle={selectGame.includes(type?.id) ? '' : 'secondary'}
            onClick={() => !disabled && toggleSelectGames(game?.id.toString())}
            disabled={disabled}
            variant={
              selectedAllGames || selectGames.includes(game?.id.toString()) ? "contained" : "outlined"
            }
          >
            {game.name}
          </Button>
        ))
      }
    </Box>
  )
}

export default GameSelect

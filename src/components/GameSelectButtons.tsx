import { Box, Button } from '@mui/material'
import { GamesProps, useGames } from 'context/GamesContext'

type Props = {
  loading: boolean
  selectedGame: number | null
  handleSelectGame: (e: number) => void
}

const GameSelectButtons = ({
  loading,
  selectedGame,
  handleSelectGame,
}: Props) => {
  const { gamesList } = useGames()
  return (
    <Box
      marginY={1}
      display='flex'
      gap={2}
    >
      {gamesList.map((item: GamesProps) => (
        <Button
          disabled={loading}
          variant={`${item.id === selectedGame ? 'contained' : 'outlined'}`}
          key={item.id}
          value={item.id}
          onClick={() => handleSelectGame(item.id)}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  )
}

export default GameSelectButtons

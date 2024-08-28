import { Box } from '@mui/material'
import "./style.scss"
import PageTitle from 'components/Commons/PageTitle'
import DateBlock from 'components/DateBlock'
import FilterPlayer from './FilterPlayer'

const Player = () => {
  return (
    <Box className="player-wrapper">
      <PageTitle title="Player" />
      <DateBlock />
      <FilterPlayer />

    </Box>
  )
}

export default Player

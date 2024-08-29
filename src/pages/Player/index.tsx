import { Box } from '@mui/material'
import './style.scss'
import PageTitle from 'components/Commons/PageTitle'
import DateBlock from 'components/DateBlock'
import FilterPlayer from './FilterPlayer'
import PlayerContent from './PlayerContent'

const Player = () => {
  return (
    <Box className='player-wrapper'>
      <PageTitle title='Player' />
      <DateBlock />
      <FilterPlayer />
      <PlayerContent />
    </Box>
  )
}

export default Player

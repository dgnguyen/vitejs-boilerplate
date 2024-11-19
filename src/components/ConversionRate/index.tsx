import { Box, Typography } from '@mui/material'

import { thousandSeparator } from 'helpers/currency'
import { useSelector } from 'react-redux'
import { listAgentsSelector } from 'redux/reducers/listAgents'

import "./style.scss"

const ConversionRate = () => {
  const listAgentsData = useSelector(listAgentsSelector)
  const { rate, loading, error } = listAgentsData

  return (
    <Box className="rate-wrapper">
      {!loading && !error && (
        Object.entries(rate).map((item) => (
          <Typography key={item[0]}>{`1${item[0]} = ${thousandSeparator((1 / item[1]).toFixed(3))}KRW`}</Typography>
        ))
      )}
    </Box>
  )
}

export default ConversionRate

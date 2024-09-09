import { Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import { Form, FormikProps, useFormikContext } from 'formik'
import { IAgentData } from 'types/agent'
import { AgentBetLimitValuesProps } from './FormBetLimit'
import { IGamesSelect, useFetchGamesByAgent } from 'hooks/useFetchGamesByAgent'
import { IMarketSelect, useFetchMarketByGame } from 'hooks/useFecthMarketByGame'
import { useEffect } from 'react'
import { useFetchEventByMarket } from 'hooks/useFetchEventByMarket'
import { useFetchAgents } from 'hooks/useFetchAgents'
import { useSnackbar } from 'hooks/useSnackbar'

const FormContent = ({ props, submiting }:
  {
    props: FormikProps<AgentBetLimitValuesProps>,
    submiting: boolean
  }) => {
  const { values, setFieldValue, } = useFormikContext<AgentBetLimitValuesProps>()


  const { agents, loadingAgents } = useFetchAgents()
  const { games, loadingGames } = useFetchGamesByAgent(values?.agentSelect)
  const { markets, loadingMarkets } = useFetchMarketByGame({
    gameId: values?.gameSelect,
    agentId: values?.agentSelect
  })
  const { events, loadingEvents } = useFetchEventByMarket({
    marketId: values?.marketSelect,
    gameId: values?.gameSelect,
    agentId: values?.agentSelect
  })



  useEffect(() => {
    setFieldValue("gameSelect", "")
  }, [values.agentSelect])

  useEffect(() => {
    setFieldValue("marketSelect", "")
  }, [values.gameSelect])

  useEffect(() => {
    setFieldValue("eventSelect", "")
  }, [values.marketSelect])

  return (
    <Form
      id="betLimitFormSuperAdmin"
      autoComplete="off"
      onSubmit={props.handleSubmit}
    >
      <Box className="flex-wrapper-equal-portion">
        <Typography>Set limit</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl>
            <TextField
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values?.minBet}
              name="minBet"
              className=''
              placeholder='Min bet'
            />
          </FormControl>
          <Typography>to</Typography>
          <FormControl>
            <TextField
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.maxBet}
              name="maxBet"
              placeholder='Max bet'
            />
          </FormControl>
        </Box>
      </Box>
      <Box className="flex-wrapper-equal-portion">
        <Typography>Applied for</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="select-agent-label">Select Agent</InputLabel>
            <Select
              id="select-agent"
              label="Select agent"
              labelId="select-agent-label"
              name="agentSelect"
              value={props.values.agentSelect}
              onBlur={props.handleBlur}
              disabled={loadingAgents}
              onChange={(e) => props.setFieldValue('agentSelect', e.target.value as string)}
            // error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              <MenuItem value="all">All</MenuItem>
              {agents.map((agent: IAgentData) => (
                <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
              )
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="select-game-label">Select Game</InputLabel>
            <Select
              id="select-game"
              label="Select game"
              labelId="select-game-label"
              name="gameSelect"
              value={props.values.gameSelect}
              onBlur={props.handleBlur}
              disabled={games.length === 0 || loadingGames}
              onChange={(e) => props.setFieldValue('gameSelect', e.target.value as string)}
            // error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              <MenuItem value="all">All</MenuItem>
              {games.map((game: IGamesSelect) => (
                <MenuItem key={game.id} value={game.id}>{game.name}</MenuItem>
              )
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="select-market-label">Select Market</InputLabel>
            <Select
              id="select-market"
              label="Select market"
              labelId="select-market-label"
              name="marketSelect"
              value={props.values.marketSelect}
              onBlur={props.handleBlur}
              disabled={markets.length === 0 || loadingMarkets}
              onChange={(e) => props.setFieldValue('marketSelect', e.target.value as string)}
            // error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              <MenuItem value="all">All</MenuItem>
              {markets.map((market: IMarketSelect) => (
                <MenuItem key={market.marketId} value={market.marketId}>{market.marketName}</MenuItem>
              )
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 180 }}>
            <InputLabel id="select-event-label">Select Sub-Market</InputLabel>
            <Select
              id="select-event"
              label="Select Sub-Market"
              labelId="select-event-label"
              name="eventSelect"
              value={props.values.eventSelect}
              onBlur={props.handleBlur}
              disabled={events.length === 0 || loadingEvents}
              onChange={(e) => props.setFieldValue('eventSelect', e.target.value as string)}
            // error={formik.touched.userType && Boolean(formik.errors.userType)}
            >
              <MenuItem value="all">All</MenuItem>
              {events.map((event: any) => (
                <MenuItem key={event.id} value={event.eventId}>{event.eventName}</MenuItem>
              )
              )}
            </Select>
          </FormControl>
          <Button disabled={submiting} type="submit" variant="contained" sx={{ textTransform: "uppercase" }}>confirm</Button>
        </Box>
      </Box>

    </Form>
  )
}

export default FormContent

import { Form, Formik, useFormikContext } from 'formik'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@mui/material'
import "../style.scss"
import { useFetchAgents } from 'hooks/useFetchAgents'
import { IAgentData } from 'types/agent'
import { useRef, useState } from 'react'
import FormContent from './FormContent'
import axios from 'axios'
import { API_ENDPOINT } from 'api/endpoint'
import { headersContentType } from 'api/helpers'


export type AgentBetLimitValuesProps = {
  minBet: string
  maxBet: string
  agentSelect: string
  gameSelect: string
  marketSelect: string
  eventSelect: string
}

const FormBetLimit = () => {
  const initialState: AgentBetLimitValuesProps = {
    minBet: "",
    maxBet: "",
    agentSelect: "",
    gameSelect: "",
    marketSelect: "",
    eventSelect: ""
  }

  const [submiting, setSubmiting] = useState(false)
  const [errorSubmit, setErrorSubmit] = useState(false)
  // const { agents } = useFetchAgents()
  // const { games } = useFetchGames()


  const onSubmit = async (values: AgentBetLimitValuesProps) => {
    setSubmiting(true)
    try {
      const valuesSendToAPI = {
        partnerId: values?.agentSelect !== "all" ? values?.agentSelect : null,
        minBet: values?.minBet,
        maxBet: values?.maxBet,
        marketId: values?.marketSelect !== "all" ? (values?.marketSelect || null) : null,
        eventId: values?.eventSelect !== "all" ? (values?.eventSelect || null) : null,
        gameTypeId: values?.gameSelect !== "all" ? (values?.gameSelect || null) : null,
      }
      const json = JSON.stringify(valuesSendToAPI)
      const response = await axios.post(API_ENDPOINT.UPDATE_BET_LIMIT_AGENT, json, headersContentType)
      if (response?.data?.isSuccess) {
        console.log({ response })
      } else {
        setErrorSubmit(true)
      }
    } catch (err) {
      setErrorSubmit(true)
    } finally {
      setSubmiting(false)
    }
  }



  return (
    <Box className="formAgentBetlimit-wrapper">
      <Formik
        initialValues={{ ...initialState }}
        onSubmit={onSubmit}
      >
        {props => {
          return (
            <FormContent props={props} />
          )
        }}
      </Formik>
    </Box>
  )
}

export default FormBetLimit

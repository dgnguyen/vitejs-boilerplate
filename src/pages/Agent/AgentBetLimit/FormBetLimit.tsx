import { useState } from 'react'

import { Box, Snackbar } from '@mui/material'

import { API_ENDPOINT } from 'api/endpoint'
import { headersContentType } from 'api/helpers'
import axios from 'axios'
import { Formik } from 'formik'
import { useSnackbar } from 'hooks/useSnackbar'
import { useSelector } from 'react-redux'
import { addNewAgentBetLimit } from 'redux/reducers/agent'
import { RootState, useAppDispatch } from 'redux/store'
import { IAgentBetLimit } from 'types/agent'

import FormContent from './FormContent'

import '../style.scss'

export type AgentBetLimitValuesProps = {
  minBet: string
  maxBet: string
  agentSelect: string
  gameSelect: string
  marketSelect: string
  eventSelect: string
  id: number | null,
  groupPermissionId: number | null
}

const FormBetLimit = ({ editBetId, onSuccess }: { editBetId?: number, onSuccess?: (msg: string) => void }) => {
  
  const agentBetLimitDataSelector = useSelector(
    (state: RootState) => state.agent
  )

  const { betLimitData } = agentBetLimitDataSelector
  const initialData = editBetId ? betLimitData.find((item) => item.id === editBetId) : null

  const initialState: AgentBetLimitValuesProps = {
    minBet: initialData ? initialData.minBet.toString() : '',
    maxBet: initialData ? initialData.maxBet.toString() : '',
    agentSelect: initialData ? initialData.agent.id.toString() : '',
    gameSelect: initialData ? initialData.gameType.id.toString() : '',
    marketSelect: initialData ? initialData.market.id.toString() : '',
    eventSelect: initialData ? initialData.event.id.toString() : '',
    id: initialData ? initialData.id: 0,
    groupPermissionId: initialData ? initialData.groupPermissionId: 0
  }

  const [submitting, setSubmiting] = useState(false)
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  const dispatch = useAppDispatch()

  const onSubmit = (values: AgentBetLimitValuesProps) => {
    setSubmiting(true)

    const valuesSendToAPI = {
      id: editBetId,
      partnerId:
        values?.agentSelect !== 'all' && values?.agentSelect !== ''
          ? [values?.agentSelect]
          : null,
      minBet: values?.minBet,
      maxBet: values?.maxBet,
      marketId:
        values?.marketSelect !== 'all' ? values?.marketSelect || null : null,
      eventId:
        values?.eventSelect !== 'all' ? values?.eventSelect || null : null,
      gameTypeId:
        values?.gameSelect !== 'all' ? values?.gameSelect || null : null,
      groupPermissionId: values?.groupPermissionId
    }

    const endpoint = editBetId ? API_ENDPOINT.UPDATE_BET_LIMIT_AGENT : API_ENDPOINT.ADD_BET_LIMIT_AGENT

    const json = JSON.stringify(valuesSendToAPI)
    axios
      .post(endpoint, json, headersContentType)
      .then((response) => {
        if (response?.data?.isSuccess) {
          dispatch(addNewAgentBetLimit(response?.data?.data))
          if (onSuccess) {
              onSuccess(response?.data?.message)
          }
        }
      })
      .catch((e) => {
        openSnackbar({
          message:
            e?.response?.data?.message || 'Error while set agent bet limit',
        })
        console.error({ e })
      })
      .finally(() => {
        setSubmiting(false)
      })
  }

  return (
    <Box className='formAgentBetlimit-wrapper'>
      <Formik
        initialValues={{ ...initialState }}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <FormContent
              props={props}
              submitting={submitting}
            />
          )
        }}
      </Formik>
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </Box>
  )
}

export default FormBetLimit

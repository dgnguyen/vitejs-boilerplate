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

const FormBetLimit = ({ editBetId }: { editBetId?: number }) => {





  const agentBetLimitDataSelector = useSelector(
    (state: RootState) => state.agent
  )
  const { betLimitData } = agentBetLimitDataSelector
  const initialStateEdit = editBetId && betLimitData.find((item) => item.id === editBetId)
  const initialState: AgentBetLimitValuesProps = {
    minBet: '',
    maxBet: '',
    agentSelect: '',
    gameSelect: '',
    marketSelect: '',
    eventSelect: '',
    id: null,
    groupPermissionId: null
  }

  const [submitting, setSubmiting] = useState(false)
  const { snackbar, openSnackbar, closeSnackbar } = useSnackbar()

  const dispatch = useAppDispatch()

  const onSubmit = (values: AgentBetLimitValuesProps) => {
    setSubmiting(true)

    const valuesSendToAPI = {
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
    }
    const json = JSON.stringify(valuesSendToAPI)
    axios
      .post(API_ENDPOINT.ADD_BET_LIMIT_AGENT, json, headersContentType)
      .then((response) => {
        if (response?.data?.isSuccess) {
          dispatch(addNewAgentBetLimit(response?.data?.data))
          const newBetLimitLine = response?.data?.data
          const isFirstTimeBetLimitUpdated = !!betLimitData.find(
            (item: IAgentBetLimit) => {
              return (
                item?.agent?.id === newBetLimitLine?.agent?.id &&
                item?.gameType?.id === newBetLimitLine?.gameType?.id &&
                item?.market?.id === newBetLimitLine?.market?.id &&
                item?.event?.id === newBetLimitLine?.event?.id
              )
            }
          )
          const detailMsg = !isFirstTimeBetLimitUpdated
            ? 'New bet limit values have been applied'
            : `The bet limit values for Agent: "${newBetLimitLine.agentName}", Game: "${newBetLimitLine.gameName}", Market: "${newBetLimitLine.marketName}", Event: "${newBetLimitLine.eventName}" have been changed.`
          openSnackbar({ message: detailMsg })
        } else {
          openSnackbar({ message: response?.data?.message })
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

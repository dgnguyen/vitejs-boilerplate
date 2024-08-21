import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'redux/store'
import axios, { AxiosResponse } from 'axios'
import {
  format,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameMonth,
  isToday,
  isYesterday,
  subMonths,
} from 'date-fns'
import { API_ENDPOINT } from 'api/endpoint'

export type IBetLog = {
  betAmount: number
  createDate: string
  endDate: string
  gameId: number
  playerId: number
  winAmount: number
}

export type IDashboardData = {
  grossRevenue: number
  playerNumber: number
  profitPercentage: number
  totalBetAmount: number
  totalTransactions: number
  totalWinAmount: number
  winTransactions: number
  averageBetAmount: number
  betLogs: IBetLog[]
}

export interface DateRange {
  startDate: Date
  endDate: Date
}

export interface DahsboardState {
  filter: {
    dateRange: DateRange
    agentSelected: number[] | null
    isTester: string
  }
  loading: boolean
  loadingPage: boolean
  errorMsg: string
  data: IDashboardData | null
}

const initialStateDateRange = {
  startDate: new Date(),
  endDate: new Date(),
}

export const initialStateFilter = {
  dateRange: initialStateDateRange,
  agentSelected: null,
  isTester: 'false',
}
const initialState: DahsboardState = {
  filter: initialStateFilter,
  loading: false,
  loadingPage: false,
  errorMsg: '',
  data: null,
}

export const dashboardReducer = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    setAgent: (state, action) => {
      state.filter.agentSelected = action.payload
    },
    setDate: (state, action) => {
      state.filter.dateRange = action.payload
    },
    setIsTester: (state, action) => {
      state.filter.isTester = action.payload
    },
    resetDate: (state) => {
      state.filter.dateRange = initialStateDateRange
    },
    resetDashboardFilter: (state) => {
      state.filter = initialStateFilter
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setLoadingPage: (state, action) => {
      state.loadingPage = action.payload
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload
    },
  },
})

export const getDashboardDataAction = (
  startDate: Date,
  endDate: Date,
  isTestUser: null | boolean,
  agentSelected?: any
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingPage(true))
      const payloadCore = {
        searchFrom: format(startDate, 'yyyy-MM-dd'),
        searchTo: format(endDate, 'yyyy-MM-dd'),
        isTester: isTestUser,
      }
      const payload = agentSelected
        ? {
            ...payloadCore,
            partnerId: agentSelected.split(','),
          }
        : payloadCore
      await axios
        .post(`${API_ENDPOINT.GET_DASHBOARD}`, payload)
        .then(
          (
            response: AxiosResponse<{ isSuccess: boolean; message: string }>
          ) => {
            dispatch(setData(response?.data))
            dispatch(setErrorMsg(''))
          }
        )
        .catch((error) => {
          dispatch(setData(null))
          dispatch(
            setErrorMsg(error.response.data.message || 'Something wrong!')
          )
        })
        .finally(() => dispatch(setLoadingPage(false)))
    } catch (e) {
      console.error(e)
    }
  }
}

export const {
  setData,
  setAgent,
  setDate,
  setIsTester,
  resetDate,
  resetDashboardFilter,
  setLoading,
  setLoadingPage,
  setErrorMsg,
} = dashboardReducer.actions

export const dashboardLoadingSelector = (state: RootState) => {
  return state?.dashboard?.loading
}

export const dashboardLoadingPageSelector = (state: RootState) => {
  return state?.dashboard?.loadingPage
}

export const dashboardErrorSelector = (state: RootState) => {
  return state?.dashboard?.errorMsg
}

export const dashboardDataSelector = (state: RootState) => {
  return state?.dashboard?.data
}

export const dashboardFilterSelector = (state: RootState) => {
  return state?.dashboard?.filter
}

export default dashboardReducer.reducer
